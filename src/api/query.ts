import axios, { AxiosResponse } from "axios";
import { LoanInfoParams } from "../types";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "testing",
};

export const fetchTotalDebts = async (): Promise<
  AxiosResponse<{ totalDebts: number }>
> => {
  const response = await axios.get("http://localhost:8080/api/rest/debts", {
    headers,
  });
  console.log(response, "ook");

  return response.data.BorrowerLog_aggregate.aggregate.sum.loanAmount;
};
export const fetchTotalPayback = async (): Promise<
  AxiosResponse<{ totalDebts: number }>
> => {
  const response = await axios.get("http://localhost:8080/api/rest/paybacks", {
    headers,
  });
  console.log(response, "ook");

  return response.data.ReturnLoanDetails_aggregate.aggregate.sum.returnedAmount;
};

export const fetchTotalLockedAssets = async (): Promise<
  AxiosResponse<{ totalLockedAssets: number }>
> => {
  const response = await axios.get(
    "http://localhost:8080/api/rest/locked-assets/total",
    { headers }
  );
  return response.data.Vault_aggregate.aggregate.sum.collateralLocked;
};

export const fetchSingleVault = async (
  id: string
): Promise<AxiosResponse<any>> => {
  const response = await axios.post(
    "http://localhost:8080/api/rest/vault",
    { address: id },
    { headers }
  );
  return response.data.Vault[0];
};

export const fetchBorrowDetails = async (
  id: string
): Promise<AxiosResponse<any>> => {
  const response = await axios.post(
    "http://localhost:8080/api/rest/loan",
    { address: id },
    { headers }
  );
  return response.data.BorrowerLog[0];
};

export const fetchAllVaults = async (): Promise<AxiosResponse<any[]>> => {
  const response = await axios.get("http://localhost:8080/api/rest/vaults", {
    headers,
  });
  return response.data;
};

export const fetchTotalVaults = async (): Promise<
  AxiosResponse<{ totalVaults: number }>
> => {
  const response = await axios.get(
    "http://localhost:8080/api/rest/vaults/total",
    { headers }
  );
  return response.data.Vault_aggregate.aggregate.count;
};

export const getEthereumPrice = async (): Promise<AxiosResponse<number>> => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  return response.data.ethereum.usd;
};

export const getLoanInfo = async ({
  instance,
  addressInput,
}: LoanInfoParams): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_loan_info(addressInput).get();

      console.log(result, "urrur");
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  }
};

export const getTotalDebts = async ({ instance }: any): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_total_debts().get();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  } else {
    throw new Error("Instance is not provided");
  }
};

export const getPoolInterest = async ({ instance }: any): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_pool_interest().get();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  } else {
    throw new Error("Instance is not provided");
  }
};

export const getLockedCollateral = async ({ instance }: any): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_total_collateral().get();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  } else {
    throw new Error("Instance is not provided");
  }
};

export const getTotalBorrowers = async ({ instance }: any): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_total_borrowers().get();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  } else {
    throw new Error("Instance is not provided");
  }
};

export const getSafteyPoolBalanace = async ({
  instance,
}: any): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_total_assets().get();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  } else {
    throw new Error("Instance is not provided");
  }
};

export const getTotalSharesHolder = async ({
  instance,
}: any): Promise<any> => {
  if (instance) {
    try {
      const result = await instance.functions.get_total_shareholders().get();
      return result.value;
    } catch (error: any) {
      throw new Error(`Error calling loan info: ${error.message}`);
    }
  } else {
    throw new Error("Instance is not provided");
  }
};
