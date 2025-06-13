import { fetchShorts } from './shortsApi';

export const shorts = {
    getYoutubeStockshorts: () => ({
        queryKey: ['shorts'],
        queryFn: fetchShorts,
    }),
};
