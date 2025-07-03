'use client';

import { useState } from 'react';
import { PrimaryDropdown, PrimaryDropdownProps } from '@/components/Dropdown';
import { useModal } from '@/context/ModalContext';
import useSnackbarStore from '@/store/useSnackbarStore';

type CommentType = {
    userName: string;
    content: string;
    createdAt: string;
    onEditComment: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Comment = ({ userName, content, createdAt, onEditComment }: CommentType) => {
    const [isDropdownOpen, setIsdropdownOpen] = useState(false);

    const showSnackbar = useSnackbarStore(state => state.showSnackbar);
    const { confirm } = useModal();

    //댓글 수정/삭제 드롭다운
    const handleOpendropdown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsdropdownOpen(prev => !prev);
    };

    //댓글 삭제할건지 묻는 모달
    const opencommentDeletemodal = (e: React.MouseEvent<HTMLButtonElement>) => {
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
                handledeleteComment(e);
            }
        });
        setIsdropdownOpen(prev => !prev);
    };

    //댓글 삭제 api 연동
    const handledeleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        showSnackbar({
            message: '댓글이 삭제되었습니다.',
            variant: 'action',
            position: 'bottom',
            icon: '',
        });
    };

    const closeDropdown = () => {
        setIsdropdownOpen(false);
    };

    const dropdownMenus: PrimaryDropdownProps['dropdownMenus'] = [
        {
            icon: '/icon/icon-scissors.svg',
            text: '댓글 수정',
            onClick: onEditComment,
        },
        {
            icon: '/icon/icon-trashcan.svg',
            text: '댓글 삭제',
            onClick: opencommentDeletemodal,
        },
    ];

    return (
        <>
            <div className='relative flex items-start gap-[.6rem] w-full'>
                <i className='absolute block w-[.1rem] top-0 bottom-0 left-[1.6rem] bg-moneed-gray-5'></i>
                <div className='relative rounded-full overflow-hidden aspect-square w-[3.2rem] shrink-0'>
                    <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                </div>
                <div className='flex-1'>
                    <span className='text-[1.4rem] font-bold leading-[140%] text-moneed-black'>{userName}</span>
                    <i className='w-[.2rem] h-[.2rem] mx-[.8rem] mb-[.2rem] rounded-full bg-moneed-gray-5 inline-block '></i>
                    <span className='text-[1.4rem] font-normal leading-[142%] text-moneed-gray-7'>{createdAt}</span>
                    <div className='text-[1.4rem] font-normal leading-[140%]'>{content}</div>
                </div>
                <div className='relative'>
                    <div
                        className='relative cursor-pointer rounded-full overflow-hidden aspect-square w-[2.4rem] shrink-0 ml-auto'
                        onClick={handleOpendropdown}
                    >
                        <img src='/icon/icon-more.svg' alt='' className='w-full h-full object-cover' />
                    </div>
                    {isDropdownOpen && <PrimaryDropdown dropdownMenus={dropdownMenus} closeDropdown={closeDropdown} />}
                </div>
            </div>
        </>
    );
};

export default Comment;
