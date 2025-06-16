import { getSelectedStock } from '@/api/stock.api';
import { SelectedStock } from '@/types/stock';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type UseSelectedStockParams<TData = SelectedStock[]> = Omit<
    UseQueryOptions<SelectedStock[], Error, TData>,
    'queryKey' | 'queryFn'
>;

export const useSelectedStock = <TData = SelectedStock[]>(args: UseSelectedStockParams<TData> = {}) => {
    return useQuery<SelectedStock[], Error, TData>({
        queryKey: ['selectedStock'],
        queryFn: () => getSelectedStock(),
        ...args,
    });
};
