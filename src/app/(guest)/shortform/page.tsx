'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { shorts } from '@/api/shorts/shortsQueries';
import { Video } from '@/types/video';

export default function ShortformPage() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { data: videos = [], isLoading } = useQuery(shorts.getYoutubeStockshorts());

    return (
        <div className='sm:px-6 px-8 max-w-512 mx-auto'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-[1.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]'>
                {!isLoading &&
                    videos.map((video: Video, i: number) => (
                        <div
                            key={video.id.videoId}
                            className='overflow-hidden rounded-lg cursor-pointer'
                            onClick={() => setSelectedIndex(i)}
                        >
                            <div className='aspect-[9/16] min-h-[200px]'>
                                <iframe
                                    className='w-full h-full pointer-events-none'
                                    src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${video.id.videoId}`}
                                    title={video.snippet.title}
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    ))}
            </div>
            {selectedIndex !== null && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col'>
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className='absolute top-4 right-4 text-white text-xl z-50 bg-black bg-opacity-50 rounded px-3 py-1'
                    >
                        ✕
                    </button>
                    <div className='flex-1 flex justify-center items-center px-4'>
                        <iframe
                            width='360'
                            height='640'
                            src={`https://www.youtube.com/embed/${videos[selectedIndex].id.videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                            title={videos[selectedIndex].snippet.title}
                            allow='autoplay; fullscreen; encrypted-media'
                            allowFullScreen
                            className='rounded-lg shadow-lg'
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
