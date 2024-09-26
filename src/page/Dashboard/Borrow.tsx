import { useState, useCallback, useEffect } from "react";
import { InputBox } from "../../components/InputBox";
import { useWalletContext } from "../../providers/wallet.auth.provider";
import { LoanCalculator } from "../../utils/LoanCalculator";
import { useBorrowAndMint } from "../../hooks/useVaultMutate";
import { BorrowAssetsParams } from "../../types";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { BorrowModal } from "../../components/BorrowModal";
import { toast } from "react-toastify";
import moment from 'moment';

export const Borrow = () => {
  const { account } = useAccount();
  const { borrowAmount, instance, addressInput, ethPrice, setBorrowAmount, setActiveButton } = useWalletContext();
  const borrowAndMintMutation = useBorrowAndMint();
  const query = new useVaultQuery();

  const { data: ownerVault } = query.fetchSingleVault(account || "");

  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [ethInToken, setEthInToken] = useState<number>(0.0);
  const [ethInUSD, setEthInUSD] = useState<number>(0.0);
  const [assetAtLq, setAssetAtLq] = useState<number>(0.0);

  const priceInLVT = borrowAmount! * 5;



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
          setCanProceed(false)
          setActiveButton('vault')
        },
        onError: (error: any) => {
          const errorMessage = error?.message || "";

          if (errorMessage.includes("Active loan exists")) {
            toast.error(
              "You already have an active loan. Please repay your current loan before attempting to borrow again."
            );
          } else if (
            errorMessage.includes(
              "don't have enough funds to cover the transaction"
            )
          ) {
            toast.error(
              "Insufficient funds to cover the collateral. Please ensure you have enough funds before proceeding."
            );
          } else {
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
      collateralAmount:ethInToken as number,
      loanAmount: priceInLVT,
      interestRate: 3,
      collateralAtLq: parseInt(assetAtLq.toFixed(2)),
      maturityDate: parseInt(moment().add(30, 'days').format('YYYYMMDDHHmmss'))

    };

    handleDepositAndMint(depositParams);
  };
  console.log(parseInt(moment().add(30, 'days').format('YYYYMMDDHHmmss')), "kojo")

  const next30Days = moment().add(30, 'days').format('dddd, MMMM DD, YYYY HH:mm');

  useEffect(() => {
    if (borrowAmount && ethPrice) {
      const ethQty = 1 / ethPrice; 
      const ethToLock = borrowAmount * ethQty * 2;
      const ethToLockInUSD = borrowAmount * ethQty * 2 * ethPrice;
      const assetAtLqPrice = ethToLockInUSD * 0.75
      
      setEthInToken(ethToLock);
      setEthInUSD(ethToLockInUSD);
      setAssetAtLq(assetAtLqPrice)
      console.log(ethInToken?.toFixed(3),"ejwj")
    } else {
      setEthInToken(0);
      setEthInUSD(0);
      setBorrowAmount(0)
    }
  }, [borrowAmount, ethPrice, ethInToken, assetAtLq]);

  return (
    <div className="h-5/6 w-full">
      <div className="flex flex-col px-12 py-6 gap-6">
        <div className="w-full">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Loan Amount
          </label>
          <InputBox />
        </div>

        <div className="rounded-lg bg-gray-50 px-4 py-6">
          <dl className="divide-y divide-gray-200 text-sm">
            <div className="flex items-center justify-between pb-4">
              <dt className="text-gray-600">Interest (fixed)</dt>
              <dd className="font-medium text-gray-900">3% interest</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Collateral to Deposit (ETH)</dt>
              <dd className="font-bold text-bg-cyan-800">
                <div className="flex gap-2 items-center">
                  <div className="text-cyan-800">
                    {ethInToken?.toFixed(3) || "1"} ETH
                  </div>
                  <div className="scale-150">≍</div>
                  <div className="text-indigo-600">${ethInUSD?.toFixed(2) || ethPrice}</div>
                </div>
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Loan amount (LVT TOKEN)</dt>
              <dd className="font-bold text-bg-cyan-800">
                <div className="flex gap-2 items-center">
                  <div className="text-cyan-800">{priceInLVT || "0.00"} LVT</div>
                  <div className="scale-150">≍</div>
                  <div className="text-indigo-600">${borrowAmount?.toFixed(2) || 1}</div>
                </div>
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
                75% of Collateral
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Collateral Value at Liquidation</dt>
              <dd className="font-medium text-gray-900">
                ${assetAtLq.toFixed(2) || "0.00"}
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
        collateralAmount={ethInUSD}
        assetAtLq={assetAtLq}
        interest="3%"
        maturityDate = {next30Days }
      />
    </div>
  );
};
