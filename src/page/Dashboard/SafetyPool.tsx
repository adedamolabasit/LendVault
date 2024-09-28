import { useCallback, useState } from "react";
import { InputBox } from "../../components/InputBox";
import { useWalletContext } from "../../providers/fuel.provider"
import { useDepositToPool } from "../../hooks/useVaultMutate";
import { BorrowAndMintParams } from "../../types";
import { Fuel, Asset } from "fuels";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { Config, LVS_SUB_ID } from "../../config";
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from "@fuels/connectors";
import { SafetyPoolModal } from "../../components/SafetyPoolModal";

export const SafetyPool = () => {
  const { account } = useAccount();
  const { amount, identityInput, instance, setActiveButton } =
    useWalletContext();
  const depositAndMintMutation = useDepositToPool();
  const query = new useVaultQuery();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canProceed, setCanProceed] = useState<boolean>(false);

  const fuel = new Fuel({
    connectors: [
      new FuelWalletDevelopmentConnector(),
      new FueletWalletConnector(),
      new FuelWalletConnector(),
    ],
  });

  const { data: ownerVault } = query.fetchSingleVault(account || "");
  const contractId = Config.contract_id;

  const handleDepositAndMint = useCallback(
    (params: BorrowAndMintParams) => {
      depositAndMintMutation.mutate(params, {
        onError: (error: any) => {
          console.log("Something went wrong:", error);
          setIsLoading(true);
        },
        onSuccess: async () => {
          if (!ownerVault) {
            const asset: Asset = {
              name: "LV SHARES",
              symbol: "LVS",
              icon: Config.lvtIcon,
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
          setCanProceed(false);
          setActiveButton("vault");
          setIsLoading(true);
        },
      });
    },
    [depositAndMintMutation, ownerVault]
  );

  const handleSubmit = () => {
    const depositParams: BorrowAndMintParams = {
      identityInput,
      instance,
      vaultSubID: LVS_SUB_ID,
      depositAmount: amount as number,
    };

    handleDepositAndMint(depositParams);
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col max-w-xl w-full px-6 py-8 gap-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Secure Your Future with Safety Pool
      </h2>
      <div className="w-full">
        <InputBox />
      </div>

      <div className="rounded-lg bg-gray-50 px-4 py-6">
        <dl className="divide-y divide-gray-200 text-sm">
          <div className="flex items-center justify-between pt-4">
            <dt className="font-medium text-gray-900">Shares on Investment</dt>
            <dd className="font-medium text-indigo-600">{amount} LVS</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="font-medium text-gray-900">Amount to Deposit</dt>
            <dd className="font-medium text-indigo-600">{amount} LVT</dd>
          </div>
        </dl>
      </div>

      <div className="flex justify-center">
        <button
          className={`${
            !amount
              ? "bg-cyan-700 opacity-60 cursor-not-allowed"
              : "bg-cyan-800 hover:bg-cyan-900 cursor-pointer"
          } w-full py-2 text-white text-lg font-semibold rounded-lg transition duration-300 ease-in-out`}
          onClick={() => setCanProceed(true)}
        >
          Deposit To Earn
        </button>
      </div>
      <SafetyPoolModal
        canProceed={canProceed}
        setCanProceed={setCanProceed}
        handleSubmit={handleSubmit}
        amountToDeposit={amount as number}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};
