import { LVTIcon } from "../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../assets/Dashboard/EthereumIcon";
import { useEffect, useState } from "react";
import {
  getPoolInterest,
  getSafteyPoolBalanace,
  getTotalSharesHolder
} from "../api/query";
import { useWalletContext } from "../providers/fuel.provider";

const LoaderPulse = () => (
  <div className="flex justify-center items-center">
    <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
  </div>
);

export const PoolBoard = () => {
  const [poolInterest, setPoolInterest] = useState<number | null>(null);
  const [saftyPoolBalance, setSavetyPoolBalance] = useState<number | null>(null);
  const [totalSharesHolder, setTotalSharesHolder] = useState<number | null>(null);
  const { instance, ethPrice } = useWalletContext();

  useEffect(() => {
    const getContractData = async () => {
      try {

        const interest = await getPoolInterest({ instance });
        const poolBalance = await getSafteyPoolBalanace({ instance });
        const sharesHolder = await getTotalSharesHolder({ instance });


        setPoolInterest(interest);
        setSavetyPoolBalance(poolBalance);
        setTotalSharesHolder( sharesHolder );

      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };
    getContractData();
  }, [totalSharesHolder,poolInterest, saftyPoolBalance, instance]);

  const stats = [
    {
      name: "Safety Pool (LVT)",
      stat: saftyPoolBalance !== null ? `${saftyPoolBalance || 0} LVT` : null,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <EthereumIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Interest Gained",
      stat:  poolInterest !== null
      ? `$${(((poolInterest || 0) / 1e9) * ethPrice!).toFixed(2)}`
      : null,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Share Holders",
      stat:  totalSharesHolder !== null ? `${totalSharesHolder || 0} ` : null,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-400/5 mt-12 rounded-lg p-4">
      <div className="text-lg font-medium p-4">Safety Pool Overview</div>
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white border-2 border-bg-cyan-800 px-4 py-5 shadow text-center"
          >
            <dt className="truncate font-medium text-gray-500 flex items-center gap-4 h-12">
              <div className="text-lg font-extrabold text-center w-full">
                {item.name}
              </div>
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 text-center">
              {totalSharesHolder || poolInterest || saftyPoolBalance ? (
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
