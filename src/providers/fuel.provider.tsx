import { createContext, useContext, useState, ReactNode } from "react";
import { LendVault } from "../swayContractFile";

interface WalletContextType {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
  instance: LendVault | undefined;
  setInstance: React.Dispatch<React.SetStateAction<LendVault | undefined>>;
  setIdentityInput: React.Dispatch<any>;
  setAddressInput: React.Dispatch<any>;
  addressInput: any;
  identityInput: any;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  amount: number | undefined;
  setLoanInfo: React.Dispatch<any>;
  loanInfo: any;
  setEthPrice: React.Dispatch<React.SetStateAction<number | null>>;
  ethPrice: number | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [activeButton, setActiveButton] = useState<string>("vault");
  const [instance, setInstance] = useState<LendVault>();
  const [identityInput, setIdentityInput] = useState<any>();
  const [addressInput, setAddressInput] = useState<any>();
  const [amount, setAmount] = useState<number>(0);
  const [loanInfo, setLoanInfo] = useState<any>();
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  return (
    <WalletContext.Provider
      value={{
        instance,
        setInstance,
        setIdentityInput,
        setAddressInput,
        identityInput,
        addressInput,
        amount,
        setAmount,
        setLoanInfo,
        loanInfo,
        ethPrice,
        setEthPrice,
        setActiveButton,
        activeButton,
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
