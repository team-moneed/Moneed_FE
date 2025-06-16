'use client';

import CategoryRankBox from '@/components/Community/CategoryRankBox';
import { useQuery } from '@tanstack/react-query';
import { getHotStock } from '@/api/hotStock.api';

export type stockCagtegory = {
    categoryName: string;
    rate: string;
    stock: {
        image: string;
        company: string;
        englishName: string;
    };
};

const TopCategory = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
    const stockCategories = [
        {
            categoryName: '기계/반도체/IT가전',
            rate: '+0.91%',
            stock: {
                image: 'example_image_url_1',
                company: '마이크로소프트',
                englishName: 'Microsoft',
            },
        },
        {
            categoryName: '헬스케어',
            rate: '+0.35%',
            stock: {
                image: 'example_image_url_2',
                company: '유나이티드헬스크룹',
                englishName: 'UNH',
            },
        },
        {
            categoryName: '헬스케어',
            rate: '+0.35%',
            stock: {
                image: 'example_image_url_2',
                company: '유나이티드헬스크룹',
                englishName: 'UNH',
            },
        },
    ];

    const { data } = useQuery({
        queryKey: ['hotStock'],
        queryFn: () => getHotStock({ market: 'NAS' }),
    });

    console.log(data);

    return (
        <>
            <div ref={ref} className='mt-[2.8rem]'>
                <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                    <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                        지금 뜨는 종목
                    </h2>
                    <span className='text-moneed-gray-7 text-[1.2rem] font-normal leading-[135%]'>
                        12월 17일 8시 기준 | 전일종가
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[1.2rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
                {stockCategories.map((categoryData, index) => {
                    return <CategoryRankBox categoryData={categoryData} index={index} key={index}></CategoryRankBox>;
                })}
            </div>
        </>
    );
};

export default TopCategory;
