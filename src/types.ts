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