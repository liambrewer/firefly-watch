import type { Location } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

export const endpoint = '/api/locations';

const useLocations = () => {
  const { data, error, isValidating } = useSWR<Location[]>(endpoint, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    isValidating: isValidating,
  };
};

export default useLocations;
