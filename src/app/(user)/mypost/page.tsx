'use client';

import { useState } from 'react';
import Posts from '@/components/Community/Posts';

const MyPost = () => {
    const [activeTab, setActiveTab] = useState('thisWeek');

    const allPosts = [
        {
            postId: 1,
            title: '1',
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333',
            ],
            content:
                '주식으로 돈벌래돈벌꺼야!!테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사언제사야이득이야? 알려줘알려줘알려주라고!! ',
            userName: '사용자1',
            createdAt: '2024-12-10T10:00:00Z',
            likes: 10,
            stocktype: '테슬라',
            category: '금융',
            isliked: true,
            comments: [
                {
                    commentId: 1,
                    content: '좋은 정보 감사합니다!',
                    parentId: null,
                    userName: '사용자2',
                    createdAt: '2024-12-10T10:15:00Z',
                    replies: [
                        {
                            commentId: 2,
                            content: '저도 동의합니다!',
                            parentId: 1,
                            userName: '사용자3',
                            createdAt: '2024-12-10T10:20:00Z',
                            replies: [],
                        },
                    ],
                },
                {
                    commentId: 3,
                    content: '대댓글까지 만들 수 있다니 대단해요.',
                    parentId: null,
                    userName: '사용자4',
                    createdAt: '2024-12-10T10:25:00Z',
                    replies: [],
                },
            ],
        },
        {
            postId: 2,
            title: '2',
            postImages: [],
            content: '2',
            userName: '사용자5',
            createdAt: '2024-12-09T09:00:00Z',
            likes: 7,
            stocktype: '애플',
            category: '정보기술',
            isliked: false,
            comments: [],
        },
        {
            postId: 3,
            title: '3',
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333',
            ],
            content: '3 테슬라 언제 오르지?',
            userName: '사용자6',
            createdAt: '2024-12-09T09:00:00Z',
            likes: 7,
            stocktype: '테슬라',
            category: '금융',
            isliked: false,
            comments: [],
        },
        {
            postId: 4,
            title: '4',
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333',
            ],
            content: '4 테슬라 언제 오르지?',
            userName: '사용자5',
            createdAt: '2024-12-09T09:00:00Z',
            likes: 7,
            stocktype: '테슬라',
            category: '금융',
            isliked: false,
            comments: [],
        },
    ];

    const thisweekPosts = allPosts.filter(post => post.postId === 4);

    return (
        <>
            <div className='px-8 max-w-512 mx-auto'>
                <div className='flex my-[1.8rem]'>
                    <div className='text-[1.8rem] font-semibold leading-[140%]'>게시글</div>
                    <div className='ml-[.4rem] text-[1.8rem] font-semibold leading-[140%]'>7</div>
                </div>
                <div className='border-b-2 border-solid border-(--moneed-gray-5)'>
                    <button
                        onClick={() => setActiveTab('thisWeek')}
                        className={`${
                            activeTab === 'thisWeek'
                                ? 'text-(--moneed-black) border-b-4 border-solid border-(--moneed-black)'
                                : 'text-(--moneed-gray-7)'
                        } pr-[1.2rem] text-[1.6rem] font-semibold leading-[140%]`}
                    >
                        이번주 게시글
                    </button>
                    <button
                        onClick={() => setActiveTab('notthisWeek')}
                        className={`${
                            activeTab === 'notthisWeek'
                                ? 'text-(--moneed-black) border-b-4 border-solid border-(--moneed-black)'
                                : 'text-(--moneed-gray-7)'
                        } pr-[1.2rem] text-[1.6rem] font-semibold leading-[140%]`}
                    >
                        이전 게시글
                    </button>
                </div>
                {activeTab == 'thisWeek' ? <Posts posts={thisweekPosts} /> : <Posts posts={allPosts} />}
            </div>
        </>
    );
};

export default MyPost;
