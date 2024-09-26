import { useVaultQuery } from "../hooks/useVaultQuery";
import { LVTIcon } from "../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../assets/Dashboard/EthereumIcon";
import { useEffect, useState } from "react";

export const Board = () => {
  const query = new useVaultQuery();
  const [totalDebts, setTotalDebts] = useState(0.0);
  const [totalPaybacks, setTotalPaybacks] = useState(0.0);

  const { data: allDebts, isFetching: fetchingDebts } = query.fetchTotalDebts();
  const { data: allPaybacks, isFetching: fetchingPaybacks } = query.fetchTotalPaybacks();

  useEffect(() => {
    if (fetchingPaybacks || fetchingDebts) {
      console.log("fecting.");
    }
    if (fetchingPaybacks || fetchingDebts) {
      const debts = allDebts;
      const paybacks = allPaybacks;
      setTotalDebts(debts);
      setTotalPaybacks(paybacks);
    }
  }, [allDebts, allPaybacks, totalDebts]);

  console.log(totalDebts,"w1", totalPaybacks)

  const stats = [
    {
      name: "Safety Pool",
      // stat: allLockedAssets / 1e9,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <EthereumIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Total Debts",
      stat: `$${(totalDebts! - totalPaybacks) / 5}`,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
    // { name: "Share Holders", stat: allVaults },
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
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
