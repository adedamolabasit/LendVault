import { bn, FuelError } from "fuels";
import {
  DepositAndMintParams,
  RepayAndBurnParams,
  ManagedAssetsParams,
  BorrowAssetsParams
} from "../types";
import { AssetId } from "fuels";
import { sha256 } from "fuels";
import { createAssetId } from "fuels";
import { getMintedAssetId } from "fuels";

export const depositAndMint = async ({
  identityInput,
  instance,
  vaultSubID,
  borrowAmount,
}: DepositAndMintParams): Promise<any> => {
  const amount = bn.parseUnits(borrowAmount.toString());

  if (instance) {
    try {
      const baseAssetId = instance.provider.getBaseAssetId();

      const tx = instance.functions
        .deposit(identityInput, vaultSubID)
        .callParams({
          forward: [amount, baseAssetId],
        });

      const cost = await tx.getTransactionCost();
      const gasLimit = cost.gasUsed.add(bn(1000));
      const maxFee = cost.maxFee.add(bn(1000));

      const { waitForResult } = await tx
        .callParams({
          gasLimit: gasLimit,
        })
        .txParams({
          maxFee: maxFee,
        })
        .call();

      const { value } = await waitForResult();

      return value;
    } catch (error: any) {
      if (error instanceof FuelError) {
        throw new Error(
          `Detailed error during deposit and mint:, ${error.message}`
        );
      } else {
        throw new Error(error || "Something went wrong");
      }
    }
  }
};

export const BorrowAndLock = async ({
  addressInput,
  instance,
  borrowAmount,
}: BorrowAssetsParams): Promise<any> => {
  const amount = bn.parseUnits(borrowAmount.toString());


  if (instance) {
    try {
      const baseAssetId = instance.provider.getBaseAssetId();
      // const BASE_ASSET: AssetId = {
      //   bits: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
      // };

      const tx = instance.functions
        .lockAndBorrow(addressInput,2,23)
        .callParams({
          forward: [amount, baseAssetId],
        });

      const cost = await tx.getTransactionCost();
      const gasLimit = cost.gasUsed.add(bn(1000));
      const maxFee = cost.maxFee.add(bn(1000));

      const { waitForResult } = await tx
        .callParams({
          gasLimit: gasLimit,
        })
        .txParams({
          maxFee: maxFee,
        })
        .call();

      const { value } = await waitForResult();

      return value;
    } catch (error: any) {
      if (error instanceof FuelError) {
        throw new Error(
          ` ${error.message}`
        );
      } else {
        throw new Error(error || "Something went wrong");
      }
    }
  }
};

export const repayAndBurn = async ({
  identityInput,
  vaultSubID,
  underlyingAsset,
  withdrawAmount,
  instance,
}: RepayAndBurnParams): Promise<any> => {
  const amount = bn.parseUnits(withdrawAmount.toString());

  // Ensure underlyingAsset and vaultSubID are hex strings
  // const subId = sha256(`${underlyingAsset}${vaultSubID}`);

  const contractId =
    "0x28d6d0518830e47d73a527f218a0732fe2825baca2c57315cffa299353e8e6fe";
  // const assetId: AssetId = createAssetId(contractId, subId);
  // const assetId: AssetId = createAssetId(instance.id.toB256(), vaultSubID);

  // const assetId = getMintedAssetId(instance.id.toB256(), vaultSubID)


  // Create the share_asset_vault_sub_id using sha256
  const shareAssetVaultSubId = sha256(
    Buffer.concat([
      Buffer.from(underlyingAsset.slice(2), "hex"),
      Buffer.from(vaultSubID.slice(2), "hex"),
    ])
  );

  // const contractId = ContractId.from('0x...'); // Replace with actual contract ID
const shareAssetId = createAssetId(contractId, shareAssetVaultSubId);

console.log('Share Asset ID:', shareAssetId);


  // console.log(assetId);

  if (instance) {
    try {
      const assetIdInput = { bits: underlyingAsset };

      // Prepare the transaction to call the withdraw function
      const tx = instance.functions
        .withdraw(identityInput, assetIdInput, vaultSubID)
        .callParams({
          forward: [amount, shareAssetId.bits],
        });

      // Estimate transaction cost and set gas limits
      const cost = await tx.getTransactionCost();
      const gasLimit = cost.gasUsed.add(bn(1000));
      const maxFee = cost.maxFee.add(bn(1000));

      // Send the transaction
      const { waitForResult } = await tx
        .callParams({
          gasLimit: gasLimit,
        })
        .txParams({
          maxFee: maxFee,
        })
        .call();

      // Wait for the result of the transaction
      const { value } = await waitForResult();

      return value;
    } catch (error: any) {
      if (error instanceof FuelError) {
        throw new Error(`Detailed error during withdrawal: ${error.message}`);
      } else {
        throw new Error(error || "Something went wrong during withdrawal");
      }
    }
  }
};

export const getManagedAssets = async ({
  instance,
  underlyingAsset,
  vaultSubId,
}: ManagedAssetsParams): Promise<any> => {
  if (instance) {
    try {
      // Call the managed_assets function
      const assetIdInput = { bits: underlyingAsset };

      const { waitForResult } = await instance.functions
        .managed_assets(assetIdInput, vaultSubId)
        .call();

      const result = await waitForResult();
      return result.value;
      // Return the result
      return result;
    } catch (error: any) {
      throw new Error(`Error calling managed_assets: ${error.message}`);
    }
  }
};

