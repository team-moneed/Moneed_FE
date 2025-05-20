import { NextResponse } from 'next/server';
import { type Stock } from '@/types/stock';
export async function GET() {
    const stockData: Stock[] = [
        {
            infoBoxImgages: '',
            name: '애플',
            priceUSD: '$173.45',
            rate: '2.5%',
            englishName: 'Apple',
        },
        {
            infoBoxImgages: '',
            name: '구글',
            priceUSD: '$2723.56',
            rate: '-1.3%',
            englishName: 'Google',
        },
        {
            infoBoxImgages: '',
            name: '마이크로소프트',
            priceUSD: '$312.65',
            rate: '0.8%',
            englishName: 'Microsoft',
        },
        {
            infoBoxImgages: '/temp/sample4.png',
            name: '테슬라',
            priceUSD: '$998.75',
            rate: '4.2%',
            englishName: 'Tesla',
        },
        {
            infoBoxImgages: '',
            name: '아마존',
            priceUSD: '$3476.55',
            rate: '-0.4%',
            englishName: 'Amazon',
        },
        {
            infoBoxImgages: '',
            name: '유나이티드헬스',
            priceUSD: '$504.99',
            rate: '16.3%',
            englishName: 'UnitedHealth',
        },
        {
            infoBoxImgages: '',
            name: '페이스북',
            priceUSD: '$328.54',
            rate: '1.1%',
            englishName: 'Facebook',
        },
        {
            infoBoxImgages: '',
            name: '알리바바',
            priceUSD: '$145.32',
            rate: '-3.2%',
            englishName: 'Alibaba',
        },
        {
            infoBoxImgages: '',
            name: '삼성전자',
            priceUSD: '$50.12',
            rate: '0.5%',
            englishName: 'Samsung',
        },
        {
            infoBoxImgages: '',
            name: '넷플릭스',
            priceUSD: '$612.99',
            rate: '-2.1%',
            englishName: 'Netflix',
        },
    ];
    return NextResponse.json(stockData);
}
