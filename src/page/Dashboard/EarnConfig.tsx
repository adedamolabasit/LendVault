import { useCallback } from "react";
import { InputBox } from "../../components/InputBox";
import { useWalletContext } from "../../providers/wallet.auth.provider";
import { LoanCalculator } from "../../utils/LoanCalculator";
import {
  useDepositAndMint,
  useBorrowAndMint,
} from "../../hooks/useVaultMutate";
import { DepositAndMintParams, BorrowAssetsParams } from "../../types";
import { Fuel, Asset } from "fuels";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { NetworkFuel } from "fuels";
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from "@fuels/connectors";
import { useAccount } from "@fuels/react";
import { sha256 } from "fuels";
import { createAssetId } from "fuels";
import { BorrowAndLock } from "../../api/mutate";

export const BorrowConfig = () => {
  const { account, isLoading: accountLoading } = useAccount();
  const { borrowAmount, identityInput, instance, vaultSubID, addressInput } =
    useWalletContext();
  const depositAndMintMutation = useDepositAndMint();
  const borrowAndMintMutation = useBorrowAndMint();
  const query = new useVaultQuery();

  // Fetch owner vault data
  const { data: ownerVault, isLoading: vaultLoading } = query.fetchSingleVault(
    account || ""
  );

  // Log owner vault data for debugging
  // console.log("Owner Vault Data:", ownerVault);

  // Initialize Fuel wallet with connectors
  const fuel = new Fuel({
    connectors: [
      new FuelWalletDevelopmentConnector(),
      new FueletWalletConnector(),
      new FuelWalletConnector(),
    ],
  });

  // const shareAssetVaultSubId =
  //   ownerVault?.assetId && ownerVault?.vaultId
  //     ? sha256(
  //         Buffer.concat([
  //           Buffer.from(ownerVault.assetId.slice(2), "hex"),
  //           Buffer.from(ownerVault.vaultId.slice(2), "hex"),
  //         ])
  //       )
  //     : undefined;

  // if (!shareAssetVaultSubId) {
  //   console.error(
  //     "Failed to generate shareAssetVaultSubId: Missing assetId or vaultId"
  //   );
  // }

  const contractId =
    "0x97d68b27a0a82597a353bea4bdf981361ad312988109258e058a9fba199a208b"; // Replace with actual contract ID

  // const shareAssetId = shareAssetVaultSubId
  //   ? createAssetId(contractId, shareAssetVaultSubId)
  //   : undefined;

  // if (!shareAssetId) {
  //   console.error(
  //     "Failed to create Share Asset ID: shareAssetVaultSubId is undefined"
  //   );
  // } else {
  //   console.log("Share Asset ID:", shareAssetId);
  // }

  // Loan Calculator configuration
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

  // Handle deposit and mint operation
  const handleDepositAndMint = useCallback(
    (params: DepositAndMintParams) => {
      depositAndMintMutation.mutate(params, {
        onError: (error: any) => {
          console.log("Something went wrong:", error);
        },
        onSuccess: async () => {
          if (!ownerVault) {
            const asset: Asset = {
              name: "Brace",
              symbol: "BRT",
              icon: "https://svgshare.com/i/1ATx.svg",
              networks: [
                {
                  type: "fuel",
                  chainId: 0, // Replace with actual chain ID for your network
                  decimals: 9, // Fuel network uses 9 decimals
                  assetId: vaultSubID, // Ensure shareAssetId is valid
                  contractId: contractId, // Ensure contractId is valid
                },
              ],
            };

            // Add the single asset to the user's wallet
            await fuel.addAssets([asset]);
            console.log("Asset added to the wallet", asset);

            console.log("Assets added successfully");
          }
        },
      });
    },
    [depositAndMintMutation, ownerVault] // Add necessary dependencies
  );

  // Handle submit function
  const handleSubmit = () => {
    const depositParams: DepositAndMintParams = {
      identityInput,
      instance,
      vaultSubID,
      borrowAmount: borrowAmount as number,
    };

    handleDepositAndMint(depositParams);
  };

  // Get current date for loan calculations
  const date = new Date();

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
            onClick={handleSubmit} // Call the handleSubmit function on click
          >
            Borrow Token
          </button>
        </div>
      </div>
    </div>
  );
};
