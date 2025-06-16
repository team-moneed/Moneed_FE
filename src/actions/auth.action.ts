'use server';

import { redirect } from 'next/navigation';

export async function getKakaoAuthCode() {
    const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const state = encodeURIComponent(process.env.KAKAO_STATE_TOKEN!);
    const nonce = encodeURIComponent(process.env.KAKAO_NONCE!);
    const scope = [
        'openid',
        'profile_nickname',
        'profile_image',
        'gender',
        'age_range',
        'account_email',
        'name',
        'birthday',
        'birthyear',
    ];
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=${scope.join(',')}&state=${state}&nonce=${nonce}`;
    redirect(url);
}
