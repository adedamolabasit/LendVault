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
    identityInput: any; // Address of the receiver
    underlyingAsset: string; // AssetId of the underlying asset
    vaultSubID: string; // SubId of the vault
    withdrawAmount: number; // Amount to withdraw
    instance: any; // LendVault instance
  }


  export interface ManagedAssetsParams {
    instance: LendVault | undefined,
    underlyingAsset: string,
    vaultSubId: string
  }