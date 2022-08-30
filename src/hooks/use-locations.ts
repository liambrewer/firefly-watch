import type { Location } from '@prisma/client';
import type { AxiosError } from 'axios';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const endpoint = '/api/locations';

const useLocations = () => {
  const { data, error, isValidating, mutate } = useSWR<Location[], AxiosError>(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    isValidating: isValidating,
    mutate: mutate,
  };
};

export default useLocations;
