import { useState, useCallback } from "react";
import { InputBox } from "../../components/InputBox";
import { useWalletContext } from "../../providers/wallet.auth.provider";
import { LoanCalculator } from "../../utils/LoanCalculator";
import { useBorrowAndMint } from "../../hooks/useVaultMutate";
import { BorrowAssetsParams } from "../../types";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { BorrowModal } from "../../components/BorrowModal";
import { toast } from "react-toastify";

export const Borrow = () => {
  const { account } = useAccount();
  const { borrowAmount, instance, addressInput } = useWalletContext();
  const borrowAndMintMutation = useBorrowAndMint();
  const query = new useVaultQuery();

  const { data: ownerVault } = query.fetchSingleVault(account || "");

  const [canProceed, setCanProceed] = useState<boolean>(false);

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
    (params: BorrowAssetsParams) => {
      borrowAndMintMutation.mutate(params, {
        onSuccess: () => {
          toast.success("Deposit and mint were successful!");
        },
        onError: (error: any) => {
          const errorMessage = error?.message || "";
  
          if (errorMessage.includes("Active loan exists")) {
            toast.error(
              "You already have an active loan. Please repay your current loan before attempting to borrow again."
            );
          } 
          else if (errorMessage.includes("don't have enough funds to cover the transaction")) {
            toast.error(
              "Insufficient funds to cover the collateral. Please ensure you have enough funds before proceeding."
            );
          } 
          else {
            // Log the full error for debugging
            console.error("Unhandled error:", errorMessage);
            toast.error(`An unexpected error occurred: ${errorMessage}`);
          }
        },
      });
    },
    [borrowAndMintMutation, ownerVault]
  );
  

  const handleSubmit = () => {
    const depositParams: BorrowAssetsParams = {
      addressInput,
      instance,
      borrowAmount: calculator.getCollateralmount() as number,
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
              <dt className="text-gray-600">Interest (fixed)</dt>
              <dd className="font-medium text-gray-900">5% interest</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Assets to Deposit (Ether)</dt>
              <dd className="font-bold text-bg-cyan-800">
                {calculator.getCollateralmount() || "0.00"}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Loan to Value Ratio (LTV)</dt>
              <dd className="font-medium text-gray-900">2:1</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="font-medium text-gray-900">
                Liquidation Threshold
              </dt>
              <dd className="font-medium text-indigo-600">
                75% of Asset to Deposit
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Collateral Value at Liquidation</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getLiquidationPrice() || "0.00"}
              </dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">Loan Duration</dt>
              <dd className="font-medium text-indigo-600">30 days</dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-center">
          <button
            className={`${
              !borrowAmount
                ? "bg-cyan-700 opacity-60 cursor-not-allowed"
                : "bg-cyan-800 cursor-pointer"
            } w-full bg-cyan-800 text-white`}
            onClick={() => setCanProceed(true)}
            disabled={!borrowAmount}
          >
            Proceed To Borrow
          </button>
        </div>
      </div>
      <BorrowModal
        canProceed={canProceed}
        setCanProceed={setCanProceed}
        handleSubmit={handleSubmit}
        loadAmount={borrowAmount as number}
        collateralAmount={calculator.getCollateralmount()}
        interest="5%"
        repaymentDate="9304"
      />
    </div>
  );
};
