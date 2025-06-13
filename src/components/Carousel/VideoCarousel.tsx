'use client';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton } from '@/components/Carousel/CarouselArrowButton';
import { usePrevNextButtons } from '@/hooks/usePrevNextButtons';
import { useRouter } from 'next/navigation';
import { Video } from '@/types/video';
type PropType = {
    videos: Video[];
    options?: EmblaOptionsType;
    slidesToShow?: number;
};
const VideoCarousel = (props: PropType) => {
    const { videos, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({
        ...options,
        loop: false,
        // wrapAround: true,
        // slidesToShow,
    });
    const { nextBtnDisabled, onNextButtonClick } = usePrevNextButtons(emblaApi);

    const router = useRouter();

    const movetoshortformDetail = () => {
        router.push('/shortform');
    };

    return (
        <div className='relative lg:pr-[5.6rem]'>
            <div className='w-full overflow-hidden mask-right' ref={emblaRef}>
                <div className='flex gap-[.8rem]'>
                    {videos.map((video, index) => (
                        <div
                            className='w-[calc(30%-1.6rem)] lg:w-[calc(20%-1.6rem)] shrink-0 cursor-pointer'
                            key={index}
                            style={{ aspectRatio: '9/16' }}
                            onClick={movetoshortformDetail}
                        >
                            <div className='w-full h-full rounded-[.8rem] overflow-hidden'>
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
            </div>

            <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className='hidden lg:absolute lg:block top-1/2 right-2 transform -translate-y-1/2 z-10 p-[1.2rem] rounded-4xl bg-(--moneed-gray-5)'
            />
        </div>
    );
};

export default VideoCarousel;
