import axios, { AxiosResponse } from 'axios';

export const fetchTotalDebts = async (): Promise<AxiosResponse<{ totalDebts: number }>> => {
  const response = await axios.get('http://localhost:8080/api/rest/debts/total');
  return response;
};

export const fetchTotalLockedAssets = async (): Promise<AxiosResponse<{ totalLockedAssets: number }>> => {
  const response = await axios.get('http://localhost:8080/api/rest/locked-assets/total');
  return response;
};

export const fetchSingleVault = async (id: string): Promise<AxiosResponse<any>> => {
  const response = await axios.post('http://localhost:8080/api/rest/vault', { id });
  return response;
};

export const fetchAllVaults = async (): Promise<AxiosResponse<any[]>> => {
  const response = await axios.get('http://localhost:8080/api/rest/vaults');
  return response;
};

export const fetchTotalVaults = async (): Promise<AxiosResponse<{ totalVaults: number }>> => {
  const response = await axios.get('http://localhost:8080/api/rest/vaults/total');
  return response;
};
