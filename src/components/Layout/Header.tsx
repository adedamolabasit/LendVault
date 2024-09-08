import { useConnectUI, useDisconnect, useIsConnected } from "@fuels/react";

export const Header = () => {
  const { connect, isConnecting } = useConnectUI();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  
  return (
    <div className="w-full bg-white shadow z-10">
      <div className="flex justify-between w-full px-6 py-4">
        <div className="text-2xl font-extrabold">LendVault</div>

        {isConnected ? (
          <button
            type="button"
            onClick={() => disconnect()}
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={connect}
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>
    </div>
  );
};
