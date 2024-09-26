import { LendVault } from "./swayContractFile";


export interface DepositAndMintParams {
    identityInput: any;
    instance: LendVault | undefined;
    vaultSubID: string;
    borrowAmount: number;
  }
  

  export interface DepositAndMintResult {
    value: any; 
  }

  
export interface RepayAndBurnParams {
    identityInput: any; 
    vaultSubID: string; 
    underlyingAsset: string; 
    withdrawAmount: number; 
    instance: any; 
  }


  export interface ManagedAssetsParams {
    instance: LendVault | undefined,
    underlyingAsset: string,
    vaultSubId: string
  }

  export interface BorrowAssetsParams {
    addressInput: any,
    instance: LendVault | undefined,
    collateralAmount: number,
    loanAmount: number,
    interestRate: number,
    collateralAtLq: number,
    maturityDate: number
  
  }

  export interface RepayLoanParams {
    addressInput: any,
    instance: LendVault | undefined,
    repayAmount: string,
  }

  export interface LoanInfoParams {
    addressInput: any,
    instance: LendVault | undefined,
  }


  export type BorrowModalType = {
    canProceed: boolean;
    setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: () => void;
    loadAmount: number;
    assetAtLq: number;
    collateralAmount: number;
    interest: string;
    maturityDate: any;
  };

  export type EarnModalType = {
    canProceed: boolean;
    setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: () => void;
    depositAmount: number;
    sharesAmount: number;
  };
  