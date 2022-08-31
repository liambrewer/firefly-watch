import type { Observation } from '@prisma/client';
import type { AxiosError } from 'axios';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const endpoint = '/api/observations';

const useObservations = () => {
  const { data, error, isValidating, mutate } = useSWR<
    Observation[],
    AxiosError
  >(endpoint, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    isValidating: isValidating,
    mutate: mutate,
  };
};

export default useObservations;
