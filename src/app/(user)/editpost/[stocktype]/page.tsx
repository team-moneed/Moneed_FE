'use client';

import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import UploadImage from '@/components/UploadImage';
import { useKeyboardOffset } from '@/hooks/useKeyboardOffset';
import useSnackBarStore from '@/store/useSnackBarStore';

type FieldData = {
    title: string;
    content: string;
};

const EditPost = ({ params }: { params: Promise<{ stocktype: string }> }) => {
    const { stocktype } = use(params);
    const { register, handleSubmit, watch, setValue } = useForm<FieldData>({
        defaultValues: {
            title: '',
            content: '',
        },
    });

    // 상태
    const { state } = useLocation();

    const { showSnackBar } = useSnackBarStore();
    const bottomOffset = useKeyboardOffset();

    const content = watch('content', '');
    const initialContent = state?.content || '';

    const title = watch('title', '');
    const initialTitle = state?.title || '';

    const [postImages] = useState<string[]>([]);
    const [, setFormImg] = useState<FormData | string[]>([]);

    useEffect(() => {
        if (title.trim().length >= 50) {
            showSnackBar('제목은 공백 포함 50자 제한입니다.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
        }

        if (content.trim().length >= 1000) {
            showSnackBar('본문은 최대 1000자 입니다.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
        }

        // store에서 가져온 함수(showSnackBar)는 리렌더링시 참조가 변경되지 않기 때문에 종속성 배열에 추가해도 useEffect가 매번 실행되지 않음
    }, [content, title, initialContent, initialTitle, showSnackBar]);

    useEffect(() => {
        if (state) {
            setValue('title', state.title);
            setValue('content', state.content);
        }
    }, [state, setValue]);

    const handleFileUpload = (formData: FormData) => {
        setFormImg(formData);
    };

    const onSubmit = (data: FieldData) => {
        const formData = { ...data, stocktype };

        if (!title.trim()) {
            showSnackBar('제목을 입력해주세요.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
            return;
        }

        if (content.trim().length == 0) {
            showSnackBar('내용을 입력해주세요.', 'normal', 'bottom', '/icon/icon-snackbar.svg');
            return;
        }

        console.log('게시글수정', formData);
        showSnackBar('게시글이 수정되었습니다.', 'action', 'bottom', '');
    };

    return (
        <>
            <div className='px-8 max-w-512 mx-auto'>
                <div className='flex items-center justify-between gap-[.6rem] mt-4'>
                    <button className='bg-(--moneed-shade-bg) py-[1.2rem] px-[1.6rem] rounded-[.8rem] flex items-center gap-[0.6rem]'>
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
                        {...register('title', { required: '제목을 입력해주세요.' })}
                        type='text'
                        placeholder='제목을 입력해주세요'
                        className='border-b border-(--moneed-gray-5) w-full py-[1.6rem] text-[1.6rem] font-normal leading-[140%] focus:outline-none placeholder:text-(--moneed-gray-7)'
                        maxLength={50}
                    />
                    <textarea
                        {...register('content', { required: '의견을 입력해주세요.' })}
                        // type="text"
                        placeholder='의견을 입력해주세요'
                        className='w-full h-120 py-[1.6rem] text-[1.6rem] font-normal leading-[140%] placeholder:text-(--moneed-gray-7) focus:outline-none'
                        maxLength={1000}
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
                            // buttonProps={{ type: "button" }}
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
            </div>
        </>
    );
};

export default EditPost;
