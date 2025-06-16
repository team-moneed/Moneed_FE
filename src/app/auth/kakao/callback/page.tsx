'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/api/auth.api';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
// import useUserStore from '@/store/useUserStore';
import { getCookie } from '@/util/cookie';

function KakaoCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const state = searchParams.get('state') ?? undefined;
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error || errorDescription) {
        alert(`${error}: ${errorDescription}`);
        router.push(`/auth/error?error=${error}&description=${errorDescription}`);
    }

    const setAccessToken = useAuthStore(state => state.setAccessToken);
    // TODO: 유저 정보 로직 추가
    // const setUserInfo = useUserStore(state => state.setUserInfo);

    const { data } = useQuery({
        queryKey: ['kakao', code, state],
        queryFn: () => login({ code: code!, state: state, provider: 'kakao' }),
        enabled: !!code,
    });

    useEffect(() => {
        if (data) {
            const { isExistingUser } = data;
            const accessToken = getCookie('access_token');
            if (!accessToken) return;

            setAccessToken(accessToken);
            if (isExistingUser) {
                router.push('/');
            } else {
                router.push(`/selectstocktype?url=${encodeURIComponent('/welcome')}`);
            }
        }
    }, [data, setAccessToken, router]);

    return <div>리다이렉트 중...</div>;
}

export default function KakaoCallbackPage() {
    return (
        <Suspense fallback={<div>리다이렉트 중...</div>}>
            <KakaoCallback />
        </Suspense>
    );
}
