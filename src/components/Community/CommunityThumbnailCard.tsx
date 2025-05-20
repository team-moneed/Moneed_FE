'use client';

import DateFormatter from '../../util/Dateformatter';

type CommunityThumbnailCardPropsType = {
    userName: string;
    content?: string;
    title?: string;
    createdAt: string;
};

const CommunityThumbnailCard = ({ userName, content, title, createdAt }: CommunityThumbnailCardPropsType) => {
    return (
        <div className='relative border border-solid border-(--moneed-gray-5) px-[1.8rem] py-[1.6rem] rounded-[1.6rem] h-72'>
            <p className='mt-[1.2rem] text-[1.6rem] font-semibold leading-[140%] text-(--moneed-black) line-clamp-1'>
                {title}
            </p>
            <p className='mt-[.4rem] mb-[1.2rem] text-[1.6rem] font-normal leading-[140%] text-(--moneed-gray-9) line-clamp-3'>
                {content}
            </p>

            <div className='absolute bottom-[1.6rem] flex items-center gap-[.6rem]'>
                <div className='rounded-full overflow-hidden aspect-square w-[1.8rem]'>
                    <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                </div>
                <span className='text-[1.4rem] font-normal leading-[140%] text-(--moneed-black)'>{userName}</span>
                <i className='w-[.2rem] h-[.2rem] rounded-full bg-(--moneed-gray-5)'></i>
                <DateFormatter createdAt={createdAt} />
            </div>
        </div>
    );
};

export default CommunityThumbnailCard;
