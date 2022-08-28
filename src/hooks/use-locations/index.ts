import type { Location } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

export const endpoint = '/api/locations';

const useLocations = () => {
  const { data, error } = useSWR<Location[]>(endpoint, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useLocations;
