import { useEffect } from "react";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { DashWrapper } from "../Layout/DashWrapper";
import {
  useVaultQuery,
  useFetchEthereumPrice,
} from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { truncateAddress } from "../../utils/TruncateWalletAddress";
import { LVTIcon } from "../../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../../assets/Dashboard/EthereumIcon";
import { VaultLoader } from "../../components/VaultLoader";
import { useWalletContext } from "../../providers/fuel.provider";
import { getLoanInfo } from "../../api/query";
import moment from "moment";
import { bn } from "fuels";
import { LoanBoard } from "../../components/LoanBoard";

interface Stat {
  name: string;
  value: any;
  icon?: React.ReactNode;
}

interface ActivityItem {
  user: {
    address: string;
  };
}

export default function Vault() {
  const { account, isLoading: accountLoading } = useAccount();
  const {
    addressInput,
    instance,
    setLoanInfo,
    loanInfo,
    setEthPrice,
    ethPrice,
  } = useWalletContext();
  const query = new useVaultQuery();

  const { isLoading: vaultLoading, refetch } = query.fetchSingleBorrower(
    account || ""
  );

  const {
    data: ethPriceRaw,
    isLoading: gettingPrice,
    refetch: refetchEthPrice,
  } = useFetchEthereumPrice();

  useEffect(() => {
    if (ethPriceRaw && !gettingPrice) {
      setEthPrice(ethPriceRaw);
    }
  }, [ethPriceRaw, gettingPrice]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const result = await getLoanInfo({ instance, addressInput });
        const {
          maturity_date,
          interest_rate,
          has_loan,
          collateral_amount,
          collateral_price_at_liquidation,
          loan_amount,
        } = result;
        const loanInformation = {
          duration: `${maturity_date.words[0]}${maturity_date.words[1]}`,
          has_loan,
          interest: interest_rate.words[0],
          collateralAmount: collateral_amount.words[0],
          assetPriceAtLq: bn(
            collateral_price_at_liquidation.words[0]
          ).toString(),
          tokenAmount: loan_amount.words[0],
        };
        setLoanInfo(loanInformation);
      } catch (error) {
        console.error("Error fetching loan info:", error);
      }
    };

    getInfo();
  }, [instance, addressInput]);

  useEffect(() => {
    if (!ethPrice) {
      refetchEthPrice();
    }
    const intervalId = setInterval(() => {
      refetchEthPrice();
    }, 90000);

    return () => clearInterval(intervalId);
  }, [refetchEthPrice, ethPrice]);

  const activityItems: ActivityItem[] = [
    {
      user: {
        address: `${
          account ? truncateAddress(account! as string) : "Not Connected"
        }`,
      },
    },
  ];

  const stats: Stat[] = [
    {
      name: "Token Borrowed",
      value: `${loanInfo?.tokenAmount || "0"} LVT`,
      icon: <LVTIcon className="w-8 h-8" />,
    },
    {
      name: "Collateral Locked",
      value:
        !ethPrice || loanInfo === null
          ? "Loading..."
          : `$${
              (
                (loanInfo?.collateralAmount / 1e9 || 0) * ethPrice! || 0
              ).toFixed(2) || "0.00"
            }`,
      icon: <EthereumIcon className="w-8 h-8" />,
    },
    {
      name: "Interest rate",
      value: loanInfo?.interest ? `${loanInfo?.interest}%` : "0.00",
      icon: <ChartBarSquareIcon className="h-8 w-8" />,
    },
    {
      name: "Value at Liquidation",
      value:
        loanInfo === null
          ? "Loading..."
          : `$${bn(loanInfo?.assetPriceAtLq)}` || "N/A",
    },
  ];

  const parsedDate = loanInfo?.duration
    ? moment(loanInfo?.duration, "YYYYMMDDHHmmss")
    : null;
  const readableDate = parsedDate
    ? parsedDate.format("MMMM Do YYYY, h:mm:ss a")
    : "N/A";

  return (
    <DashWrapper>
      <div>
        <LoanBoard />
      </div>

      {accountLoading || vaultLoading || gettingPrice ? (
        <DashWrapper>
          <VaultLoader />
        </DashWrapper>
      ) : (
        <div>
          <div className="mb-12 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Account
              </h3>
            </div>
            <ul role="list" className="mt-4 space-y-4">
              {activityItems.map((activity) => (
                <li className="relative flex gap-x-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm ring-1 ring-gray-900/10">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <span>{activity.user.address}</span>{" "}
                    </p>
                    <p className="text-sm text-gray-500">{readableDate}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm font-semibold leading-6 text-gray-900">
            Your Vault
          </div>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="relative flex gap-x-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm ring-1 ring-gray-900/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
                  {stat.icon}
                </div>
                <div className="flex flex-col gap-x-2">
                  <div className="text-sm font-semibold leading-6 text-gray-900">
                    {stat.name}
                  </div>
                  <div className="text-sm text-gray-500">{stat.value}</div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      )}
    </DashWrapper>
  );
}
