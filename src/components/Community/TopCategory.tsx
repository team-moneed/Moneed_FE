'use client';

import CategoryRankBox from '@/components/Community/CategoryRankBox';

export type stockCagtegory = {
    categoryName: string;
    rate: string;
    stock: {
        image: string;
        company: string;
        englishName: string;
    };
};

const TopCategory = () => {
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

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[1.2rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
                {stockCategories.map((categoryData, index) => {
                    return <CategoryRankBox categoryData={categoryData} index={index} key={index}></CategoryRankBox>;
                })}
            </div>
        </>
    );
};

export default TopCategory;
