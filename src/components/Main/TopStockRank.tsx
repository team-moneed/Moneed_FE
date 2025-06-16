'use client';

import { useRouter } from 'next/navigation';
import Chip from '@/components/Chip';
import Button from '@/components/Button';
import { useState } from 'react';
import MainThumbnailCard from '@/components/Main/MainThumbnailCard';
import { Post } from '@/types/post';
import { useQuery } from '@tanstack/react-query';

const TopStockRank = () => {
    const StockRank = ['테슬라', '애플', '카카오'];

    const { data: allPosts } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: () => fetch('/api/posts').then(res => res.json()),
    });

    const [selectedStockRank, setSelectedStockRank] = useState(StockRank[0]);

    const router = useRouter();
    const movecommunity = (stockname: string) => {
        router.push(`/community/${stockname}`);
    };

    const filteredPosts = allPosts?.filter(post => post.stocktype === selectedStockRank);

    return (
        <>
            <div className='flex gap-4'>
                {StockRank.map((stock, index) => {
                    let medalIcon = '🥇';
                    if (index === 1) {
                        medalIcon = '🥈';
                    } else if (index === 2) {
                        medalIcon = '🥉';
                    }

                    return (
                        <Chip
                            key={index}
                            label={medalIcon + stock}
                            onClick={() => setSelectedStockRank(stock)}
                            active={selectedStockRank === stock}
                        />
                    );
                })}
            </div>

            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem]'>
                    {filteredPosts?.map(post => (
                        <MainThumbnailCard
                            key={post.postId}
                            postId={post.postId}
                            userName={post.userName}
                            content={post.content}
                            title={post.title}
                            createdAt={post.createdAt}
                        />
                    ))}
                </div>
                <div className='flex justify-center mt-[1.8rem] lg:justify-start lg:mt-[2.6rem]'>
                    <Button
                        theme='ghost'
                        textcolor='primary'
                        onClick={() => movecommunity(selectedStockRank)}
                        className='flex items-center gap-[.8rem] py-0 lg:pl-0'
                    >
                        <span className='text-[1.4rem] text-moneed-gray-8 font-semibold leading-[135%]'>
                            해당 게시판 더보기
                        </span>
                        <img src='/icon/icon-arrow-right.svg' alt='' />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default TopStockRank;
