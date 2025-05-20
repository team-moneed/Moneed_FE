'use client';

import Button from '@/components/Button';
import StockTypeChip from '@/components/create/StockTypeChip';
import useStockTypeStore from '@/store/useStockTypeStore';
import { StockType } from '@/types/stock';
import { useQuery } from '@tanstack/react-query';

export default function SelectStockType() {
    const { selectedStockNames, addStockType, removeStockType } = useStockTypeStore();
    const { data: stockTypes } = useQuery<StockType[]>({
        queryKey: ['stockTypes'],
        queryFn: () => fetch('/api/stocktypes').then(res => res.json()),
    });

    const filteredStockNames = stockTypes?.filter(({ stocktype }) => stocktype !== '전체');

    const toggleStockType = (stocktype: string) => {
        if (selectedStockNames.includes(stocktype)) {
            removeStockType(stocktype);
        } else {
            addStockType(stocktype);
        }
    };

    const handlesubmitCategoory = () => {
        console.log('카테고리 제출', selectedStockNames);
    };

    return (
        <>
            <div className='px-8 max-w-512 mx-auto md:bg-[#EFEFF3] md:pt-16'>
                <div className='lg:hidden block fixed top-0 left-0 w-full h-28 bg-white z-50'></div>
                <div className='md:max-w-[59.2rem] md:rounded-[2.4rem] md:bg-white md:mx-auto md:pt-24 md:pb-16'>
                    <div className='sticky top-24 bg-white md:bg-transparent pb-[3.6rem] md:static'>
                        <h2 className='text-[2.4rem] font-bold leading-[140%] text-(--moneed-black) pt-[6.1rem] md:pt-0 md:text-center'>
                            어떤 종목을 선호하시나요?
                        </h2>
                        <p className='text-[1.4rem] font-normal leading-[140%] text-(--moneed-gray-7) md:text-center'>
                            *선택된 관심 종목 게시판이 보여집니다.
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-[.8rem] md:px-[10.6rem] md:max-h-[calc(38.5rem-10rem)] md:overflow-y-auto pb-48 pt-24'>
                        {filteredStockNames?.map(({ stocktype, StockTypeId }) => (
                            <div key={StockTypeId} className='mb-[.2rem]'>
                                <StockTypeChip
                                    label={stocktype}
                                    icon='/temp/sample3.png'
                                    onClick={() => toggleStockType(stocktype)}
                                    active={selectedStockNames.includes(stocktype)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='bottom-0 fixed left-0 right-0 p-8 z-100 bg-white md:static md:max-w-140 md:mx-auto md:pb-0'>
                        <Button
                            type='submit'
                            theme='primary'
                            textcolor='primary'
                            className='w-full text-[1.6rem] font-bold leading-[140%] rounded-[1.6rem] px-[1.6rem] py-[1.8rem]'
                            onClick={handlesubmitCategoory}
                        >
                            {selectedStockNames.length}개 선택
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
