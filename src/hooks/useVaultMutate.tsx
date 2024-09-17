import { useMutation } from "@tanstack/react-query";
import { DepositAndMintParams, DepositAndMintResult, RepayAndBurnParams  } from "../types";
import { depositAndMint, repayAndBurn  } from "../api/mutate";

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
