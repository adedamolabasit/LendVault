import { useState, useCallback, useEffect } from "react";
import { InputBox } from "../../components/InputBox";
import { useWalletContext } from "../../providers/fuel.provider";
import { useBorrowAndMint } from "../../hooks/useVaultMutate";
import { BorrowAssetsParams } from "../../types";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { BorrowModal } from "../../components/BorrowModal";
import { toast } from "react-toastify";
import moment from "moment";
import { Config, LVT_SUB_ID, LVT_PRICE_IN_DOLLARS } from "../../config";
import { Asset, Fuel } from "fuels";
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from "@fuels/connectors";

export const Borrow = () => {
  const { account } = useAccount();
  const {
    amount,
    instance,
    addressInput,
    ethPrice,
    setAmount,
    setActiveButton,
  } = useWalletContext();
  const borrowAndMintMutation = useBorrowAndMint();
  const query = new useVaultQuery();

  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [ethInToken, setEthInToken] = useState<number>(0.0);
  const [ethInUSD, setEthInUSD] = useState<number>(0.0);
  const [assetAtLq, setAssetAtLq] = useState<number>(0.0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: ownerVault } = query.fetchSingleVault(account || "");

  const priceInLVT = amount! * LVT_PRICE_IN_DOLLARS;

  const fuel = new Fuel({
    connectors: [
      new FuelWalletDevelopmentConnector(),
      new FueletWalletConnector(),
      new FuelWalletConnector(),
    ],
  });

  const handleDepositAndMint = useCallback(
    (params: BorrowAssetsParams) => {
      borrowAndMintMutation.mutate(params, {
        onSuccess: async () => {
          const asset: Asset = {
            name: "LVT Stable Token",
            symbol: "LVT",
            icon: Config.lvtIcon,
            networks: [
              {
                type: "fuel",
                chainId: 0,
                decimals: 9,
                assetId: LVT_SUB_ID,
                contractId: Config.contract_id,
              },
            ],
          };

          await fuel.addAssets([asset]);
          toast.success("Loan Borrowed successful!");
          setCanProceed(false);
          setActiveButton("vault");
          setIsLoading(false);
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
          setIsLoading(false);
        },
      });
    },
    [borrowAndMintMutation, ownerVault]
  );

  const handleSubmit = () => {
    const depositParams: BorrowAssetsParams = {
      addressInput,
      instance,
      collateralAmount: ethInToken as number,
      loanAmount: priceInLVT,
      interestRate: 3,
      collateralAtLq: parseInt(assetAtLq.toFixed(2)),
      maturityDate: parseInt(moment().add(30, "days").format("YYYYMMDDHHmmss")),
    };

    handleDepositAndMint(depositParams);
    setIsLoading(true);
  };

  const next30Days = moment()
    .add(30, "days")
    .format("dddd, MMMM DD, YYYY HH:mm");

  useEffect(() => {
    if (amount && ethPrice) {
      const ethQty = 1 / ethPrice;
      const ethToLock = amount * ethQty * 2;
      const ethToLockInUSD = amount * ethQty * 2 * ethPrice;
      const assetAtLqPrice = ethToLockInUSD * 0.75;
      setEthInToken(ethToLock);
      setEthInUSD(ethToLockInUSD);
      setAssetAtLq(assetAtLqPrice);
    } else {
      setEthInToken(0);
      setEthInUSD(0);
      setAmount(0);
    }
  }, [amount, ethPrice, ethInToken, assetAtLq]);

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
                  <div className="text-indigo-600">
                    ${ethInUSD?.toFixed(2) || ethPrice}
                  </div>
                </div>
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Loan amount (LVT TOKEN)</dt>
              <dd className="font-bold text-bg-cyan-800">
                <div className="flex gap-2 items-center">
                  <div className="text-cyan-800">
                    {priceInLVT || "0.00"} LVT
                  </div>
                  <div className="scale-150">≍</div>
                  <div className="text-indigo-600">
                    ${amount?.toFixed(2) || 1}
                  </div>
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
              <dd className="font-medium text-indigo-600">75% of Collateral</dd>
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
              !amount || !account
                ? "bg-cyan-700 opacity-60 cursor-not-allowed"
                : "bg-cyan-800 cursor-pointer"
            } w-full bg-cyan-800 text-white`}
            onClick={() => setCanProceed(true)}
            disabled={!amount}
          >
            {!account ? "Connect Your Wallet" : "Proceed To Borrow"}
          </button>
        </div>
      </div>
      <BorrowModal
        canProceed={canProceed}
        setCanProceed={setCanProceed}
        handleSubmit={handleSubmit}
        loadAmount={amount as number}
        collateralAmount={ethInUSD}
        assetAtLq={assetAtLq}
        interest="3%"
        maturityDate={next30Days}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};
