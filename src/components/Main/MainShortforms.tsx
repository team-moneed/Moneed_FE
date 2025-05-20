'use client';

import VideoCarousel from '@/components/Carousel/VideoCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { useQuery } from '@tanstack/react-query';
import { Video } from '@/types/video';

const MainShortforms = () => {
    const VIDEOOPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'start',
        // draggable: true,
        containScroll: 'trimSnaps',
    };

    const { data: videoData } = useQuery<Video[]>({
        queryKey: ['videos'],
        queryFn: () => fetch('/api/videos').then(res => res.json()),
    });

    return (
        <>
            <div className='mt-4'>{videoData && <VideoCarousel videos={videoData} options={VIDEOOPTIONS} />}</div>
        </>
    );
};

export default MainShortforms;
