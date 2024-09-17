import { useVaultQuery } from "../hooks/useVaultQuery";
import { LVTIcon } from "../assets/Dashboard/LVTIcon";
import { EthereumIcon } from "../assets/Dashboard/EthereumIcon";

export const Board = () => {
  const query = new useVaultQuery();

  const { data: allLockedAssets } = query.fetchTotalLockedAssets();
  const { data: allDebts } = query.fetchTotalDebts();
  const { data: allVaults } = query.fetchTotalVaults();

  const stats = [
    {
      name: "Locked Assets",
      stat: allLockedAssets / 1e9,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <EthereumIcon className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Total Debts",
      stat: allDebts / 1e9,
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
          <LVTIcon className="w-8 h-8" />
        </div>
      ),
    },
    { name: "Total Number of Vaults", stat: allVaults },
  ];
  return (
    <div className="bg-gray-400/5 mt-12 rounded-lg">
      <dl className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white border-2 scale-75 border-bg-cyan-800 px-4 py-5 shadow"
          >
            <dt className="truncate text-sm font-medium text-gray-500 flex items-center gap-4 h-12">
              {item.icon}

              {item.name}
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
