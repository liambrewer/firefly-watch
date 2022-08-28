import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

export const endpoint = '/api/locations';

const useLocations = () => {
  const { data, error } = useSWR(endpoint, fetcher);

  return {
    locations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useLocations;
