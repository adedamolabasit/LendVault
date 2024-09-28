import { useState } from "react";
import { RepayLoanParams } from "../../types";
import { useRepayLoan } from "../../hooks/useVaultMutate";
import { useWalletContext } from "../../providers/fuel.provider";
import { toast } from "react-toastify";
import { EarnModal } from "../../components/EarnModal";
import { LVT_PRICE_IN_DOLLARS } from "../../config";

export const RepayLoan = () => {
  const returnAndBurnMutation = useRepayLoan();
  const { instance, addressInput, loanInfo, ethPrice, setActiveButton } =
    useWalletContext();

  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsLoading(true)
    if (instance) {
      const repayParams: RepayLoanParams = {
        addressInput,
        instance,
        repayAmount: (loanInfo?.tokenAmount / 1e9).toFixed(9),
      };

      returnAndBurnMutation.mutate(repayParams, {
        onSuccess: () => {
          toast.success("Repayment successful!");
          setActiveButton("vault");
          setIsLoading(false)
        },
        onError: (error) => {
          const errorMessage = error?.message || "";

          if (errorMessage.includes("No active loan")) {
            toast.error("You  do not have an active loan.");
          } else if (errorMessage.includes("ncorrect amount returned")) {
            toast.error(
              "You must return the amount of borrowed loan in LVT token . Please ensure you have enough funds before proceeding."
            );
          } else {
            toast.error(`An unexpected error occurred: ${errorMessage}`);
          }
          setIsLoading(false)
        },
      });
    } else {
      console.error("Invalid amount or instance");
    }
  };

  const collateral =
    ethPrice === null
      ? "Loading..."
      : `$${((loanInfo?.collateralAmount / 1e9) * ethPrice).toFixed(2)}`;


  if (loanInfo.has_loan) {
    return (
      <div className="h-5/6 w-full">
        <div className="flex flex-col px-12 py-6 gap-6">
          <div className="rounded-lg bg-gray-50 px-4 py-6">
            <h2 className="text-xl font-bold mb-6">Return Token</h2>
            <p className="mb-12">
              Return your loan would require you to have a soulbound token which
              shows your loan power to would help you create{" "}
            </p>
            <dl className="divide-y divide-gray-200 text-sm">
              <div className="flex items-center justify-between pb-4">
                <dt className="text-gray-600">Interest (fixed)</dt>
                <dd className="font-medium text-gray-900">3% interest</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Assets withdrawal (ETH)</dt>
                <dd className="font-bold text-bg-cyan-800">
                  {ethPrice === null
                    ? "Loading..."
                    : `$${(
                        (loanInfo?.collateralAmount / 1e9) *
                        ethPrice
                      ).toFixed(2)}`}
                </dd>
              </div>

              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Amount to returb</dt>
                <dd className="font-medium text-gray-900">
                  ${(loanInfo?.tokenAmount / LVT_PRICE_IN_DOLLARS).toFixed(2)}
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
              className="bg-cyan-800 text-white cursor-pointer w-full"
              onClick={() => setCanProceed(true)}
            >
              Return Loan
            </button>
          </div>
        </div>
        <EarnModal
          canProceed={canProceed}
          setCanProceed={setCanProceed}
          handleSubmit={handleSubmit}
          loanAmount={loanInfo?.tokenAmount}
          collateral={collateral}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    );
  }
};
