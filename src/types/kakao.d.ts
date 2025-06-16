// Kakao SDK TypeScript 타입 정의
// 참고: https://developers.kakao.com/sdk/reference/js/release/Kakao.html

import { Optional } from './util';

declare global {
    interface Window {
        Kakao: KakaoStatic;
    }
}

export interface KakaoStatic {
    // 버전 정보
    readonly VERSION: string;

    // 핵심 메서드
    init(appKey: string): void;
    isInitialized(): boolean;
    cleanup(): void;

    // 네임스페이스
    API: KakaoAPI;
    Auth: KakaoAuth;
    Channel: KakaoChannel;
    Navi: KakaoNavi;
    Picker: KakaoPicker;
    Share: KakaoShare;
}

// Kakao 공통 에러 타입
export interface KakaoError {
    name: 'KakaoError';
    message: string;
}

// API 네임스페이스
export interface KakaoAPI {
    cleanup(): void;
    request(settings: {
        url: string;
        data?: Record<string, any>;
        success?: (response: any) => void;
        fail?: (error: KakaoError) => void;
    }): void;
}

// Auth 네임스페이스
export interface KakaoAuth {
    authorize(settings: {
        redirectUri: string;
        state?: string;
        scope?: string;
        prompt?: 'login' | 'select_account' | 'create' | 'none';
        loginHint?: string;
        nonce?: string;
        throughTalk?: boolean;
    }): void;
    cleanup(): void;
    getAccessToken(): string | null;
    getAppKey(): string;
    getStatusInfo(callback: (statusInfo: any) => void): void;
    logout(callback?: () => void): void;
    selectShippingAddress(settings: { success?: (response: any) => void; fail?: (error: KakaoError) => void }): void;
    setAccessToken(token: string): void;
}

// Channel 네임스페이스
export interface KakaoChannel {
    addChannel(settings: { channelPublicId: string; success?: () => void; fail?: (error: KakaoError) => void }): void;
    chat(settings: { channelPublicId: string; success?: () => void; fail?: (error: KakaoError) => void }): void;
    cleanup(): void;
    createAddChannelButton(settings: {
        container: string | HTMLElement;
        channelPublicId: string;
        size?: 'small' | 'large';
        supportMultipleDensities?: boolean;
    }): void;
    createChatButton(settings: {
        container: string | HTMLElement;
        channelPublicId: string;
        size?: 'small' | 'large';
        supportMultipleDensities?: boolean;
    }): void;
    followChannel(settings: {
        channelPublicId: string;
        success?: () => void;
        fail?: (error: KakaoError) => void;
    }): void;
}

// Navi 네임스페이스
export interface KakaoNavi {
    share(settings: { name: string; x: number; y: number; coordType?: 'wgs84' | 'katec' }): void;
    start(settings: {
        name: string;
        x: number;
        y: number;
        coordType?: 'wgs84' | 'katec';
        vehicleType?: number;
        rpOption?: number;
        routeInfo?: boolean;
        sX?: number;
        sY?: number;
        sAngle?: number;
        returnUri?: string;
    }): void;
}

// Picker 네임스페이스
export interface KakaoPicker {
    cleanup(): void;
    selectFriend(settings: {
        title?: string;
        enableSearch?: boolean;
        showMyProfile?: boolean;
        showFavorite?: boolean;
        showPickedFriend?: boolean;
        maxPickableCount?: number;
        minPickableCount?: number;
        success?: (response: { users: any[] }) => void;
        fail?: (error: KakaoError) => void;
    }): void;
    selectFriends(settings: {
        title?: string;
        enableSearch?: boolean;
        showMyProfile?: boolean;
        showFavorite?: boolean;
        showPickedFriend?: boolean;
        maxPickableCount?: number;
        minPickableCount?: number;
        success?: (response: { users: any[] }) => void;
        fail?: (error: KakaoError) => void;
    }): void;
}

// Share 네임스페이스
export interface KakaoShare {
    cleanup(): void;
    createCustomButton(settings: {
        container: string | HTMLElement;
        templateId: number;
        templateArgs?: Record<string, any>;
        success?: () => void;
        fail?: (error: KakaoError) => void;
    }): void;
    createDefaultButton(settings: {
        container: string | HTMLElement;
        objectType: 'feed' | 'list' | 'location' | 'commerce' | 'text';
        content: {
            title: string;
            description?: string;
            imageUrl: string;
            link: {
                mobileWebUrl?: string;
                webUrl?: string;
                androidExecutionParams?: string;
                iosExecutionParams?: string;
            };
        };
        social?: {
            likeCount?: number;
            commentCount?: number;
            sharedCount?: number;
        };
        buttons?: Array<{
            title: string;
            link: {
                mobileWebUrl?: string;
                webUrl?: string;
                androidExecutionParams?: string;
                iosExecutionParams?: string;
            };
        }>;
        success?: () => void;
        fail?: (error: KakaoError) => void;
    }): void;
    createScrapButton(settings: {
        container: string | HTMLElement;
        requestUrl: string;
        templateId?: number;
        templateArgs?: Record<string, any>;
        success?: () => void;
        fail?: (error: KakaoError) => void;
    }): void;
    deleteImage(settings: { imageUrl: string; success?: () => void; fail?: (error: KakaoError) => void }): void;
    scrapImage(settings: {
        imageUrl: string;
        success?: (response: { infos: any[] }) => void;
        fail?: (error: KakaoError) => void;
    }): void;
    sendCustom(settings: {
        templateId: number;
        templateArgs?: Record<string, any>;
        success?: () => void;
        fail?: (error: KakaoError) => void;
    }): void;
    sendDefault(settings: {
        objectType: 'feed' | 'list' | 'location' | 'commerce' | 'text';
        content: {
            title: string;
            description?: string;
            imageUrl: string;
            link: {
                mobileWebUrl?: string;
                webUrl?: string;
                androidExecutionParams?: string;
                iosExecutionParams?: string;
            };
        };
        social?: {
            likeCount?: number;
            commentCount?: number;
            sharedCount?: number;
        };
        buttons?: Array<{
            title: string;
            link: {
                mobileWebUrl?: string;
                webUrl?: string;
                androidExecutionParams?: string;
                iosExecutionParams?: string;
            };
        }>;
        success?: () => void;
        fail?: (error: KakaoError) => void;
    }): void;
    sendScrap(settings: {
        requestUrl: string;
        templateId?: number;
        templateArgs?: Record<string, any>;
        success?: () => void;
        fail?: (error: KakaoError) => void;
    }): void;
    uploadImage(settings: {
        file: File;
        success?: (response: { infos: Array<{ original: { url: string } }> }) => void;
        fail?: (error: KakaoError) => void;
    }): void;
}

export interface KakaoTokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
    id_token: string;
}

export type KakaoRefreshTokenResponse = Optional<KakaoTokenResponse, 'refresh_token' | 'refresh_token_expires_in'>;
