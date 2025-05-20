'use client';

import useAuthStore from '@/store/useAuthStore';
import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

const Protected = ({ children }: PropsWithChildren) => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    if (!isLoggedIn) {
        alert('로그인이 필요합니다.');
        return redirect('/onboarding');
    }
    return children;
};

export default Protected;
