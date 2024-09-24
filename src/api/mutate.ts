import { bn, FuelError } from "fuels";
import {
  DepositAndMintParams,
  RepayAndBurnParams,
  ManagedAssetsParams,
  BorrowAssetsParams,
  RepayLoanParams,
} from "../types";
import { AssetId } from "fuels";
import { sha256 } from "fuels";
import { createAssetId } from "fuels";
import { getMintedAssetId } from "fuels";
import { Config } from "../config";

const DEFAULT_SUB_ID =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

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
        .lock_and_borrow(addressInput, 2, 23)
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
        throw new Error(` ${error.message}`);
      } else {
        throw new Error(error || "Something went wrong");
      }
    }
  }
};

export const repayLoan = async ({
  addressInput,
  instance,
  repayAmount,
}: RepayLoanParams): Promise<any> => {
  const amount = bn.parseUnits(repayAmount.toString());
  const baseAssetId = instance?.provider.getBaseAssetId();
  const BASE_ASSET: AssetId = {
    bits: "0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c",
  };


  const tokentId = createAssetId(Config.contract_id, DEFAULT_SUB_ID);

  if (instance) {
    try {
      const tx = instance.functions
        .return_loan(addressInput, DEFAULT_SUB_ID)
        .callParams({
          forward: [amount, tokentId.bits],
        });

      const cost = await tx.getTransactionCost();
      const gasLimit = cost.gasUsed.add(bn(1000));
      const maxFee = cost.maxFee.add(bn(1000));

      const { waitForResult } = await tx
        .txParams({
          gasLimit: gasLimit,
          maxFee: maxFee,
        })
        .call();

      const { value } = await waitForResult();

      return value;
    } catch (error: any) {
      if (error instanceof FuelError) {
        throw new Error(`Detailed error during withdrawal: ${error.message}`);
      } else {
        throw new Error(error || "Something went wrong during withdrawal");
      }
    }
  } else {
    throw new Error("Instance is not defined");
  }
};

export const getInvestment = async ({
  identityInput,
  vaultSubID,
  underlyingAsset,
  withdrawAmount,
  instance,
}: RepayAndBurnParams): Promise<any> => {
  const amount = bn.parseUnits(withdrawAmount.toString());

  const contractId = Config.contract_id;

  const shareAssetVaultSubId = sha256(
    Buffer.concat([
      Buffer.from(underlyingAsset.slice(2), "hex"),
      Buffer.from(vaultSubID.slice(2), "hex"),
    ])
  );

  const shareAssetId = createAssetId(contractId, shareAssetVaultSubId);

  if (instance) {
    try {
      const assetIdInput = { bits: underlyingAsset };

      const tx = instance.functions
        .withdraw(identityInput, assetIdInput, vaultSubID)
        .callParams({
          forward: [amount, shareAssetId.bits],
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
      const assetIdInput = { bits: underlyingAsset };

      const { waitForResult } = await instance.functions
        .managed_assets(assetIdInput, vaultSubId)
        .call();

      const result = await waitForResult();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling managed_assets: ${error.message}`);
    }
  }
};
