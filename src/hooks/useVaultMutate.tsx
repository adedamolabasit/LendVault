import { useMutation } from "@tanstack/react-query";
import { DepositAndMintParams, DepositAndMintResult } from "../types";
import { depositAndMint } from "../api/mutate";

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
