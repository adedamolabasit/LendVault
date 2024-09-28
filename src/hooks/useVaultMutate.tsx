import { useMutation } from "@tanstack/react-query";
import { BorrowAndMintParams, DepositAndMintResult, RepayAndBurnParams, BorrowAssetsParams, RepayLoanParams, LoanInfoParams} from "../types";
import { depositToSafteyPool, repayLoan, getInvestment, BorrowAndLock, getLoanInfo } from "../api/mutate";

export const useDepositToPool = () => {
  return useMutation<
    DepositAndMintResult,
    Error,
    BorrowAndMintParams, 
    () => void 
  >({
    mutationFn: (params: BorrowAndMintParams) => depositToSafteyPool({ ...params }),
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

export const useRepayLoan = () => {
  return useMutation<
    DepositAndMintResult,
    Error,
    RepayLoanParams, 
    () => void 
  >({
    mutationFn: (params: RepayLoanParams ) => repayLoan({ ...params }),
  });
};

export const useGetInvestment = () => {
  return useMutation<
    DepositAndMintResult,
    Error,
    RepayAndBurnParams, 
    () => void 
  >({
    mutationFn: (params: RepayAndBurnParams ) => getInvestment({ ...params }),
  });
};

export const useGetLoanInfo = () => {
  return useMutation<
    any,
    Error,
    LoanInfoParams, 
    () => void 
  >({
    mutationFn: (params: LoanInfoParams ) => getLoanInfo({ ...params }),
  });
};
