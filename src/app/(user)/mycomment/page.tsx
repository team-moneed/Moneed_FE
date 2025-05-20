'use client';

import { useState } from 'react';
import Comment from '@/components/Community/Comment';

const MyComment = () => {
    const [activeTab, setActiveTab] = useState('thisWeek');

    const comments = [
        {
            commentId: 1,
            content: '좋은 정보 감사합니다!',
            parentId: null,
            userName: '사용자2',
            createdAt: '2024-12-10T10:15:00Z',
        },
        {
            commentId: 3,
            content: '대댓글까지 만들 수 있다니 대단해요.',
            parentId: null,
            userName: '사용자4',
            createdAt: '2024-12-10T10:25:00Z',
        },
    ];

    const thisweekComments = comments.filter(comment => comment.commentId === 1);

    return (
        <>
            <div className='px-8 max-w-512 mx-auto'>
                <div className='flex my-[1.8rem]'>
                    <div className='text-[1.8rem] font-semibold leading-[140%]'>댓글</div>
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
                {activeTab === 'thisWeek' ? (
                    <div className='pt-[1.8rem]'>
                        {thisweekComments.map(comment => (
                            <div key={comment.commentId} className='pt-[1.8rem]'>
                                <Comment
                                    {...comment}
                                    onEditComment={() => {
                                        console.log('아직안됐어요ㅠㅠ');
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='pt-[1.8rem]'>
                        {comments.map(comment => (
                            <div key={comment.commentId} className='pt-[1.8rem]'>
                                <Comment
                                    {...comment}
                                    onEditComment={() => {
                                        console.log('아직안됐어요ㅠㅠ');
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyComment;
