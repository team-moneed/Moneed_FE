import axios from 'axios';

const baseUrl = process.env.BASE_URL;

interface KakaoTokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
}

export const fetchKakaoToken = async (code: string): Promise<KakaoTokenResponse> => {
    const { data } = await axios.get<KakaoTokenResponse>(`${baseUrl}/oauth2/kakao`, {
        params: { code },
        headers: { Accept: 'application/json' },
    });
    return data;
};
