import { NextResponse } from 'next/server';

export async function GET() {
    const videoList = [
        {
            videoUrl: 'https://youtube.com/shorts/THSYZR42VM4?si=vNi6tDpqCOD7Ig51',
            title: '동영상 1',
            createdAt: '2024-12-10T10:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/6Pk6q-_XJOg?si=F5H1xHCBP55Ao1Cl',
            title: '동영상 2',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/q57j8ongDAk?si=6qBFdsI0V208e8NZ',
            title: '동영상 3',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/kiUgucUykkA?si=AkfLJeBDFyeoD3Lx',
            title: '동영상 4',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/DSq2NRsudnY?si=xmIJ81tU7ap65b5d',
            title: '동영상 5',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/g4U4ffMeMrY?si=pZHfc5xhfM1y0CAi',
            title: '동영상 6',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/nUcwJQ4fv7o?si=56xveDDNS68l42Hb',
            title: '동영상 7',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/iTj10SR1ods?si=Jg7Ing-NW_2SSoJF',
            title: '동영상 8',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/136RAu2YrHw?si=7ysXhFXrPi4mp0DD',
            title: '동영상 9',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl: 'https://youtube.com/shorts/uxqbj7M0PlY?si=UX41ieawOJ94yVsD',
            title: '동영상 10',
            createdAt: '2024-12-09T09:00:00Z',
        },
    ];
    return NextResponse.json(videoList);
}
