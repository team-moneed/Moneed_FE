'use client';

import PostCarousel from '@/components/Carousel/PostCarousel';
import useMoveScroll from '@/hooks/useMoveScroll';
import Posts from '@/components/Community/Posts';
import TopCategory from '@/components/Community/TopCategory';
import { type Post } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

const topPosts = [
    {
        postId: 1,
        title: '1',
        content:
            '1 테슬라 주식 언제 사테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사 테슬라 주식 언제 사  ',
        userName: '사용자1',
        createdAt: '2024-12-10T10:00:00Z',
        stocktype: '테슬라',
    },
    {
        postId: 2,
        title: '2',
        content:
            '2 주식으로 돈벌래돈벌꺼야!!테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사언제사야이득이야? 알려줘알려줘알려주라고!!',
        userName: '사용자5',
        createdAt: '2024-12-09T09:00:00Z',
        stocktype: '애플',
    },
    {
        postId: 3,
        title: '3',
        content: '3 카카오게시글! 카카오카카ㅗ오오',
        userName: '사용자6',
        createdAt: '2024-12-09T09:00:00Z',
        stocktype: '카카오',
    },
    {
        postId: 4,
        title: '4',
        content: '4 카카오게시글! 카카오카카ㅗ오오',
        userName: '사용자6',
        createdAt: '2024-12-09T09:00:00Z',
        stocktype: '카카오',
    },
];

const HotPosts = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
    return (
        <div ref={ref} className='mt-[2.8rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-(--moneed-black) lg:text-[2.4rem] lg:leading-[140%]'>
                    인기 급상승 게시글
                </h2>
            </div>
        </div>
    );
};

const Vote = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
    return (
        <>
            <div ref={ref} className='mt-[2.8rem]'>
                <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                    <h2 className='text-[2.2rem] leading-[145%] font-bold text-(--moneed-black) lg:text-[2.4rem] lg:leading-[140%]'>
                        지금 핫한 투표
                    </h2>
                    <span className='text-(--moneed-gray-7) text-[1.2rem] font-normal leading-[135%]'>
                        12월 17일 8시 기준
                    </span>
                </div>
            </div>
            <div className='bg-(--moneed-navy) h-48 rounded-[.8rem] text-center  pt-16'>
                <span className='text-[2rem] leading-[145%] font-bold text-(--moneed-white)'>comming soon</span>
            </div>
        </>
    );
};

const Top5 = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
    return (
        <div ref={ref} className='mt-[3.6rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.6rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-(--moneed-black) lg:text-[2.4rem] lg:leading-[140%]'>
                    Top 5
                </h2>
                <span className='text-(--moneed-gray-7) text-[1.2rem] font-normal leading-[135%]'>12월 기준</span>
            </div>
        </div>
    );
};

const Category = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
    return (
        <div ref={ref} className='mt-[2.8rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-(--moneed-black) lg:text-[2.4rem] lg:leading-[140%]'>
                    지금 뜨는 종목
                </h2>
                <span className='text-(--moneed-gray-7) text-[1.2rem] font-normal leading-[135%]'>
                    12월 17일 8시 기준 | 전일종가
                </span>
            </div>
        </div>
    );
};
export default function CommunityPage() {
    const { data: posts } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: () => fetch('/api/posts').then(res => res.json()),
    });

    const top5Ref = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const hotPostsRef = useRef<HTMLDivElement>(null);
    const voteRef = useRef<HTMLDivElement>(null);

    const { onMoveToElement: moveToTop5 } = useMoveScroll(top5Ref);
    const { onMoveToElement: moveToCategory } = useMoveScroll(categoryRef);
    const { onMoveToElement: moveToHotPosts } = useMoveScroll(hotPostsRef);
    const { onMoveToElement: moveToVote } = useMoveScroll(voteRef);

    const POSTOPTIONS = {
        slidesToScroll: 1,
        loop: false,
        // align: 'start',
        draggable: true,
        // containScroll: "keepSnaps",
    };

    return (
        <div>
            <div className='flex gap-4 pt-8 items-start'>
                <button
                    onClick={moveToTop5}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7) mr-[1.2rem]'
                >
                    Top 5
                </button>
                <button
                    onClick={moveToCategory}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7) mr-[1.2rem]'
                >
                    지금 뜨는 종목
                </button>
                <button
                    onClick={moveToVote}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7) mr-[1.2rem]'
                >
                    지금 핫한 투표
                </button>
                <button
                    onClick={moveToHotPosts}
                    className='text-[1.4rem] leading-[140%] font-normal text-(--moneed-gray-7)'
                >
                    인기 급상승 게시글
                </button>
            </div>
            <Top5 ref={top5Ref} />
            <PostCarousel slides={topPosts} options={POSTOPTIONS} />
            <Category ref={categoryRef} />
            <TopCategory />
            <Vote ref={voteRef} />
            <HotPosts ref={hotPostsRef} />
            {posts && <Posts posts={posts} />}
        </div>
    );
}
