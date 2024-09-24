import { useState, useCallback } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { RepayAndBurnParams, RepayLoanParams } from "../../types";
import { useRepayLoan } from "../../hooks/useVaultMutate";
import { useWalletContext } from "../../providers/wallet.auth.provider";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { InputBox } from "../../components/InputBox";

export const RepayLoan = () => {
  // const { account, isLoading: accountLoading } = useAccount();
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const returnAndBurnMutation = useRepayLoan();
  const { identityInput, instance, vaultSubID, addressInput } =
    useWalletContext();
  const query = new useVaultQuery();

  // const { data: ownerVault, isLoading: vaultLoading } = query.fetchSingleVault(
  //   account || ""
  // );

  // if (accountLoading || vaultLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!ownerVault) {
  //   return <div>No vault data available.</div>;
  // }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    } else {
      setAmount(undefined);
    }
  };

  const handleSubmit = () => {
    if (instance) {
      const repayParams: RepayLoanParams = {
        addressInput,
        instance,
        repayAmount: 0.001,
      };

      returnAndBurnMutation.mutate(repayParams, {
        onSuccess: (data) => {
          console.log("Repayment successful:", data);
        },
        onError: (error) => {
          console.error("Error during repayment:", error);
        },
      });
    } else {
      console.error("Invalid amount or instance");
    }
  };

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
              <dd className="font-medium text-gray-900">5% interest</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Assets withdrawal (Ether)</dt>
              <dd className="font-bold text-bg-cyan-800">{"0.00"}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Amount to returb</dt>
              <dd className="font-medium text-gray-900">0.00</dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">Loan Duration</dt>
              <dd className="font-medium text-indigo-600">30 days</dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-cyan-800 cursor-pointer w-full"
            onClick = {handleSubmit}
            // onClick={() => setCanProceed(true)}
            // disabled={!borrowAmount}
          >
            Proceed To Borrow
          </button>
        </div>
      </div>
      {/* <BorrowModal
      canProceed={canProceed}
      setCanProceed={setCanProceed}
      handleSubmit={handleSubmit}
      loadAmount={borrowAmount as number}
      collateralAmount={calculator.getCollateralmount()}
      interest="5%"
      repaymentDate="9304"
    /> */}
    </div>
  );
};
