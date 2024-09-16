import { bn, FuelError } from "fuels";
import { DepositAndMintParams } from "../types";

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
