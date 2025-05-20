'use client';
import { useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { fetchKakaoToken } from '@/api/auth/authApi';
import { useQuery } from '@tanstack/react-query';

export default function KakaoRedirectHandler() {
    const router = useRouter();
    const login = useAuthStore(state => state.login);
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const handleError = (message: string) => {
        alert(message);
        router.push('/onboarding');
    };

    const handleSuccess = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
        login({ accessToken, refreshToken });
        router.push('/');
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['access-token', code],
        queryFn: () => fetchKakaoToken(code!),
        enabled: !!code,
        retry: false,
    });

    if (!code) {
        router.push('/onboarding');
        return null;
    }

    if (isLoading) {
        return <div>로그인 처리 중...</div>;
    }

    if (error) {
        console.error('Token request failed:', error);
        handleError('로그인에 실패했습니다. 네트워크 상태를 확인해주세요.');
        return null;
    }

    if (!data?.access_token) {
        localStorage.removeItem('access_token');
        handleError('로그인 실패: 토큰이 없습니다.');
        return null;
    }

    handleSuccess({ accessToken: data.access_token, refreshToken: data.refresh_token });
    return null;
}
