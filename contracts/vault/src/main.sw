contract;

use std::{asset::transfer, call_frames::msg_asset_id, context::msg_amount, hash::Hash};

abi Wallet {
    #[storage(read, write), payable]
    fn receive_funds();

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address);

    #[storage(read)]
    fn view_balance(address: Address) -> u64;

}

const OWNER_ADDRESS: Address = Address::from(0x8900c5bec4ca97d4febf9ceb4754a60d782abbf3cd815836c1872116f203f861);

storage {
    balances: StorageMap<Address, u64> = StorageMap {},
}

impl Wallet for Contract {
    #[storage(read, write), payable]
    fn receive_funds() {
        if msg_asset_id() == AssetId::base() {
            let sender = msg_sender().unwrap();
            match sender {
                Identity::Address(addr) => {
                    let current_balance = storage.balances.get(addr).try_read().unwrap_or(0);
                    storage.balances.insert(addr, current_balance + msg_amount());
                },
                _ => revert(0),
            }
        }
    }

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address) {
        let sender = msg_sender().unwrap();
        match sender {
            Identity::Address(addr) => assert(addr == OWNER_ADDRESS),
            _ => revert(0),
        };

        let current_balance = storage.balances.get(OWNER_ADDRESS).try_read().unwrap_or(0);
        assert(current_balance >= amount_to_send);

        storage.balances.insert(OWNER_ADDRESS, current_balance - amount_to_send);

        transfer(
            Identity::Address(recipient_address),
            AssetId::base(),
            amount_to_send,
        );
    }

    #[storage(read)]
    fn view_balance(address: Address) -> u64 {
        return storage.balances.get(address).try_read().unwrap_or(0);
    }

}
