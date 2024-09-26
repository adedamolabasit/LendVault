import { LVTIcon } from "../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../assets/Dashboard/EthereumIcon";
import { useEffect, useState } from "react";
import { getTotalDebts, getPoolInterest } from "../api/query";
import { useWalletContext } from "../providers/fuel.provider";

export const Board = () => {
  const [totalDebts, setTotalDebts] = useState(0.0);
  const [poolInterest, setPoolInterest] = useState(0.0);
  const { instance, ethPrice } = useWalletContext();

  useEffect(() => {
    const getContractData = async () => {
      const debts = await getTotalDebts({ instance });
      const interest = await getPoolInterest({ instance });
      setTotalDebts(debts);
      setPoolInterest(interest)
    };
    getContractData();
  }, [instance]);

  const stats = [
    {
      name: "Collateral Locked",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <EthereumIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Total Debts",
      stat: `${totalDebts || 0} LVT` || "",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Interest",
      stat: `$${(((poolInterest || 0 ) / 1e9) * ethPrice!).toFixed(2)}`,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-400/5 mt-12 rounded-lg">
      <dl className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white border-2 scale-75 border-bg-cyan-800 px-4 py-5 shadow"
          >
            <dt className="truncate  font-medium text-gray-500 flex items-center gap-4 h-12">
              {item.icon}
              <div className="text-lg font-extrabold">{item.name}</div>
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 text-center">
              {item.stat || 0}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
