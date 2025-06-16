'use client';

import { type Video } from '@/types/video';
import { useQuery } from '@tanstack/react-query';

export default function ShortformPage() {
    const { data: videoList } = useQuery<Video[]>({
        queryKey: ['videoList'],
        queryFn: () => fetch('/api/videos').then(res => res.json()),
    });
    return (
        <div className='px-8 max-w-512 mx-auto'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-[1.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]'>
                {videoList?.map((video, index) => (
                    <div className='shrink-0' key={`${index}-${video.videoUrl}`} style={{ aspectRatio: '9/16' }}>
                        <video controls className='w-full h-full object-cover rounded-[.8rem]'>
                            <source src={video.videoUrl} type='video/mp4' />
                        </video>
                    </div>
                ))}
            </div>
        </div>
    );
}
