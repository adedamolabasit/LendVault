contract;

use std::{
    asset::{
        mint_to,
        transfer,
    },
    call_frames::msg_asset_id,
    constants::DEFAULT_SUB_ID,
    context::msg_amount,
    hash::{
        Hash,
        sha256,
    },
    storage::storage_string::*,
    string::String,
};

use standards::{src20::SRC20, src6::{Deposit, SRC6, Withdraw}};

abi LendVault {
    #[storage(read, write), payable]
    fn lock_and_borrow(recipient: Address, interest_rate: u64, borrow_duration: u64);

    #[storage(read, write), payable]
    fn return_loan(recipient: Address, sub_id: SubId);
}

pub struct VaultInfo {
    managed_assets: u64,
    vault_sub_id: SubId,
    asset: AssetId,
}

pub struct BorrowerInfo {
    locked_assets: u64,
    sub_id: SubId,
    asset: AssetId,
    minted_amount: u64,
    interest_rate: u64,
    borrow_timestamp: u64,
    borrow_duration: u64,

}

struct BorrowLog {
    recipient: Address,
    locked_assets: u64,
    minted_amount: u64,
    interest_rate: u64,
    borrow_duration: u64,
    sub_id: SubId
}

pub struct InterestInfo {
    interest_amount: u64,
    paid_date: u64,
}

struct LoanReturned {
    recipient: Address,
    returned_amount: u64,
    interest_paid: u64,
    timestamp: u64,
}

storage {
    total_assets: u64 = 0,

    collateral_balance: u64 = 0,

    pool_interest: u64 = 0,

    vault_info: StorageMap<AssetId, VaultInfo> = StorageMap {},

    total_supply: StorageMap<AssetId, u64> = StorageMap {},

    name: StorageMap<AssetId, StorageString> = StorageMap {},

    symbol: StorageMap<AssetId, StorageString> = StorageMap {},

    decimals: StorageMap<AssetId, u8> = StorageMap {},

    borrower_info_map: StorageMap<Address, BorrowerInfo> = StorageMap {},

    interest_info_map: StorageMap<Address, InterestInfo> = StorageMap {},

}

impl LendVault for Contract {
    #[storage(read, write), payable]
    fn lock_and_borrow(recipient: Address, interest_rate: u64, borrow_duration: u64) {
        require(msg_asset_id() == AssetId::base(), "Invalid asset ID");
        require(msg_amount() > 0, "Amount must be greater than zero");

        if let Some(existing_loan) = storage.borrower_info_map.get(recipient).try_read()
        {
            require(existing_loan.locked_assets == 0, "Active loan exists");
        }

        if msg_asset_id() == AssetId::base() {
            storage.collateral_balance.write(storage.collateral_balance.read() + msg_amount());
        }

        let amount_to_mint = msg_amount() / 2;

        let borrower_info = BorrowerInfo {
            locked_assets: msg_amount(),
            sub_id: DEFAULT_SUB_ID,
            asset: msg_asset_id(),
            minted_amount: amount_to_mint,
            interest_rate,
            borrow_timestamp: 90,
            borrow_duration,
        };

        storage.borrower_info_map.insert(recipient, borrower_info);

        mint_to(Identity::Address(recipient), DEFAULT_SUB_ID, amount_to_mint);

        let borrow_log = BorrowLog {
            recipient,
            locked_assets: borrower_info.locked_assets,
            minted_amount: borrower_info.minted_amount,
            interest_rate: borrower_info.interest_rate,
            borrow_duration: borrower_info.borrow_duration,
            sub_id: DEFAULT_SUB_ID
        };

        log(borrow_log);
    }

    #[storage(read, write), payable]
    fn return_loan(recipient: Address, sub_id: SubId) {
        use std::{asset::burn};
        require(sub_id == DEFAULT_SUB_ID, "Incorrect Sub Id");

        let borrower_info = match storage.borrower_info_map.get(recipient).try_read() {
            Some(info) => info,
            None => revert(1), 
        };

        require(borrower_info.locked_assets > 0, "No active loan");

        require(msg_asset_id() == AssetId::default(), "Invalid asset ID");

        require(
            msg_amount() == borrower_info.minted_amount,
            "Incorrect amount returned",
        );

        let interest = borrower_info.locked_assets * 5 / 100;

        storage.pool_interest.write(storage.pool_interest.read() + interest);

        storage.collateral_balance.write(storage.collateral_balance.read() - borrower_info.locked_assets);

        let amount_to_transfer = borrower_info.locked_assets - interest;

        storage.borrower_info_map.remove(recipient);

        burn(DEFAULT_SUB_ID, msg_amount());

        transfer(
            Identity::Address(recipient),
            AssetId::base(),
            amount_to_transfer,
        );

         let loan_returned_event = LoanReturned {
            recipient,
            returned_amount: msg_amount(),
            interest_paid: interest,
            timestamp: 90
        };

        log(loan_returned_event);

    }

}


