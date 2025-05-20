'use client';

import CompanyInfoBox from '@/components/Community/CompanyInfoBox';
import StockInfoBox from '@/components/Community/StockInfoBox';
import Posts from '@/components/Community/Posts';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { type Post } from '@/types/post';

export default function CommunityPage({ params }: { params: Promise<{ stocktype: string }> }) {
    const { stocktype } = use(params);
    const { data: posts } = useQuery<Post[]>({
        queryKey: ['posts', stocktype],
        queryFn: () => fetch(`/api/posts?stocktype=${stocktype}`).then(res => res.json()),
    });

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem] mb-[.6rem]'>
                <CompanyInfoBox />
                <StockInfoBox />
            </div>
            <div className='mt-[2.8rem]'>
                <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                    <h2 className='text-[2.2rem] leading-[145%] font-bold text-(--moneed-black) lg:text-[2.4rem] lg:leading-[140%]'>
                        투표
                    </h2>
                    <span className='text-(--moneed-gray-7) text-[1.2rem] font-normal leading-[135%]'>
                        12월 17일 8시 기준
                    </span>
                </div>
            </div>
            <div className='bg-(--moneed-navy) h-48 rounded-[.8rem] text-center  pt-16'>
                <span className='text-[2rem] leading-[145%] font-bold text-(--moneed-white)'>comming soon</span>
            </div>
            <div className='mt-[2.8rem]'>
                <div className='flex items-baseline gap-[.8rem] mb-4'>
                    <h2 className='text-[2.2rem] leading-[145%] font-bold text-(--moneed-black) lg:text-[2.4rem] lg:leading-[140%]'>
                        게시글
                    </h2>
                </div>
            </div>
            {posts && <Posts posts={posts} />}
        </div>
    );
}
