import { createContext, useContext, useState, ReactNode } from "react";
import { LendVault } from "../swayContractFile";
import { getRandomB256 } from "fuels";

interface WalletContextType {
  instance: LendVault | undefined;
  setInstance: React.Dispatch<React.SetStateAction<LendVault | undefined>>;
  contractId: string;
  vaultSubID: string;
  setIdentityInput: React.Dispatch<any>;
  identityInput: any;
  setBorrowAmount: React.Dispatch<React.SetStateAction<number | undefined>>
  borrowAmount: number | undefined
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [instance, setInstance] = useState<LendVault>();
  const [identityInput, setIdentityInput] = useState<any>();
  const [borrowAmount, setBorrowAmount] = useState<number>();

  const vaultSubID = getRandomB256();
  // const vaultSubID = "0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00"

  const contractId = "0x28d6d0518830e47d73a527f218a0732fe2825baca2c57315cffa299353e8e6fe";


  return (
    <WalletContext.Provider
      value={{
        instance,
        setInstance,
        vaultSubID,
        setIdentityInput,
        identityInput,
        contractId,
        borrowAmount,
        setBorrowAmount
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within an WalletProvider");
  }
  return context;
};
