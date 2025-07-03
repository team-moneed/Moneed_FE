import { http } from '@/api/client';
import { Stock } from '@/generated/prisma';
import { SelectedStock } from '@/types/stock';

export async function getStocks({ count = 30, cursor = 0 }: { count?: number; cursor?: number } = {}) {
    const res = await http.get<Stock[]>('/api/stocks', { params: { count, cursor } });
    return res.data;
}

export async function selectStock(stockIds: number[]) {
    const res = await http.post('/api/stocks/select', { stockIds });
    return res.data;
}

export async function getSelectedStock() {
    const res = await http.get<SelectedStock[]>('/api/stocks/selected');
    return res.data;
}
