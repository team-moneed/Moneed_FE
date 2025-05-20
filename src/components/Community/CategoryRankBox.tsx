'use client';

import { ReactNode } from 'react';
import { stockCagtegory } from './TopCategory';

type StockInfoProps = {
    categoryData: stockCagtegory;
    children?: ReactNode;
    className?: string;
    index: number;
};

const CategoryRankBox = ({ categoryData, index }: StockInfoProps) => {
    return (
        <>
            <div className='relative bg-(--moneed-black-3) border-(--moneed-gray-5) border-[.1rem] rounded-[1.6rem]'>
                <i className='absolute block aspect-square w-24 top-[-.1rem] left-[-.1rem]'>
                    <img src='/box-bg.png' alt='' className='w-full' />
                </i>
                <div className='relative flex items-end gap-[.4rem] h-16 mb-[.4rem]'>
                    <div className='flex rounded-[1.6rem] w-16 h-16 shrink-0 justify-center items-center bg-(--moneed-black)'>
                        <div className='font-bold leading-[140%] text-[1.4rem] text-(--moneed-white)'>
                            {index + 1}위
                        </div>
                    </div>
                    <div className='px-[2.8rem] flex justify-between flex-1'>
                        <div className='font-semibold leading-[140%] text-[1.6rem] text-(--moneed-black)'>
                            {categoryData.categoryName}
                        </div>
                        <div className='font-bold leading-[140%] text-[1.6rem] text-(--moneed-green) tracking-[0.02rem]'>
                            {categoryData.rate}
                        </div>
                    </div>
                </div>
                <div className='relative flex my-[1.2rem] mx-[1.4rem] p-4 rounded-[1.2rem] border border-solid border-(--moneed-gray-5) gap-[.6rem] bg-(--moneed-white) items-center justify-center'>
                    <div className='rounded-full overflow-hidden aspect-square w-[1.6rem]'>
                        <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                    </div>
                    <span className='font-normal leading-[140%] text-[1.4rem] text-(--moneed-black)'>
                        {categoryData.stock.company}
                    </span>
                    <span className='py-[.3rem] px-[.8rem] font-normal leading-[140%] text-[1rem] text-(--moneed-gray-8) tracking-[0.02rem] rounded-[.6rem] border border-solid border-(--moneed-gray-8)'>
                        {categoryData.stock.englishName}
                    </span>
                </div>
            </div>
        </>
    );
};

export default CategoryRankBox;
