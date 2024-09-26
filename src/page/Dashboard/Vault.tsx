import { useEffect, useState, useCallback } from "react";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { DashWrapper } from "../Layout/DashWrapper";
import { useVaultQuery } from "../../hooks/useVaultQuery";
import { useAccount } from "@fuels/react";
import { truncateAddress } from "../../utils/TruncateWalletAddress";
import { LVTIcon } from "../../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../../assets/Dashboard/EthereumIcon";
import { VaultLoader } from "../../components/VaultLoader";
import { useFetchEthereumPrice } from "../../hooks/useVaultQuery";
import { useGetLoanInfo } from "../../hooks/useVaultMutate";
import { useWalletContext } from "../../providers/wallet.auth.provider";
import { LoanInfoParams } from "../../types";
import { toast } from "react-toastify";
import { useFetchLoanInfo } from "../../hooks/useVaultQuery";
import { getLoanInfo } from "../../api/query";
import moment from "moment";
import { bn } from "fuels";

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
  const {
    addressInput,
    instance,
    setLoanInfo,
    loanInfo,
    setEthPrice,
    ethPrice,
  } = useWalletContext();
  const query = new useVaultQuery();
  const TOKEN_PRICE_IN_DOLLAR = 5;

  // State to store borrower data and Ethereum price
  const [borrowerData, setBorrowerData] = useState<any>(null);

  // Fetch borrower data and Ethereum price
  const { data: allDebts, isFetching } = query.fetchTotalDebts();
  const { data: borrowerRawData, isLoading: vaultLoading } =
    query.fetchSingleBorrower(account || "");

  const {
    data: ethPriceRaw,
    isLoading: gettingPrice,
    refetch: refetchEthPrice,
  } = useFetchEthereumPrice();

  console.log(allDebts)

  // Set up the state for the fetched data
  useEffect(() => {
    if (borrowerRawData && !vaultLoading) {
      setBorrowerData(borrowerRawData);
    }
  }, [borrowerRawData, vaultLoading]);

  useEffect(() => {
    if (ethPriceRaw && !gettingPrice) {
      setEthPrice(ethPriceRaw);
    }
  }, [ethPriceRaw, gettingPrice]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const result = await getLoanInfo({ instance, addressInput });
        console.log(result, "tetey");
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
          assetPriceAtLq: bn(collateral_price_at_liquidation.words[0]).toString(),
          tokenAmount: loan_amount.words[0],
        };
        setLoanInfo(loanInformation);
        console.log(loanInfo, "urwi"); // Log the result after it's resolved
      } catch (error) {
        console.error("Error fetching loan info:", error); // Handle potential errors
      }
    };

    getInfo(); // Call the function but don't await it directly here
  }, [instance, addressInput]);

  // Refetch the Ethereum price every 30 seconds
  useEffect(() => {
    if (!ethPrice) {
      refetchEthPrice();
    }
    const intervalId = setInterval(() => {
      refetchEthPrice();
    }, 90000); // 30 seconds interval

    return () => clearInterval(intervalId);
  }, [refetchEthPrice, ethPrice]);

  if (accountLoading || vaultLoading || gettingPrice) {
    return (
      <DashWrapper>
        <VaultLoader />
      </DashWrapper>
    );
  }

  if (!account || !instance) {
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
      name: "Token Borrowed",
      value: `$${(loanInfo?.tokenAmount / TOKEN_PRICE_IN_DOLLAR).toFixed(2)}`,
      icon: <LVTIcon className="w-8 h-8" />,
    },
    {
      name: "Collateral Locked",
      value:
        !ethPrice || loanInfo === null
          ? "Loading..."
          : `$${((loanInfo?.collateralAmount / 1e9) * ethPrice!).toFixed(2)}`,
      icon: <EthereumIcon className="w-8 h-8" />,
    },
    {
      name: "Interest rate",
      value: loanInfo?.interest
        ? `${loanInfo?.interest}%`
        : "0.00",
      icon: <ChartBarSquareIcon className="h-8 w-8" />,
    },
    {
      name: "Value at Liquidation",
      value:
         loanInfo === null
          ? "Loading..."
          : `$${(bn(loanInfo?.assetPriceAtLq))}` || "0.00",
    },
  ];
  const inputDateString = '53117507301614';
  if (inputDateString.length === 14) {
    const parsedDate = moment(inputDateString, 'YYYYMMDDHHmmss');
    if (parsedDate.isValid()) {
        console.log('Readable Date:', parsedDate.format('MMMM Do YYYY, h:mm:ss a'));
    } else {
        console.log('Invalid date from input format');
    }
} else {
    console.log('Input date string must be 14 characters long');
}

  const parsedDate = moment(loanInfo.duration, 'YYYYMMDDHHmmss');

// Step 3: Format it to a readable date and time format
const readableDate = parsedDate.format('MMMM Do YYYY, h:mm:ss a');
console.log(readableDate)

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
        
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span>{activity.user.name}</span>{" "}
                  <span>{activity.commit}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {readableDate}
                  {/* {activity.branch} - {activity.status} - {activity.duration} -{" "}
                  {activity.date} */}
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
