import { REASON_CODES } from '@/constants/snackbar';
import axios from 'axios';
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const getMoneedInstance = (): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.NEXT_PUBLIC_MONEED_BASE_URL,
        headers: {
            'Content-type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            return config;
        },
        (error: AxiosError) => {
            console.error(error.response?.data);
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            if (error.response?.status === 401) {
                window.location.href = `/onboarding?reason=${REASON_CODES.EXPIRED_SESSION}`;
                console.error(error.response?.data);
                return Promise.reject(error);
            }
            return Promise.reject(error);
        },
    );

    return instance;
};

export const http = getMoneedInstance();
