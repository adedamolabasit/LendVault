import { LVTIcon } from "../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../assets/Dashboard/EthereumIcon";
import { useEffect, useState } from "react";
import {
  getTotalDebts,
  getPoolInterest,
  getLockedCollateral,
  getTotalBorrowers,
} from "../api/query";
import { useWalletContext } from "../providers/fuel.provider";

const LoaderPulse = () => (
  <div className="flex justify-center items-center">
    <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
  </div>
);

export const LoanBoard = () => {
  const [totalDebts, setTotalDebts] = useState<number | null>(null);
  const [poolInterest, setPoolInterest] = useState<number | null>(null);
  const [totalCollateral, setTotalCollateral] = useState<number | null>(null);
  const [totalBorrowers, setTotalBorrowers] = useState<number | null>(null);
  const { instance, ethPrice } = useWalletContext();

  useEffect(() => {
    const getContractData = async () => {
      try {
        const debts = await getTotalDebts({ instance });
        const interest = await getPoolInterest({ instance });
        const collateral = await getLockedCollateral({ instance });
        const borrowers = await getTotalBorrowers({ instance });
        setTotalDebts(debts);
        setPoolInterest(interest);
        setTotalCollateral(collateral);
        setTotalBorrowers(borrowers);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };
    getContractData();
  }, [totalDebts, poolInterest, totalCollateral, totalBorrowers, instance]);

  const stats = [
    {
      name: "Total Collateral",
      stat:
        totalCollateral !== null
          ? `$${(((totalCollateral || 0) / 1e9) * ethPrice!).toFixed(2)}`
          : null,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <EthereumIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Total Loans (LVT)",
      stat: totalDebts !== null ? `${totalDebts || 0} LVT` : null,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Borrowers",
      stat: totalBorrowers !== null ? `${totalBorrowers || 0} ` : null,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-400/5 mt-12 rounded-lg p-4">
      <div className="text-lg font-medium p-4">Borrowers Vault Overview</div>
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white border-2 border-bg-cyan-800 px-4 py-5 shadow"
          >
            <dt className="truncate font-medium text-gray-500 flex items-center gap-4 h-12">
              <div className="text-lg font-extrabold w-full text-center">
                {item.name}
              </div>
            </dt>
            <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-900 text-center">
              {totalCollateral || poolInterest || totalCollateral ? (
                item.stat
              ) : (
                <LoaderPulse />
              )}{" "}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
