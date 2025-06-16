import 'server-only';
import { KakaoRefreshTokenResponse, KakaoTokenResponse } from '@/types/kakao';
import axios, { AxiosError } from 'axios';
import { ProviderRepository } from '@/repositories/provider.repository';
import { deleteSession } from '@/lib/session';

export interface KakaoUserInfo {
    id: bigint;
    connected_at: string;
    synched_at: string;
    properties: {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    };
    kakao_account: {
        profile: {
            nickname: string;
            thumbnail_image_url: string;
            profile_image_url: string;
        };
        age_range: string;
        gender: 'male' | 'female';
        name: string;
        email: string;
        birthyear: string;
        birthday: string;
    };
}

const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
const kakaoLogoutUrl = 'https://kapi.kakao.com/v1/user/logout';
const kakaoLeaveUrl = 'https://kapi.kakao.com/v1/user/unlink';
const providerRepository = new ProviderRepository();

export const getKakaoToken = async (code: string) => {
    const data = {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const res = await axios.post<KakaoTokenResponse>(kakaoTokenUrl, data, {
        headers,
    });
    return res.data;
};

export const refreshKakaoToken = async (refreshToken: string) => {
    const data = {
        grant_type: 'refresh_token',
        client_id: process.env.KAKAO_CLIENT_ID,
        refresh_token: refreshToken,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const res = await axios.post<KakaoRefreshTokenResponse>(kakaoTokenUrl, data, {
        headers,
    });
    return res.data;
};

const kakaoAuthInstance = (() => {
    const instance = axios.create();

    instance.interceptors.request.use(async config => {
        try {
            if (config.headers.Authorization) {
                const token = (config.headers.Authorization as string).split(' ')[1];
                const providerData = await providerRepository.getTokenExpiration('kakao', token);
                if (providerData) {
                    const isAcessTokenExpired = providerData.accessTokenExpiresIn < new Date();
                    const isRefreshTokenExpired = providerData.refreshTokenExpiresIn < new Date();

                    if (!isAcessTokenExpired && !isRefreshTokenExpired) {
                        config.headers.Authorization = `Bearer ${providerData.accessToken}`;
                        return config;
                    } else if (isAcessTokenExpired) {
                        const newToken = await refreshKakaoToken(providerData.refreshToken);
                        config.headers.Authorization = `Bearer ${newToken.access_token}`;
                        await providerRepository.updateTokenData(
                            {
                                provider: 'kakao',
                                providerUserId: providerData.providerUserId,
                            },
                            {
                                accessToken: newToken.access_token,
                                refreshToken: newToken.refresh_token,
                                accessTokenExpiresIn: new Date(Date.now() + newToken.expires_in * 1000),
                                refreshTokenExpiresIn: newToken.refresh_token_expires_in
                                    ? new Date(Date.now() + newToken.refresh_token_expires_in * 1000)
                                    : undefined,
                            },
                        );
                        return config;
                    } else if (isRefreshTokenExpired) {
                        await providerRepository.delete('kakao', providerData.providerUserId);
                        await deleteSession();
                        return Promise.reject(new AxiosError('Token expired'));
                    }
                }
                return config;
            }
            return Promise.reject(new AxiosError('Authorization header is required'));
        } catch (error) {
            console.error('Failed to get Kakao token expiration:', (error as AxiosError).response?.data);
            return Promise.reject(error);
        }
    });

    instance.interceptors.response.use(response => {
        try {
            return response;
        } catch (error) {
            console.error('Failed to get Kakao token expiration:', (error as AxiosError).response?.data);
            return Promise.reject(error);
        }
    });

    return instance;
})();

export const getKakaoUserInfo = async (accessToken: string) => {
    try {
        const res = await kakaoAuthInstance.get<KakaoUserInfo>(kakaoUserInfoUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Failed to get Kakao user info:', (error as AxiosError).response?.data);
        throw error;
    }
};

export const logoutKakao = async ({ accessToken, providerUserId }: { accessToken: string; providerUserId: string }) => {
    try {
        const res = await kakaoAuthInstance.post(
            kakaoLogoutUrl,
            {
                target_id_type: 'user_id',
                target_id: BigInt(providerUserId),
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.error('Failed to logout with Kakao:', (error as AxiosError).response?.data);
        throw error;
    }
};

export const leaveKakao = async ({ accessToken, providerUserId }: { accessToken: string; providerUserId: string }) => {
    try {
        const res = await kakaoAuthInstance.post<{ id: bigint }>(
            kakaoLeaveUrl,
            {
                target_id_type: 'user_id',
                target_id: BigInt(providerUserId),
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.error('Failed to leave with Kakao:', (error as AxiosError).response?.data);
        throw error;
    }
};
