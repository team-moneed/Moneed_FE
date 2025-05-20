import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const stocktype = req.nextUrl.searchParams.get('stocktype');
    const posts = [
        {
            postId: 1,
            title: '1',
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333',
            ],
            content:
                '주식으로 돈벌래돈벌꺼야!!테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사테슬라 주식 언제 사언제사야이득이야? 알려줘알려줘알려주라고!! ',
            userName: '사용자1',
            createdAt: '2024-12-10T10:00:00Z',
            likes: 10,
            stocktype: '테슬라',
            category: '금융',
            isliked: true,
        },
        {
            postId: 2,
            title: '2',
            postImages: [],
            content: '2',
            userName: '사용자5',
            createdAt: '2024-12-09T09:00:00Z',
            likes: 7,
            stocktype: '애플',
            category: '정보기술',
            isliked: false,
        },
        {
            postId: 3,
            title: '3',
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333',
            ],
            content: '3 테슬라 언제 오르지?',
            userName: '사용자6',
            createdAt: '2024-12-09T09:00:00Z',
            likes: 7,
            stocktype: '테슬라',
            category: '금융',
            isliked: false,
        },
        {
            postId: 4,
            title: '4',
            postImages: [
                'https://via.placeholder.com/600x350/ff7f7f/333333',
                'https://via.placeholder.com/600x350/7f7fff/333333',
                'https://via.placeholder.com/600x350/7fff7f/333333',
            ],
            content: '4 테슬라 언제 오르지?',
            userName: '사용자5',
            createdAt: '2025-01-18T09:00:00Z',
            likes: 7,
            stocktype: '테슬라',
            category: '금융',
            isliked: false,
        },
    ];
    if (stocktype) {
        return NextResponse.json(posts.filter(post => post.stocktype === stocktype));
    }
    return NextResponse.json(posts);
}
