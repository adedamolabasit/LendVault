import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LendVault } from "../swayContractFile";
import { getRandomB256 } from "fuels";

interface WalletContextType {
  instance: LendVault | undefined;
  setInstance: React.Dispatch<React.SetStateAction<LendVault | undefined>>;
  vaultSubID: string;
  setIdentityInput: React.Dispatch<any>;
  setAddressInput: React.Dispatch<any>;
  addressInput: any;
  identityInput: any;
  setBorrowAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  borrowAmount: number | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [instance, setInstance] = useState<LendVault>();
  const [identityInput, setIdentityInput] = useState<any>();
  const [addressInput, setAddressInput] = useState<any>();
  const [borrowAmount, setBorrowAmount] = useState<number>();



  const vaultSubID = getRandomB256();


  return (
    <WalletContext.Provider
      value={{
        instance,
        setInstance,
        vaultSubID,
        setIdentityInput,
        setAddressInput,
        identityInput,
        addressInput,
        borrowAmount,
        setBorrowAmount,
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
