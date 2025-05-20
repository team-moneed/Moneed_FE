'use client';

import Button from '@/components/Button';

export default function Onboarding() {
    const handleKakaoLogin = () => {
        const clientId = process.env.KAKAO_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

        window.location.href = kakaoAuthUrl;
    };

    return (
        <>
            <div className="relative h-screen overflow-hidden px-[1.8rem] pt-8 bg-[url('/line-bg.png')] bg-size-[8rem_8rem] lg:bg-[url('/line-bg-pc.png')]">
                <div className='flex'>
                    <div className='w-[2.8rem] h-[2.8rem] bg-(--moneed-black) rounded-full flex items-center justify-center'>
                        <img className='w-[1.4rem] h-[1.2rem]' src='/icon/icon-logo.svg' alt='' />
                    </div>
                    <span className='font-semibold leading-[140%] text-[1.8rem] ml-[.8rem]'>moneed</span>
                </div>
                <div className='pt-[14.3rem]'>
                    <div className='relative z-2 text-[3.2rem] text-(--moneed-black) font-bold leading-[145%]'>
                        당신의 니즈를
                        <br />
                        충족하는 투자의
                        <br />
                        시작, 머니드
                    </div>
                    <div className='z-2 absolute bottom-32 left-0 right-0 px-8 lg:sticky lg:mt-[1.6rem] lg:px-0'>
                        <Button
                            type='submit'
                            theme='primary'
                            textcolor='primary'
                            className='w-full flex items-center justify-center h-[5.6rem] gap-[1.8rem] text-[1.6rem]  px-16 font-bold leading-[140%] rounded-[1.6rem] lg:w-auto'
                            onClick={handleKakaoLogin}
                        >
                            <img src='/logo-kakao.svg' alt='' />
                            카카오로 시작하기
                        </Button>
                    </div>
                </div>
                <div className='absolute bottom-0 right-0 h-full left-0 lg:hidden'>
                    <img src='/onboarding-arrow.svg' alt='' className='absolute bottom-0 right-0' />
                    <img
                        src='/onboarding-square1.svg'
                        alt=''
                        className='absolute -right-16 bottom-140 w-[16.6rem]'
                    />
                    <img src='/-square2.svg' alt='' className='absolute right-[6.8rem] bottom-[15.2rem] w-[14.7rem]' />
                </div>
                <div className='hidden absolute bottom-0 right-0 h-full left-0 lg:block'>
                    <img src='/onboarding-arrow-pc.svg' alt='' className='absolute top-16 right-0' />
                    <img src='/onboarding-square1.svg' alt='' className='absolute right-24 top-100 w-88' />
                    <img
                        src='/onboarding-square2.svg'
                        alt=''
                        className='absolute right-[29.2rem] top-[64.6rem] w-88'
                    />
                </div>
            </div>
        </>
    );
}
