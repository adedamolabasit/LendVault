import { LendVault } from "../../swayContractFile";
import { useConnectUI, useDisconnect, useIsConnected } from "@fuels/react";
import { useWallet } from "@fuels/react";
import { useEffect, useState } from "react";
import { BN } from "fuels";

export const Header = () => {
  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const [instance, setInstance] = useState<LendVault>();

  useEffect(() => {
    if (isConnected && wallet) {
      const contractInstance = new LendVault(
        "0x6d9e43c94bae53046b56ce54c5bf18af3ac4dd496e2881d6657b246af135f582",
        wallet
      );

      setInstance(contractInstance);
    }
  }, [isConnected, wallet]);

  const amountToTransfer = new BN(0.002);

  const transferAndRecord = async () => {
    try {
      if (instance) {
        const tx = await instance.functions
          .receive_funds()
          .callParams({
            forward: [amountToTransfer, instance.provider.getBaseAssetId()],
          })
          .txParams({
            variableOutputs: 1,
          })
          .call();

        await tx.waitForResult();
        console.log("Transfer successful");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
    }
  };

  const increase = async () => {
    // await instance.functions.increment(234).call()
    // const v = await instance.functions.get().get()
    // console.log(v,"hbjnkl")
    await transferAndRecord();
  };

  return (
    <div className="w-full bg-white shadow z-10">
      <div className="flex justify-between w-full px-6 py-4">
        <div className="text-2xl font-extrabold">LendVault</div>
        <button onClick={increase} className="bg-black">
          incr
        </button>

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
