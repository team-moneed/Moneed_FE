'use client';

import MainNews from '@/components/Main/MainNews';
import MainShortforms from '@/components/Main/MainShortforms';
import TopStockRank from '@/components/Main/TopStockRank';
import Link from 'next/link';
import useSnackBarStore, { SnackBarType } from '@/store/useSnackBarStore';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const reasons: Record<string, { message: string; type: SnackBarType }> = {
    logged_in: { message: '이미 로그인 상태입니다.', type: 'normal' },
};

function Home() {
    const searchParams = useSearchParams();
    const reason = searchParams.get('reason');
    const showSnackBar = useSnackBarStore(state => state.showSnackBar);

    useEffect(() => {
        if (reason) {
            showSnackBar(
                reasons[reason as keyof typeof reasons].message,
                reasons[reason as keyof typeof reasons].type,
                'top',
            );
        }
    }, [reason, showSnackBar]);

    return (
        <div className='px-8 max-w-512 mx-auto'>
            <div className='mt-[.7rem] lg:mt-4 aspect-350/106 rounded-[.8rem] overflow-hidden lg:aspect-941/151'>
                <img src='/temp/main-bn-m.png' alt='' className='w-full h-full object-cover lg:hidden' />
                <img src='/temp/main-bn-pc.png' alt='' className='hidden w-full h-full object-cover lg:block' />
            </div>
            <div className='mt-[3.6rem] lg:mt-[2.8rem]'>
                <div className='flex items-center gap-[.8rem] mb-[1.8rem] justify-between'>
                    <h2 className='text-[2.2rem] leading-[135%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                        HOT 숏폼
                    </h2>
                    <button className='flex items-center gap-[.8rem] self-stretch'>
                        <Link
                            className='text-[1.4rem] font-semibold leading-[135%] text-moneed-gray-8'
                            href='/shortform'
                        >
                            더보기
                        </Link>
                        <div className='shrink-0 w-[1.8rem] h-[1.8rem]'>
                            <img src='/icon/icon-arrow-right.svg' alt='' />
                        </div>
                    </button>
                </div>
                <MainShortforms />
            </div>

            <div className='mt-[3.6rem] lg:mt-[5.2rem]'>
                <div className='flex items-center gap-[.8rem] mb-[1.8rem]'>
                    <h2 className='text-[2.2rem] leading-[135%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                        TOP 3 종목 게시판
                    </h2>
                    <span className='text-moneed-gray-6 text-[1.2rem] font-normal leading-[135%]'>
                        12월 21일 9시 기준
                    </span>
                </div>
                <TopStockRank />
            </div>

            <div className='mt-[3.6rem] lg:mt-[5.2rem]'>
                <div className='flex items-center gap-[.8rem] mb-[1.8rem]'>
                    <h2 className='text-[2.2rem] leading-[135%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                        주요 뉴스
                    </h2>
                </div>
                <MainNews />
            </div>
        </div>
    );
}

export default function HomeWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Home />
        </Suspense>
    );
}
