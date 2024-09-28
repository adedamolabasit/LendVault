import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  fetchTotalDebts,
  fetchTotalPayback,
  fetchAllVaults,
  fetchSingleVault,
  fetchTotalLockedAssets,
  fetchTotalVaults,
  fetchBorrowDetails,
  getEthereumPrice,
  getLoanInfo
} from "../api/query";
import { LoanInfoParams } from "../types";



export class useVaultQuery {
  fetchTotalDebts(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["totalDebts"],
      queryFn: fetchTotalDebts,
      enabled: true,
      retry: 3,
    });
  }

  fetchTotalPaybacks(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["totalPaybacks"],
      queryFn: fetchTotalPayback,
      enabled: true,
      retry: 3,
    });
  }

  fetchTotalLockedAssets(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["totalLockedAssets"],
      queryFn: fetchTotalLockedAssets,
      enabled: true,
      retry: 3,
    });
  }

  fetchSingleVault(id: string): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["singleVault", id],
      queryFn: () => fetchSingleVault(id),
      enabled: true,
      retry: 3,
    });
  }

  fetchSingleBorrower(id: string): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["singleVault", id],
      queryFn: () => fetchBorrowDetails(id),
      enabled: true,
      retry: 3,
    });
  }

  fetchAllVaults(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["allVaults"],
      queryFn: fetchAllVaults,
      enabled: true,
      retry: 3,
    });
  }

  fetchTotalVaults(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["totalVaults"],
      queryFn: fetchTotalVaults,
      enabled: true,
      retry: 3,
    });
  }

  fetchTotalBorrowers(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ["totalVaults"],
      queryFn: fetchTotalVaults,
      enabled: true,
      retry: 3,
    });
  }

}


export function useFetchEthereumPrice(): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ["getEthereum"],
    queryFn: getEthereumPrice,
    retry: 3,
    enabled: true,
  });

}

export function useFetchLoanInfo(props: LoanInfoParams): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ["getLoanInfo", props],  
    queryFn: () => getLoanInfo(props), 
    retry: 3,
    enabled: !!props.instance && !!props.addressInput, 
  });
}


