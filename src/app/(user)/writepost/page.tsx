'use client';

import { useEffect, useState } from 'react';
import BottomModal from '@/components/BottomModal';
import UploadImage from '@/components/UploadImage';
import useSnackBarStore from '@/store/useSnackBarStore';
import { useForm } from 'react-hook-form';
import { useKeyboardOffset } from '@/hooks/useKeyboardOffset';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

type FieldData = {
    title: string;
    content: string;
};

const WritePost = () => {
    const searchParams = useSearchParams();
    const stocktype = searchParams.get('stocktype');
    const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);

    const bottomOffset = useKeyboardOffset();

    const [postImages] = useState<string[]>([]);
    const [, setFormImg] = useState<FormData | string[]>([]);

    const router = useRouter();

    const { register, handleSubmit, watch } = useForm<FieldData>();
    const content = watch('content', '');
    const title = watch('title', '');

    const { showSnackBar } = useSnackBarStore();
    useSnackBarStore();

    const handleFileUpload = (formData: FormData) => {
        setFormImg(formData);
    };

    useEffect(() => {
        const isModalShown = localStorage.getItem('bottomModalShown');

        if (!isModalShown && !content && !title) {
            setIsBottomModalOpen(true);
            localStorage.setItem('bottomModalShown', 'true');
        }
    }, [content, title]);

    useEffect(() => {
        if (title.trim().length >= 50) {
            showSnackBar('제목은 공백 포함 50자 제한입니다.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
        }

        if (content.trim().length >= 1000) {
            showSnackBar('본문은 최대 1000자 입니다.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
        }
    }, [content, title, showSnackBar]);

    const movetoSearchStocktype = () => {
        router.push('/searchstocktype');
    };

    const handleFocus = (field: string) => {
        if (!stocktype) {
            showSnackBar('커뮤니티 종목을 먼저 선택해주세요.', 'normal', 'top', '/icon/icon-snackbar.svg');
            return;
        }

        if (field === 'title') {
            document.getElementById('title')?.focus();
        } else if (field === 'content') {
            document.getElementById('content')?.focus();
        }
    };

    const onSubmit = async (data: FieldData) => {
        const formData = { ...data, stocktype };

        if (!stocktype) {
            showSnackBar('커뮤니티 종목을 선택해주세요.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
            return;
        }

        if (!title.trim()) {
            showSnackBar('제목을 입력해주세요.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
            return;
        }

        if (content.trim().length == 0) {
            showSnackBar('내용을 입력해주세요.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
            return;
        }

        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        showSnackBar('게시글이 작성되었습니다.', 'action', 'bottom', '');

        if (res.redirected) redirect(res.url);
    };

    return (
        <div className='px-8 max-w-512 mx-auto'>
            <div className='flex items-center justify-between gap-[.6rem] mt-4'>
                <button
                    className='bg-(--moneed-shade-bg) py-[1.2rem] px-[1.6rem] rounded-[.8rem] flex items-center gap-[0.6rem]'
                    onClick={movetoSearchStocktype}
                >
                    <span
                        className={`text-[1.4rem] font-normal ${
                            stocktype ? 'text-(--moneed-black)' : 'text-(--moneed-gray-7)'
                        }`}
                    >
                        {stocktype || '글을 쓸 커뮤니티 종목을 선택해주세요.'}
                    </span>
                    <div className='overflow-hidden aspect-square w-[1.2rem]'>
                        <img src='/icon/icon-arrow-down.svg' alt='' className='w-full h-full object-cover' />
                    </div>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('title')}
                    type='text'
                    placeholder='제목을 입력해주세요'
                    className='border-b border-(--moneed-gray-5) w-full py-[1.6rem] text-[1.6rem] font-normal leading-[140%] focus:outline-none placeholder:text-(--moneed-gray-7)'
                    maxLength={50}
                    onFocus={() => handleFocus('title')}
                />
                <textarea
                    {...register('content')}
                    // type="text"
                    placeholder='의견을 입력해주세요'
                    className='w-full h-120 py-[1.6rem] text-[1.6rem] font-normal leading-[140%] placeholder:text-(--moneed-gray-7) focus:outline-none'
                    maxLength={1000}
                    onFocus={() => handleFocus('content')}
                />
                <div
                    className={`fixed left-0 right-0 z-20 h-[5.2rem] px-8 bg-white flex items-center justify-between transition-all duration-300 ${
                        bottomOffset > 0 ? `bottom-[${bottomOffset}px]` : 'bottom-0'
                    }`}
                >
                    <UploadImage
                        id='blog'
                        onUploadFiles={handleFileUpload}
                        multiple={true}
                        uploadfileLength={4}
                        imgpreviewWidth={60}
                        imgpreviewHeight={60}
                        imgClassName='object-cover w-full h-full'
                        buttonpositionClassName='mr-0'
                        imgUrl={postImages}
                    />
                    <div className='text-right text-[1.4rem] text-(--moneed-gray-7) w-full mx-4'>
                        {content.length} / 1000자
                    </div>
                    <button
                        className='rounded-full overflow-hidden aspect-square w-[3.6rem] bg-(--moneed-gray-6) cursor-pointer hover:bg-(--moneed-brand-color)'
                        type='submit'
                    >
                        <img
                            src='/icon/icon-submit-post.svg'
                            alt='submit'
                            className='w-full h-full object-cover p-[.6rem]'
                        />
                    </button>
                </div>
            </form>
            {isBottomModalOpen && (
                <BottomModal
                    imageSrc='/post-warning.svg'
                    title='이런 의견은 피해주세요'
                    description={
                        <>
                            스팸홍보/도배글
                            <br />
                            욕설/음란물,
                            <br />
                            불법 투자 조장,
                            <br />
                            청소년에게 유해한 내용
                        </>
                    }
                    ButtonText='확인'
                    onButtonClick={() => setIsBottomModalOpen(false)}
                    onClose={() => setIsBottomModalOpen(false)}
                />
            )}
        </div>
    );
};

export default WritePost;
