import { http } from '@/api/request';

export const main = {
    main1: async () => {
        const response = await http.get<string>(``);
        return response.data;
    },
};
