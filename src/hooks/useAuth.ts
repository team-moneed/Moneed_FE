'use client';

import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        if (accessToken) {
            setIsLoggedIn(true);
        } else {
            alert('로그인이 필요합니다.');
            setIsLoggedIn(false);
        }
    }, [accessToken]);

    return { isLoggedIn };
};

export default useAuth;