impl SRC6 for Contract {
    #[payable]
    #[storage(read, write)]
    fn deposit(receiver: Identity, vault_sub_id: SubId) -> u64 {
        let asset_amount = msg_amount();
        let underlying_asset = msg_asset_id();

        require(underlying_asset == AssetId::base(), "INVALID_ASSET_ID");
        let (shares, share_asset, share_asset_vault_sub_id) = preview_deposit(underlying_asset, vault_sub_id, asset_amount);
        require(asset_amount != 0, "ZERO_ASSETS");

        _mint(receiver, share_asset, share_asset_vault_sub_id, shares);

        let mut vault_info = match storage.vault_info.get(share_asset).try_read() {
            Some(vault_info) => vault_info,
            None => VaultInfo {
                managed_assets: 0,
                vault_sub_id,
                asset: underlying_asset,
            },
        };
        vault_info.managed_assets = vault_info.managed_assets + asset_amount;
        storage.vault_info.insert(share_asset, vault_info);

        storage.total_assets.write(storage.total_assets.read() + asset_amount);

        log(Deposit {
            caller: msg_sender().unwrap(),
            receiver: receiver,
            underlying_asset,
            vault_sub_id: vault_sub_id,
            deposited_amount: asset_amount,
            minted_shares: shares,
        });

        shares
    }

    #[payable]
    #[storage(read, write)]
    fn withdraw(
        receiver: Identity,
        underlying_asset: AssetId,
        vault_sub_id: SubId,
    ) -> u64 {
        let shares = msg_amount();
        require(shares != 0, "ZERO_SHARES");

        let (share_asset_id, share_asset_vault_sub_id) = vault_asset_id(underlying_asset, vault_sub_id);

        require(msg_asset_id() == share_asset_id, "INVALID_ASSET_ID");
        let assets = preview_withdraw(share_asset_id, shares);

        let mut vault_info = storage.vault_info.get(share_asset_id).read();
        vault_info.managed_assets = vault_info.managed_assets - shares;
        storage.vault_info.insert(share_asset_id, vault_info);

        _burn(share_asset_id, share_asset_vault_sub_id, shares);

        transfer(receiver, underlying_asset, assets);

        log(Withdraw {
            caller: msg_sender().unwrap(),
            receiver: receiver,
            underlying_asset,
            vault_sub_id: vault_sub_id,
            withdrawn_amount: assets,
            burned_shares: shares,
        });

        assets
    }

    #[storage(read)]
    fn managed_assets(underlying_asset: AssetId, vault_sub_id: SubId) -> u64 {
        if underlying_asset == AssetId::base() {
            let vault_share_asset = vault_asset_id(underlying_asset, vault_sub_id).0;
            managed_assets(vault_share_asset)
        } else {
            0
        }
    }
    #[storage(read)]
    fn max_depositable(
        receiver: Identity,
        underlying_asset: AssetId,
        vault_sub_id: SubId,
    ) -> Option<u64> {
        if underlying_asset == AssetId::base() {
            Some(u64::max() - managed_assets(underlying_asset))
        } else {
            None
        }
    }

    #[storage(read)]
    fn max_withdrawable(underlying_asset: AssetId, vault_sub_id: SubId) -> Option<u64> {
        if underlying_asset == AssetId::base() {
            Some(managed_assets(underlying_asset))
        } else {
            None
        }
    }
}

impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        storage.total_assets.try_read().unwrap_or(0)
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        storage.total_supply.get(asset).try_read()
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        storage.name.get(asset).read_slice()
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        storage.symbol.get(asset).read_slice()
    }

    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        storage.decimals.get(asset).try_read()
    }
}

fn vault_asset_id(underlying_asset: AssetId, vault_sub_id: SubId) -> (AssetId, SubId) {
    let share_asset_vault_sub_id = sha256((underlying_asset, vault_sub_id));
    let share_asset_id = AssetId::new(ContractId::this(), share_asset_vault_sub_id);
    (share_asset_id, share_asset_vault_sub_id)
}

#[storage(read)]
fn managed_assets(share_asset: AssetId) -> u64 {
    match storage.vault_info.get(share_asset).try_read() {
        Some(vault_info) => vault_info.managed_assets,
        None => 0,
    }
}

#[storage(read)]
fn preview_deposit(
    underlying_asset: AssetId,
    vault_sub_id: SubId,
    assets: u64,
) -> (u64, AssetId, SubId) {
    let (share_asset_id, share_asset_vault_sub_id) = vault_asset_id(underlying_asset, vault_sub_id);

    let shares_supply = storage.total_supply.get(share_asset_id).try_read().unwrap_or(0);
    if shares_supply == 0 {
        (assets, share_asset_id, share_asset_vault_sub_id)
    } else {
        (
            assets * shares_supply / managed_assets(share_asset_id),
            share_asset_id,
            share_asset_vault_sub_id,
        )
    }
}

#[storage(read)]
fn preview_withdraw(share_asset_id: AssetId, shares: u64) -> u64 {
    let supply = storage.total_supply.get(share_asset_id).read();
    if supply == shares {
        managed_assets(share_asset_id)
    } else {
        shares * (managed_assets(share_asset_id) / supply)
    }
}

#[storage(read, write)]
pub fn _mint(
    recipient: Identity,
    asset_id: AssetId,
    vault_sub_id: SubId,
    amount: u64,
) {
    let supply = storage.total_supply.get(asset_id).try_read();
    if supply.is_none() {
        storage.total_assets.write(storage.total_assets.read() + 1);
    }
    let current_supply = supply.unwrap_or(0);
    storage
        .total_supply
        .insert(asset_id, current_supply + amount);
    mint_to(recipient, vault_sub_id, amount);
}

#[storage(read, write)]
pub fn _burn(asset_id: AssetId, vault_sub_id: SubId, amount: u64) {
    use std::{asset::burn, context::this_balance};

    require(
        this_balance(asset_id) >= amount,
        "BurnError::NotEnoughCoins",
    );
    let supply = storage.total_supply.get(asset_id).try_read().unwrap();
    storage.total_supply.insert(asset_id, supply - amount);
    burn(vault_sub_id, amount);
}
