import { useQuery } from '@tanstack/react-query';
import { getStocks } from '@/api/stock.api';

export const useStocks = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['stocks'],
        queryFn: () => getStocks(),
    });

    return { data, isLoading, error };
};
