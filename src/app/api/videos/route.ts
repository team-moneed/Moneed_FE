import { NextResponse } from 'next/server';

export async function GET() {
    const videoList = [
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/681019c28ecdd60243b75164/final_681019a5b8941170500ccf56_110877.mp4',
            title: '동영상 1',
            createdAt: '2024-12-10T10:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/68101ac24cf818b58114a0f2/final_68101aaf653d89609a2fab1e_540516.mp4',
            title: '동영상 2',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/68101c097ac35de79083943b/final_68101b917ef0e6fb740f921f_831314.mp4',
            title: '동영상 3',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/68101db9f42b3c03a2f462a0/final_68101d954cf818b58114a1ae_167670.mp4',
            title: '동영상 4',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/68101e227b014d7445f989f0/final_68101d954cf818b58114a1ae_303542.mp4',
            title: '동영상 5',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/68101ef16eef3c26ac381e2c/final_68101d954cf818b58114a1ae_58170.mp4',
            title: '동영상 6',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/68102074f40a41abb840b069/final_68101d954cf818b58114a1ae_91676.mp4',
            title: '동영상 7',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/681020ec1c172d560fe0322e/final_68101d954cf818b58114a1ae_717205.mp4',
            title: '동영상 8',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/681021c11d3eaa3ba57347b2/final_68101d954cf818b58114a1ae_609712.mp4',
            title: '동영상 9',
            createdAt: '2024-12-09T09:00:00Z',
        },
        {
            videoUrl:
                'https://cdn-useast1.kapwing.com/teams/6810177cc315cb8497e459db/jobs/681022b0056df82be1130f9a/final_68101d954cf818b58114a1ae_717405.mp4',
            title: '동영상 10',
            createdAt: '2024-12-09T09:00:00Z',
        },
    ];
    return NextResponse.json(videoList);
}
