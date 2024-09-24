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
    borrowAmount: number,
  
  }

  export interface RepayLoanParams {
    addressInput: any,
    instance: LendVault | undefined,
    repayAmount: number,
  }