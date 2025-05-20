'use client';

import Icon from '@/components/Icon';
import ImageCarousel from '@/components/Carousel/ImageCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { useState } from 'react';
import { PrimaryDropdown, PrimaryDropdownProps } from '@/components/Dropdown';
import DateFormatter from '@/util/Dateformatter';
import useSnackBarStore from '@/store/useSnackBarStore';
import { useModal } from '@/context/ModalContext';
import { useRouter } from 'next/navigation';

export type PostType = {
    userName: string;
    content: string;
    isliked: boolean;
    postId: number;
    stocktype: string;
    postImages: string[];
    likes: number;
    createdAt: string;
    title: string;
};

const Post = ({ userName, content, isliked, postId, stocktype, postImages, likes, createdAt, title }: PostType) => {
    const OPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'center',
        // draggable: true,
        containScroll: 'trimSnaps',
    };

    const { showSnackBar } = useSnackBarStore();
    const { confirm } = useModal();

    const router = useRouter();
    const movetoDetail = (stocktype: string, postId: number) => {
        if (isDropdownOpen) {
            setIsdropdownOpen(false);
            return;
        } else {
            router.push(
                `/posts/${stocktype}/${postId}?userName=${userName}&content=${content}&isliked=${isliked}&postId=${postId}&stocktype=${stocktype}&postImages=${postImages}&createdAt=${createdAt}&title=${title}&likes=${likes}`,
            );
        }
    };

    const [isDropdownOpen, setIsdropdownOpen] = useState(false);

    //좋아요
    const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('좋아요!');
    };

    const handleOpendropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsdropdownOpen(true);
    };

    //게시글 삭제할건지 묻는 모달
    const openpostDeletemodal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const result = confirm(
            <span>
                삭제된 내용은 복구되지 않아요.
                <br />
                정말 삭제하실건가요?
            </span>,
        );
        result.then(confirmed => {
            if (confirmed) {
                handledeletePost();
            }
        });
        setIsdropdownOpen(prev => !prev);
    };

    //게시글 삭제 api 연동
    const handledeletePost = () => {
        showSnackBar('게시글이 삭제되었습니다.', 'action', 'bottom', '');
    };

    const closeDropdown = () => {
        setIsdropdownOpen(false);
    };

    const onEditPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push(
            `/editpost/${stocktype}?userName=${userName}&content=${content}&isliked=${isliked}&postId=${postId}&stocktype=${stocktype}&postImages=${postImages}&createdAt=${createdAt}&title=${title}&likes=${likes}`,
        );
    };

    const handleCopyClipBoard = () => {};

    const dropdownMenus: PrimaryDropdownProps['dropdownMenus'] = [
        {
            icon: '/icon/icon-scissors.svg',
            text: '게시글 수정',
            onClick: onEditPost,
        },
        {
            icon: '/icon/icon-trashcan.svg',
            text: '게시글 삭제',
            onClick: openpostDeletemodal,
        },
    ];

    return (
        <>
            <div
                className={`relative border border-solid border-(--moneed-gray-5) rounded-[1.8rem] mb-[1.6rem] ${
                    isDropdownOpen ? 'pointer-events-none' : ''
                }`}
            >
                <button
                    type='button'
                    onClick={() => movetoDetail(stocktype, postId)}
                    className='absolute inset-0'
                ></button>
                <div className='pl-[1.8rem] pb-[1.3rem] pr-[1.2rem] pt-[1.4rem]'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-[.6rem] flex-1'>
                            <div className='rounded-full overflow-hidden aspect-square w-[3.2rem]'>
                                <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                            </div>
                            <span className='text-[1.4rem] font-normal leading-[140%] text-(--moneed-black)'>
                                {userName}
                            </span>
                            <i className='w-[.2rem] h-[.2rem] rounded-full bg-(--moneed-gray-5)'></i>
                            <DateFormatter createdAt={createdAt} />
                        </div>
                        <div className='relative ml-auto shrink-0 z-2'>
                            <button
                                className='cursor-pointer rounded-full overflow-hidden aspect-square w-[2.4rem]'
                                onClick={handleOpendropdown}
                            >
                                <img src='/icon/icon-more.svg' alt='' className='w-full h-full object-cover' />
                            </button>
                            {isDropdownOpen && (
                                <PrimaryDropdown dropdownMenus={dropdownMenus} closeDropdown={closeDropdown} />
                            )}
                        </div>
                    </div>
                    <p className='mt-[1.2rem] text-[1.6rem] font-bold leading-[135%] text-(--moneed-black) line-clamp-1'>
                        {title}
                    </p>
                    <p className='mt-[.4rem] mb-[.8rem] text-[1.6rem] font-normal leading-[145%] text-(--moneed-gray-9) line-clamp-3'>
                        {content}
                    </p>
                    {postImages.length > 0 && (
                        <div>
                            <ImageCarousel slides={postImages} options={OPTIONS} />
                        </div>
                    )}
                </div>
                <div className='flex pl-[1.6rem] pb-[1.6rem] pr-[1.2rem] pt-[.4rem]'>
                    <div className='relative z-2'>
                        {isliked ? (
                            <button type='button' onClick={toggleLike}>
                                <Icon iconUrl='/heartIcon.svg' width={18} height={18}></Icon>
                            </button>
                        ) : (
                            <button type='button' onClick={toggleLike}>
                                <Icon iconUrl='/redHeartIcon.svg' width={18} height={18}></Icon>
                            </button>
                        )}
                    </div>
                    <span className='relative z-2 mr-4 text-[1.4rem] font-normal leading-[140%] text-(--moneed-gray-8)'>
                        6
                    </span>
                    <div className=' relative z-2'>
                        <Icon iconUrl='/commentIcon.svg' width={20} height={20} />
                    </div>
                    <span className='relative z-2 mr-4 text-[1.4rem] font-normal leading-[140%] text-(--moneed-gray-8)'>
                        8{' '}
                    </span>
                    <div className=' relative z-2'>
                        <Icon onClick={() => handleCopyClipBoard()} iconUrl='/sharingIcon.svg' width={20} height={20} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
