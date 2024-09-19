import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { DashWrapper } from "../Layout/DashWrapper";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { truncateAddress } from "../../utils/TruncateWalletAddress";
import { LVTIcon } from "../../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../../assets/Dashboard/EthereumIcon";
import { VaultLoader } from "../../components/VaultLoader";
import { useFetchEthereumPrice } from "../../hooks/useVaultQuery";
import { useEffect } from "react";

interface Stat {
  name: string;
  value: any;
  icon?: React.ReactNode;
}

interface ActivityItem {
  user: {
    name: string;
    imageUrl: string;
  };
  commit: string;
  branch: string;
  status: "Completed" | "Error";
  duration: string;
  date: string;
  dateTime: string;
}

export default function Vault() {
  const { account, isLoading: accountLoading } = useAccount();
  const query = new useVaultQuery();

  const { data: borrowerData, isLoading: vaultLoading } =
    query.fetchSingleBorrower(account || "");

  const {
    data: ethPrice,
    isLoading: gettingPrice,
    refetch,
  } = useFetchEthereumPrice();

  // Set up a timer to refetch the Ethereum price every 30 seconds
  useEffect(() => {
    if (!ethPrice){
      refetch()
    }
    const intervalId = setInterval(() => {
      refetch(); // Refetch the Ethereum price
    }, 30000); // 30 seconds in milliseconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [refetch, ethPrice]);

  if (accountLoading || vaultLoading) {
    return (
      <DashWrapper>
        <VaultLoader />
      </DashWrapper>
    );
  }

  if (!account) {
    return (
      <DashWrapper>
        <div>No account connected.</div>
      </DashWrapper>
    );
  }

  const activityItems: ActivityItem[] = [
    {
      user: {
        name: truncateAddress(account as string) || "Not Connected",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      commit: "",
      branch: "main",
      status: "Completed",
      duration: "25s",
      date: "45 minutes ago",
      dateTime: "2023-01-23T11:00",
    },
  ];

  const stats: Stat[] = [
    {
      name: "Total Borrowed",
      value: borrowerData?.collateralLocked / 1e9 || "0.00",
      icon: <LVTIcon className="w-8 h-8" />,
    },
    {
      name: "Collateral Locked",
      value: gettingPrice ? (
          "Loading..."
      ) : (
        `$${((borrowerData?.tokenMinted / 1e9) * ethPrice!).toFixed(2)}` ||
        "0.00"
      ),
      icon: <EthereumIcon className="w-8 h-8" />,
    },
    {
      name: "Interest rate",
      value: "Unknown",
      icon: <ChartBarSquareIcon className="h-8 w-8" />,
    },
    { name: "Loan Repayment", value: "Unknown" },
  ];

  return (
    <DashWrapper>
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Account
          </h3>
        </div>
        <ul role="list" className="mt-4 space-y-4">
          {activityItems.map((activity) => (
            <li
              key={activity.dateTime}
              className="relative flex gap-x-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm ring-1 ring-gray-900/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
                <img
                  src={activity.user.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span>{activity.user.name}</span>{" "}
                  <span>{activity.commit}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {activity.branch} - {activity.status} - {activity.duration} -{" "}
                  {activity.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-sm font-semibold leading-6 text-gray-900">
          Vault
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
    </DashWrapper>
  );
}
