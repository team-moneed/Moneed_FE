'use client';
import MyStockBox from '@/components/Mypage/MyStockBox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { type Stock } from '@/types/stock';
import Hangul from 'hangul-js';

export default function SearchStockType() {
    const router = useRouter();
    const [searchStockType, setsearchStockType] = useState('');
    const { data: stockData } = useQuery<Stock[]>({
        queryKey: ['stockData'],
        queryFn: () => fetch('/api/stocks').then(res => res.json()),
    });

    const selectStocktype = (stocktype: string) => {
        router.push(`/writepost?stocktype=${stocktype}`);
    };

    const getInitialConsonant = (str: string) => {
        return Hangul.d(str)
            .map((char: string) => char.charAt(0))
            .join('');
    };

    const filteredStockData = stockData?.filter(item => {
        if (!searchStockType) {
            return true;
        }

        // console.log(Hangul.disassemble(item.name).includes(Hangul.disassemble(searchStockType)))

        return (
            item.name.toLowerCase().includes(searchStockType) ||
            getInitialConsonant(item.name).includes(getInitialConsonant(searchStockType))
        );
    });
    return (
        <>
            <div className='px-[2rem] max-w-[128rem] mx-auto'>
                <div className='relative'>
                    <img
                        src='/icon/icon-search.svg'
                        alt='search icon'
                        className='absolute left-[1rem] top-[50%] transform -translate-y-[50%] w-[1.6rem] h-[1.6rem]'
                    />
                    <input
                        type='text'
                        placeholder='게시판 종목을 검색 해 주세요.'
                        value={searchStockType}
                        onChange={e => setsearchStockType(e.target.value)}
                        className='pl-[3rem] pr-[1rem] py-[.8rem] w-full border border-solid border-[var(--moneed-gray-5)] bg-[var(--moneed-black-3)] rounded-[1.6rem] text-[1.6rem] text-[var(--moneed-gray-7)]'
                    />
                </div>
                <div className='text-[1.6rem] font-[600] leading-[140%] pb-[1rem] pt-[2.2rem]'>
                    나의 선호 종목 [10]개
                </div>
                <div className='px-[2.4rem] py-[.8rem]'>
                    {filteredStockData?.map(item => (
                        <MyStockBox
                            key={item.name}
                            onClick={() => selectStocktype(item.name)}
                            className=''
                            isSelectCategory={true}
                            name={item.name}
                        ></MyStockBox>
                    ))}
                </div>
            </div>
        </>
    );
}
