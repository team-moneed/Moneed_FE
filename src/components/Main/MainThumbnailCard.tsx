'use client';

import DateFormatter from '@/util/Dateformatter';

interface MainThumbnailCardProps {
    postId?: string | number;
    userName?: string;
    content?: string;
    createdAt: string;
    title?: string;
}

const MainThumbnailCard = ({ userName, content, title, createdAt }: MainThumbnailCardProps) => {
    return (
        <>
            <div className='border border-solid border-(--moneed-gray-5) p-[1.8rem] rounded-[1.8rem]'>
                <div className='flex items-center gap-[.6rem]'>
                    <div className='rounded-full overflow-hidden aspect-square w-[1.8rem]'>
                        <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                    </div>
                    <span className='text-[1.4rem] font-normal leading-[142%] text-(--moneed-gray-7)'>{userName}</span>
                    <i className='w-[.2rem] h-[.2rem] rounded-full bg-(--moneed-gray-5)'></i>
                    <DateFormatter createdAt={createdAt} />
                </div>
                <p className='mt-[1.2rem] text-[1.6rem] font-bold leading-[135%] text-(--moneed-black) line-clamp-1'>
                    {title}
                </p>
                <p className='mt-[.4rem] text-[1.6rem] font-normal leading-[145%] text-(--moneed-gray-9) line-clamp-2'>
                    {content}
                </p>
            </div>
        </>
    );
};

export default MainThumbnailCard;
