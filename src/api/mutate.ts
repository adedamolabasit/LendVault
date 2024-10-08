import { bn, FuelError, sha256, createAssetId } from "fuels";
import {
  BorrowAndMintParams,
  RepayAndBurnParams,
  ManagedAssetsParams,
  BorrowAssetsParams,
  RepayLoanParams,
  LoanInfoParams,
} from "../types";
import { Config, LVT_SUB_ID } from "../config";

export const depositToSafteyPool = async ({
  identityInput,
  instance,
  depositAmount,
}: BorrowAndMintParams): Promise<any> => {
  console.log(depositAmount,"ywy")

  if (instance) {
    try {
      const tokenId = createAssetId(Config.contract_id, LVT_SUB_ID);

      const tx = instance.functions
        .deposit(identityInput, LVT_SUB_ID)
        .callParams({
          forward: [depositAmount, tokenId.bits],
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
  collateralAmount,
  loanAmount,
  interestRate,
  collateralAtLq,
  maturityDate,
}: BorrowAssetsParams): Promise<any> => {
  const amount = bn.parseUnits(collateralAmount.toFixed(3));
  const collateralAtLqd = bn.parseUnits(collateralAtLq.toFixed(3));

  if (instance) {
    try {
      const baseAssetId = instance.provider.getBaseAssetId();

      const tx = instance.functions
        .lock_and_borrow(
          addressInput,
          interestRate,
          loanAmount,
          maturityDate,
          collateralAtLqd
        )
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

  const tokentId = createAssetId(Config.contract_id, LVT_SUB_ID);

  if (instance) {
    try {
      const tx = instance.functions
        .return_loan(addressInput, LVT_SUB_ID, 3)
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

export const getLoanInfo = async ({
  instance,
  addressInput,
}: LoanInfoParams): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_loan_info(addressInput).get();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  }
};
