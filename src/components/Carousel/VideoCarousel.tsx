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
                            className='w-[calc(30%-1.6rem)] lg:w-[calc(20%-1.6rem)] shrink-0'
                            key={index}
                            style={{ aspectRatio: '9/16' }}
                            onClick={movetoshortformDetail}
                        >
                            <video controls className='w-full h-full object-cover rounded-[.8rem]'>
                                {video.videoUrl && <source src={video.videoUrl} type='video/mp4' />}
                            </video>
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
