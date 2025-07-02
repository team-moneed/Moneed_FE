'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/api/auth.api';
import { useQuery } from '@tanstack/react-query';

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

    const { data: token } = useQuery({
        queryKey: ['kakao', code, state],
        queryFn: () => login({ code: code!, state: state, provider: 'kakao' }),
        enabled: !!code,
    });

    useEffect(() => {
        if (token) {
            const { isExistingUser } = token;
            if (isExistingUser) {
                router.push('/');
            } else {
                router.push(`/selectstocktype?url=${encodeURIComponent('/welcome')}`);
            }
        }
    }, [token, router]);

    return <div>리다이렉트 중...</div>;
}

export default function KakaoCallbackWrapper() {
    return (
        <Suspense>
            <KakaoCallback />
        </Suspense>
    );
}
