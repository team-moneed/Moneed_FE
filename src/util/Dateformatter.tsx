import { useMemo } from 'react';

type DateFormatterPropsType = {
    createdAt: string;
};

const DateFormatter = ({ createdAt }: DateFormatterPropsType) => {
    // 시간을 계산하는 함수
    const changeFormatDate = (createdAt: string) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - new Date(createdAt).getTime()) / 1000);

        // 30초 이내
        if (diffInSeconds <= 30) {
            return 'Just Now';
        }

        // 30초 이후 ~ 1시간 이내
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        }

        // 1시간 이후 ~ 24시간 이내
        const diffInHours = Math.floor(diffInSeconds / 3600);
        if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        }

        // 24시간 이후 ~ 7일 이전
        const diffInDays = Math.floor(diffInSeconds / 86400);
        if (diffInDays < 7) {
            return `${diffInDays}일 전`;
        }

        // 7일 이후 ~ 14일 전
        if (diffInDays >= 7 && diffInDays < 14) {
            return '일주일 전';
        }

        // 14일 이후 ~ 21일 전
        if (diffInDays >= 14 && diffInDays < 21) {
            return '2주 전';
        }

        // 21일 이후 ~ 28일 전
        if (diffInDays >= 21 && diffInDays < 28) {
            return '3주 전';
        }

        // 28일 이후 ~ 60일 전
        if (diffInDays >= 28 && diffInDays < 60) {
            return '한달 전';
        }

        // 60일 이후 ~ 365일 전
        if (diffInDays >= 60 && diffInDays < 365) {
            const month = new Date(createdAt).getMonth() + 1;
            const day = new Date(createdAt).getDate();
            return `${month}월 ${day}일`;
        }

        // 이전 년도
        const year = new Date(createdAt).getFullYear();
        const month = new Date(createdAt).getMonth() + 1;
        const day = new Date(createdAt).getDate();
        return `${year}년 ${month}월 ${day}일`;
    };

    // formattedDate 값을 useMemo로 계산
    const formattedDate = useMemo(() => changeFormatDate(createdAt), [createdAt]);

    return (
        <span className='text-[1.4rem] font-normal leading-[142%] text-(--moneed-gray-7)'>{formattedDate}</span>
    );
};

export default DateFormatter;
