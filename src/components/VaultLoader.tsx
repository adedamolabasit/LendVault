export const VaultLoader = () => {
    return (
      <div className="animate-pulse space-y-8">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold leading-6 text-gray-300">
              Account Loading...
            </h3>
          </div>
          <ul role="list" className="mt-4 space-y-4">
            {[...Array(1)].map((_, index) => (
              <li
                key={index}
                className="relative flex gap-x-4 rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm ring-1 ring-gray-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-300 text-gray-600">
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="absolute right-4 top-4 bg-gray-300 h-4 w-16 rounded"></div>
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          <div className="text-sm font-semibold leading-6 text-gray-300">
            Vault Loading...
          </div>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative flex gap-x-4 rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm ring-1 ring-gray-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-300 text-gray-600">
                </div>
                <div className="flex flex-col gap-x-2 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    );
  };
  