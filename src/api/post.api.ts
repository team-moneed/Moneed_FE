import { http } from './request';

export const getPosts = async (stocktype: string) => {
    const res = await http.get(`/api/posts?stocktype=${stocktype}`);
    return res.data;
};
