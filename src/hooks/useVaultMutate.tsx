import { useMutation } from "@tanstack/react-query";
import { DepositAndMintParams, DepositAndMintResult, RepayAndBurnParams, BorrowAssetsParams  } from "../types";
import { depositAndMint, repayAndBurn , BorrowAndLock } from "../api/mutate";

export const useDepositAndMint = () => {
  return useMutation<
    DepositAndMintResult,
    Error,
    DepositAndMintParams, 
    () => void 
  >({
    mutationFn: (params: DepositAndMintParams) => depositAndMint({ ...params }),
  });
};

export const useBorrowAndMint = () => {
  return useMutation<
    DepositAndMintResult,
    Error,
    BorrowAssetsParams, 
    () => void 
  >({
    mutationFn: (params: BorrowAssetsParams) => BorrowAndLock({ ...params }),
  });
};

export const useRepayAndBurn = () => {
  return useMutation<
    DepositAndMintResult,
    Error,
    RepayAndBurnParams, 
    () => void 
  >({
    mutationFn: (params: RepayAndBurnParams ) => repayAndBurn({ ...params }),
  });
};
