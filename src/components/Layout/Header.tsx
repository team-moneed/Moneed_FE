'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Logo from '@/app/onboarding/Logo';
import NavLink from '@/components/NavLink';

const CommonHeader = () => {
    const router = useRouter();

    const movetowritepost = () => {
        router.push('/writepost');
    };

    return (
        <>
            <div className='sticky top-0 z-10 bg-white flex items-center justify-between px-[4rem] pb-[1.8rem] pt-[3rem]'>
                <Link href='/'>
                    <div className='flex'>
                        <div className='w-[2.8rem] h-[2.8rem] bg-moneed-black rounded-full flex items-center justify-center'>
                            <img className='w-[1.4rem] h-[1.2rem]' src='/icon/icon-logo.svg' alt='' />
                        </div>
                        <span className='font-semibold leading-[140%] text-[1.8rem] ml-[.8rem]'>moneed</span>
                    </div>
                </Link>
                <NavLink href='/shortform'>
                    <span className='hidden lg:block lg:text-[1.4rem] font-semibold ml-[2.6rem]'>숏폼</span>
                </NavLink>
                <NavLink href='/community'>
                    <span className='hidden lg:block lg:text-[1.4rem] font-semibold w-[8.4rem] ml-[2.4rem]'>
                        커뮤니티
                    </span>
                </NavLink>
                <div className='flex items-center gap-[2.4rem] ml-auto'>
                    <NavLink
                        href='/mypage'
                        icon='/icon/icon-profile-circle.svg'
                        activeIcon='/icon/icon-profile-circle.svg'
                    />
                    <img className='w-[2.4rem] h-[2.4rem]' src='/icon/icon-alarm.svg' alt='' />
                    <Button
                        onClick={movetowritepost}
                        className='hidden lg:flex gap-4 px-[2.4rem] py-[.8rem] items-center'
                        theme='brand'
                        textcolor='brand'
                    >
                        <img className='w-[1.8rem] h-[1.8rem]' src='/icon/icon-edit.svg' alt='' />
                        <span className='font-semibold leading-[135%] text-[1.4rem]'>포스팅</span>
                    </Button>
                </div>
            </div>
        </>
    );
};

const MenuHeader = () => {
    const router = useRouter();
    const { stocktype } = useParams();
    const pathname = usePathname();
    const isWritePostPath = pathname.startsWith('/writepost');
    const isEditPostPath = pathname.startsWith('/editpost');
    const iscommentPath = pathname.startsWith('/comment');
    const [showModal, setShowModal] = useState(false);

    // 뒤로가기 버튼 클릭 시 동작
    const handleBackButtonClick = () => {
        router.back();
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        router.back(); // 모달에서 나가기를 클릭 시 뒤로가기
    };

    const handleModalCancel = () => {
        setShowModal(false); // 모달에서 이어서 하기 클릭 시 모달 닫기
    };

    const getHeaderTitle = () => {
        if (isWritePostPath) {
            return '게시판 글쓰기';
        }

        if (isEditPostPath) {
            return '게시글 수정';
        }

        if (iscommentPath && stocktype) {
            return `${decodeURIComponent(stocktype as string)} 커뮤니티`;
        }

        switch (pathname) {
            case '/searchstocktype':
                return '게시판 선택';
            case '/community':
                return '커뮤니티';
            case '/mypost':
                return '내가 작성한 게시글';
            case '/mycomment':
                return '내가 작성한 댓글';
            default:
                return 'moneed';
        }
    };

    return (
        <div className='sticky top-0 z-10 bg-white flex items-center justify-between px-[4rem] pb-[1.8rem] pt-[3rem]'>
            <img
                className='cursor-pointer w-[2.4rem] h-[2.4rem]'
                onClick={handleBackButtonClick}
                src='/icon/icon-arrow-back.svg'
                alt=''
            />
            <h1 className='text-[1.6rem] font-semibold text-moneed-gray-9'>{getHeaderTitle()}</h1>
            {isWritePostPath || isEditPostPath ? (
                <img
                    className='w-[2.4rem] h-[2.4rem] cursor-pointer'
                    onClick={() => router.push('/')}
                    src='/icon/icon-exit.svg'
                    alt=''
                />
            ) : (
                <img className='w-[2.4rem] h-[2.4rem]' src='/icon/icon-alarm.svg' alt='' />
            )}
            {showModal && (
                <Modal
                    leftButtontext='이어서 하기'
                    rightButtontext='나가기'
                    leftButtonevent={handleModalCancel}
                    rightButtonevent={handleModalConfirm}
                    onClose={handleModalCancel}
                >
                    {isEditPostPath ? (
                        <span>
                            수정하던 글은 저장되지않아요.
                            <br />
                            다음에 수정할까요?
                        </span>
                    ) : (
                        <span>
                            작성하던 글은 저장되지않아요.
                            <br />
                            다음에 작성할까요?
                        </span>
                    )}
                </Modal>
            )}
        </div>
    );
};

const NoMenuHeader = () => {
    return (
        <div className='sticky top-0 z-10 bg-white flex items-center justify-between md:px-[4rem] md:pb-[1.8rem] md:pt-[3rem] px-[1.8rem] pt-[2rem] pb-[1.2rem]'>
            <Logo />
        </div>
    );
};

const Header = () => {
    const menuHeaderPaths = ['/mycomment', '/mypost', '/searchstocktype', '/writepost', '/editpost', '/post'];

    const noMenuHeaderPaths = ['/onboarding', '/selectstocktype'];

    const pathname = usePathname();

    if (noMenuHeaderPaths.includes(pathname)) {
        return <NoMenuHeader />;
    } else if (menuHeaderPaths.includes(pathname)) {
        return <MenuHeader />;
    } else {
        return <CommonHeader />;
    }
};

export default Header;
