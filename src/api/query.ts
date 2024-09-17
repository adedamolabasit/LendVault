import axios, { AxiosResponse } from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': 'testing',
};

export const fetchTotalDebts = async (): Promise<AxiosResponse<{ totalDebts: number }>> => {
  const response = await axios.get('http://localhost:8080/api/rest/debts/total', { headers });
  return response.data.Vault_aggregate.aggregate.sum.tokenMinted
  ;
};

export const fetchTotalLockedAssets = async (): Promise<AxiosResponse<{ totalLockedAssets: number }>> => {
  const response = await axios.get('http://localhost:8080/api/rest/locked-assets/total', { headers });
  return response.data.Vault_aggregate.aggregate.sum.collateralLocked
  ;
};

export const fetchSingleVault = async (id: string): Promise<AxiosResponse<any>> => {
  const response = await axios.post('http://localhost:8080/api/rest/vault', { address: id }, { headers });
  return response.data.Vault[0];
};


export const fetchAllVaults = async (): Promise<AxiosResponse<any[]>> => {
  const response = await axios.get('http://localhost:8080/api/rest/vaults', { headers });
  return response.data;
};

export const fetchTotalVaults = async (): Promise<AxiosResponse<{ totalVaults: number }>> => {
  const response = await axios.get('http://localhost:8080/api/rest/vaults/total', { headers });
  return response.data.Vault_aggregate.aggregate.count
};
