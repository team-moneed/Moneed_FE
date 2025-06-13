'use client';

import VideoCarousel from '@/components/Carousel/VideoCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { useQuery } from '@tanstack/react-query';
import { shorts } from '@/api/shorts/shortsQueries';

const MainShortforms = () => {
    const VIDEOOPTIONS: EmblaOptionsType = {
        slidesToScroll: 1,
        loop: true,
        align: 'start',
        // draggable: true,
        containScroll: 'trimSnaps',
    };

    const { data: videoData = [] } = useQuery(shorts.getYoutubeStockshorts());

    return (
        <>
            <div className='mt-4'>{videoData && <VideoCarousel videos={videoData} options={VIDEOOPTIONS} />}</div>
        </>
    );
};

export default MainShortforms;
