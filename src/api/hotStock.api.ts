import axios from 'axios';
import { http } from './request';

type MarketCode = 'NYS' | 'NAS' | 'AMS' | 'TSE' | 'HKS' | 'SHS' | 'SZS' | 'HSX' | 'HNX';

const investHttp = axios.create({
    baseURL: process.env.KIS_BASE_URL,
    headers: {
        'Content-type': 'application/json; charset=utf-8',
        Appkey: process.env.KIS_APP_KEY,
        Appsecret: process.env.KIS_APP_SECRET,
        Authorization: `Bearer ${process.env.KIS_ACCESS_TOKEN}`,
    },
});

const getHotStock = async ({ market }: { market: MarketCode }) => {
    const response = await investHttp.get(`/uapi/overseas-price/v1/quotations/inquire-search`, {
        params: {
            AUTH: '',
            EXCD: market,
        },
        headers: {
            Tr_id: 'HHDFS76410000',
        },
    });
    return response.data;
};

const getStockCategory = async ({ market, ticker }: { market: MarketCode; ticker: string }) => {
    const response = await http.get(`/uapi/overseas-price/v1/quotations/price-detail`, {
        params: {
            AUTH: '',
            EXCD: market,
            SYMB: ticker,
        },
        headers: {
            Tr_id: 'HHDFS76200200',
        },
    });
    return response.data;
};

export { getHotStock, getStockCategory };
