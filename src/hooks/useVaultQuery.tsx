import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchTotalDebts, fetchAllVaults, fetchSingleVault, fetchTotalLockedAssets, fetchTotalVaults } from '../api/query';

export class VaultQueries {
  fetchTotalDebts(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ['totalDebts'],
      queryFn: fetchTotalDebts,
      enabled: true,
      retry: 3,
    });
  }

  fetchTotalLockedAssets(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ['totalLockedAssets'],
      queryFn: fetchTotalLockedAssets,
      enabled: true,
      retry: 3,
    });
  }

  fetchSingleVault(id: string): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ['singleVault', id],
      queryFn: () => fetchSingleVault(id),
      enabled: true,
      retry: 3,
    });
  }

  fetchAllVaults(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ['allVaults'],
      queryFn: fetchAllVaults,
      enabled: true,
      retry: 3,
    });
  }

  fetchTotalVaults(): UseQueryResult<any, Error> {
    return useQuery({
      queryKey: ['totalVaults'],
      queryFn: fetchTotalVaults,
      enabled: true,
      retry: 3,
    });
  }
}

