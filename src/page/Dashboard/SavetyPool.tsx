import { useCallback } from "react";
import { InputBox } from "../../components/InputBox";
import { useWalletContext } from "../../providers/fuel.provider";
import { LoanCalculator } from "../../utils/LoanCalculator";
import { useDepositAndMint } from "../../hooks/useVaultMutate";
import { DepositAndMintParams } from "../../types";
import { Fuel, Asset } from "fuels";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { Config , LVS_SUB_ID} from "../../config";
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from "@fuels/connectors";

export const SafetyPool = () => {
  const { account } = useAccount();
  const { borrowAmount, identityInput, instance } =
    useWalletContext();
  const depositAndMintMutation = useDepositAndMint();
  const query = new useVaultQuery();

  const fuel = new Fuel({
    connectors: [
      new FuelWalletDevelopmentConnector(),
      new FueletWalletConnector(),
      new FuelWalletConnector(),
    ],
  });

  const { data: ownerVault } = query.fetchSingleVault(account || "");
  const contractId = Config.contract_id;
  const date = new Date();


  const loanAmount = borrowAmount as number;
  const liquidationThreshold = 150;
  const loanStartDate = new Date();
  const loanDurationDays = 90;
  const interestRate = 5;
  const borrowingLimit = 75;

  const calculator = new LoanCalculator(
    interestRate,
    loanAmount,
    liquidationThreshold,
    loanStartDate,
    loanDurationDays,
    borrowingLimit
  );

  const handleDepositAndMint = useCallback(
    (params: DepositAndMintParams) => {
      depositAndMintMutation.mutate(params, {
        onError: (error: any) => {
          console.log("Something went wrong:", error);
        },
        onSuccess: async () => {
          if (!ownerVault) {
            const asset: Asset = {
              name: "LV SHARES",
              symbol: "LVS",
              icon: "https://svgshare.com/i/1ATx.svg",
              networks: [
                {
                  type: "fuel",
                  chainId: 0, 
                  decimals: 9, 
                  assetId: LVS_SUB_ID, 
                  contractId: contractId,
                },
              ],
            };

            await fuel.addAssets([asset]);
          }
        },
      });
    },
    [depositAndMintMutation, ownerVault] 
  );

  const handleSubmit = () => {
    const depositParams: DepositAndMintParams = {
      identityInput,
      instance,
      vaultSubID: LVS_SUB_ID,
      borrowAmount: borrowAmount as number,
    };

    handleDepositAndMint(depositParams);
  };

  return (
    <div className="h-5/6 w-full">
      <div className="flex flex-col px-12 py-6 gap-6">
        <div className="w-full">
          <InputBox />
        </div>

        <div className="rounded-lg bg-gray-50 px-4 py-6">
          <dl className="divide-y divide-gray-200 text-sm">
            <div className="flex items-center justify-between pb-4">
              <dt className="text-gray-600">Interest Rate</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getInterestAccrued(date)}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Collateral Ratio (CR)</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getLTVRatio()}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Loan to Value Ratio (LTV)</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getLTVRatio()}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="font-medium text-gray-900">
                Liquidation Threshold
              </dt>
              <dd className="font-medium text-indigo-600">
                {calculator.getLiquidationPrice()}
              </dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">
                Total Asset after Repayment
              </dt>
              <dd className="font-medium text-indigo-600">100</dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full border border-cyan-800 text-black"
            onClick={handleSubmit}
          >
            Borrow Token
          </button>
        </div>
      </div>
    </div>
  );
};
