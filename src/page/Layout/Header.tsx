import { LendVault } from "../../swayContractFile";
import { useConnectUI, useDisconnect, useIsConnected } from "@fuels/react";
import { useWallet, useAccount } from "@fuels/react";
import { useEffect } from "react";
import { toBech32 } from "fuels";
import { Address } from "fuels";
import { useWalletContext } from "../../providers/fuel.provider";
import { LVTIcon } from "../../assets/Dashboard/LVTIcon";
import { Config } from "../../config";
import { Link } from "react-router-dom";

export const Header = () => {
  const { setInstance, setIdentityInput, setAddressInput } = useWalletContext();

  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();
  const { account } = useAccount();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();

  useEffect(() => {
    if (isConnected && wallet) {
      const contractInstance = new LendVault(Config.contract_id, wallet);
      setInstance(contractInstance);
    }
    if (account) {
      const receiverAddress = new Address(toBech32(account));
      const identityInput = { Address: { bits: receiverAddress.toB256() } };
      const addressInput = { bits: account };
      setIdentityInput(identityInput);
      setAddressInput(addressInput);
    }
  }, [isConnected, wallet, account, disconnect]);

  return (
    <div className="w-full bg-white shadow z-10">
      <div className="flex justify-between w-full px-6 py-4">
        <Link to="/">
          <div className="text-2xl font-extrabold flex items-center gap-4 cursor-pointer text-black">
            <div className="scale-25">
              <LVTIcon />
            </div>
            <div>LendVault</div>
          </div>
        </Link>

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
