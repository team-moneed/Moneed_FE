'use client';

import { getStocks } from '@/api/stock.api';
import Button from '@/components/Button';
import StockTypeChip from '@/components/create/StockTypeChip';
import { selectStock as selectStockApi } from '@/api/stock.api';
import { Stock } from '@/generated/prisma';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelectedStock } from '@/hooks/useSelectedStock';

function SelectStockTypeContent() {
    const router = useRouter();
    const { data: stocks } = useQuery<Stock[]>({
        queryKey: ['stocks'],
        queryFn: () => getStocks(),
    });
    const searchParams = useSearchParams();

    const { data: mySelectedStockIds } = useSelectedStock<number[]>({
        select: data => data.map(stock => stock.stockId),
    });

    const { mutate: selectStock } = useMutation({
        mutationFn: (stockIds: number[]) => selectStockApi(stockIds),
    });
    const [stockIds, setStockIds] = useState<number[]>([]);
    const selectedStock = [...stockIds, ...(mySelectedStockIds ?? [])];

    const toggleStock = (stockId: number) => {
        if (selectedStock.includes(stockId)) {
            setStockIds(stockIds.filter(stock => stock !== stockId));
        } else {
            setStockIds([...stockIds, stockId]);
        }
    };

    const handleSubmit = async () => {
        selectStock(selectedStock);
        const url = searchParams.get('url') ?? '/';
        router.push(decodeURIComponent(url));
    };

    return (
        <form action={handleSubmit}>
            <div className='flex flex-wrap gap-[.8rem] md:px-[10.6rem] md:max-h-[calc(38.5rem-10rem)] md:overflow-y-auto'>
                {stocks?.map(({ id, name }) => (
                    <div key={id} className='mb-[.2rem]'>
                        <StockTypeChip
                            label={name}
                            icon='/temp/sample3.png'
                            onClick={() => toggleStock(id)}
                            active={selectedStock.includes(id)}
                        />
                    </div>
                ))}
            </div>
            <div className='bottom-0 fixed left-0 right-0 p-8 z-100 bg-white md:static md:max-w-140 md:mx-auto md:pb-0'>
                <Button
                    disabled={selectedStock.length === 0}
                    type='submit'
                    theme='primary'
                    textcolor='primary'
                    className='w-full text-[1.6rem] font-bold leading-[140%] rounded-[1.6rem] px-[1.6rem] py-[1.8rem]'
                >
                    {selectedStock.length}개 선택
                </Button>
            </div>
        </form>
    );
}

export default function SelectStockType() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SelectStockTypeContent />
        </Suspense>
    );
}
