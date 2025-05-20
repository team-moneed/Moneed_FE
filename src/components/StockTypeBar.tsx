'use client';

import Chip from '@/components/Chip';
import { StockType } from '@/types/stock';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Icon from './Icon';

const StockTypeBar = () => {
    //선택한 카테고리만 보이게
    const { stocktype } = useParams<{ stocktype?: string }>();
    const selectedStockType = stocktype === undefined ? '전체' : decodeURIComponent(stocktype);
    const { data: stockTypes } = useQuery<StockType[]>({
        queryKey: ['stockTypes'],
        queryFn: () => fetch('/api/stocktypes').then(res => res.json()),
    });

    const router = useRouter();
    const movetoSelectStockType = () => {
        router.push('/selectStockType');
    };

    const movetoStockType = (stocktype: string) => {
        router.push(`/community/${stocktype}`);
    };

    const movetoAllStockType = () => {
        router.push('/community');
    };

    return (
        <div className='relative'>
            <div className='flex gap-4 mb-6 overflow-x-auto whitespace-nowrap items-center'>
                <button onClick={movetoSelectStockType} className='shrink-0'>
                    <Icon iconUrl='/icon/icon-addcircle.svg' width={30} height={30} />
                </button>
                <Chip
                    label='전체'
                    active={selectedStockType === '전체'}
                    className='py-[12px] px-[24px]'
                    onClick={movetoAllStockType}
                />
                {stockTypes?.map(({ stocktype, StockTypeId }) => (
                    <Chip
                        key={StockTypeId}
                        label={stocktype}
                        active={selectedStockType === stocktype}
                        className='py-[12px] px-[24px]'
                        onClick={() => movetoStockType(stocktype)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StockTypeBar;
