import { LendVault } from "../../swayContractFile";
import { useConnectUI, useDisconnect, useIsConnected } from "@fuels/react";
import { useWallet, useAccount } from "@fuels/react";
import { useEffect } from "react";
import { toBech32 } from "fuels";
import { Address } from "fuels";
import { useWalletContext } from "../../providers/wallet.auth.provider";
import { WalletUnlocked } from "fuels";

export const Header = () => {
  const { setInstance, setIdentityInput, contractId, instance } =
    useWalletContext();

  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();
  const { account } = useAccount();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const subID =
    "0xea6f3a4433cd5e9747c4c9ad6bba344c3e968ca29629d28456e4ea79d0cad757";

  useEffect(() => {
    if (isConnected && wallet) {
      const contractInstance = new LendVault(contractId, wallet);

      setInstance(contractInstance);
    }
    if (account) {
      const receiverAddress = new Address(toBech32(account));
      const identityInput = { Address: { bits: receiverAddress.toB256() } };
      setIdentityInput(identityInput);
    }
  }, [isConnected, wallet, account]);


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
