import type { Location } from '@prisma/client';
import type { AxiosError } from 'axios';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const endpoint = '/api/locations/';

const useLocation = (id: string) => {
  const { data, error, isValidating } = useSWR<Location, AxiosError>(
    endpoint + id,
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
  };
};

export default useLocation;
