import { WalletIcon } from "../assets/Dashboard/WalletIcon";
import { useConnectUI} from "@fuels/react";

export const NotConnected = () => {
    const { connect } = useConnectUI();
  return (
    <div className="h-full w-full justify-center">
      <button
      onClick={connect}
        type="button"
        className="flex flex-col justify-center items-center relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div className="px-6 border-2 border-black rounded-lg">
          <WalletIcon />
        </div>
        <span className="font-bold mt-2 block text-sm text-cyan-800 font-semibold text-gray-900">
          Connect Your wallet
        </span>
      </button>
    </div>
  );
};
