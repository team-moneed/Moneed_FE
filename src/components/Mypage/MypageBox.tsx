import { ReactNode } from 'react';

type MypageBoxType = {
    className?: string;
    menu: string;
    count: number;
    onClick?: () => void;
    children?: ReactNode;
};

const MypageBox = ({ menu, count, onClick }: MypageBoxType) => {
    return (
        <>
            <div
                className='p-[1.6rem] flex-col justify-center gap-4 rounded-[1.6rem] border border-solid border-moneed-gray-5 cursor-pointer'
                onClick={onClick}
            >
                <div className='text-[2.4rem] font-medium leading-[140%] text-moneed-black'>{count}</div>
                <div className='text-[1.4rem] font-semibold leading-[140%] text-moneed-gray-9'>{menu}</div>
            </div>
        </>
    );
};

export default MypageBox;
