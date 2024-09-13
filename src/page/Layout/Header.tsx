import { LendVault } from "../../swayContractFile";
import { useConnectUI, useDisconnect, useIsConnected } from "@fuels/react";
import { useWallet, useAccount, useBalance } from "@fuels/react";
import { useEffect, useState } from "react";
import { BN, createAssetId, getRandomB256, isBech32, toBech32 } from "fuels";
import { Address } from "fuels";
import { AbstractAddress, assembleRevertError } from 'fuels'; // Adjust the import based on your project structure
import { FuelError } from "fuels";
import { bn } from "fuels";


export const Header = () => {
  const subID = getRandomB256();
  const vaultID = getRandomB256();

  const assetId: any = createAssetId(
    "0x6d9e43c94bae53046b56ce54c5bf18af3ac4dd496e2881d6657b246af135f582",
    subID
  );

  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();
  const { account } = useAccount();
  const { balance } = useBalance({
    address: account as string,
    assetId: assetId.bits,
  });
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const [instance, setInstance] = useState<LendVault>();
  let address: any;
  let identityInput: any;

  if (account) {
  //  address = Address.fromB256(account as string);
  const receiverAddress = new Address(toBech32(account));
  identityInput = { Address: { bits: receiverAddress.toB256() } };

    // const receiverAddress = new Address(account);
    // console.log(receiverAddress,"eded")

    
    // if (isBech32(account)) {
    //   console.log('Valid Bech32 address');
    // } else {
    //   console.log('Invalid Bech32 address');
    // }
    // console.log(toB256(address),"ieiei")
  }
  // console.log(address,"ew")

  useEffect(() => {
    if (isConnected && wallet) {
      const contractInstance = new LendVault(
        "0xa547a8dfd1c7f6bf620d4dcec8beecabac2f3d361a90195f7ad47e4e6cb6bb3c",
        wallet
      );

      setInstance(contractInstance);
    }
    if(account){
      const receiverAddress = new Address(toBech32(account));
      identityInput = { Address: { value: receiverAddress.toB256() } };
      console.log(identityInput,"rewf")
    }

  }, [isConnected, wallet,account]);
  

  const amountToTransfer = bn.parseUnits('0.001');

  const transferAndRecord = async () => {
    if (identityInput) {
      try {
        if (!instance) {
          throw new Error("Instance is not defined");
        }
  
        if (!amountToTransfer) {
          throw new Error("Amount to transfer is not defined");
        }
  
        if (!vaultID) {
          throw new Error("Vault ID is not defined");
        }
  
        const baseAssetId = instance.provider.getBaseAssetId();
  
        // Prepare the transaction call
        const tx = instance.functions.deposit(identityInput, vaultID).callParams({
          forward: [amountToTransfer, baseAssetId],
        });
  
        // Estimate the transaction cost
        const cost = await tx.getTransactionCost();
  
        // Use the estimated gas used and max fee, adding a buffer to the gas limit and max fee
        const gasLimit = cost.gasUsed.add(bn(1000)); // Adding a buffer of 1000 gas units
        const maxFee = cost.maxFee.add(bn(1000)); // Adding a buffer of 1000 units to the max fee
  
        const { waitForResult } = await tx
          .callParams({
            gasLimit: gasLimit,
          })
          .txParams({
            maxFee: maxFee,
          })
          .call();
  
        const { value } = await waitForResult();
  
        console.log("Asset Deposited successfully, value returned:", value);
      } catch (error) {
        if (error instanceof FuelError) {
          console.error("Detailed error during transfer:", error);
        } else {
          console.error("Error during transfer:", error);
        }
      }
    } else {
      console.log("No identity input");
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
          nfvrj
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
