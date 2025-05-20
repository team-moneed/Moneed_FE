import { ReactNode } from 'react';

type MyStockProps = {
    infoBoxImgages?: string[] | string;
    name?: string;
    priceUSD?: string;
    rate?: string;
    children?: ReactNode;
    className?: string;
    englishName?: string;
    onClick: () => void;
    isSelectCategory?: boolean;
};

const MyStockBox = ({ name, children, onClick, isSelectCategory = false }: MyStockProps) => {
    return (
        <>
            <div
                className='flex justify-between p-[.8rem] rounded-[.8rem] hover:bg-(--moneed-white) cursor-pointer transition-colors`'
                onClick={onClick}
            >
                <div className='flex items-center gap-[.6rem]'>
                    <div className='rounded-full overflow-hidden aspect-square w-7'>
                        <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                    </div>
                    <div className='rounded-[.8rem] bg-(--moneed-gray-4) py-[.2rem] px-[.4rem]'>
                        <span className='text-[1.2rem] font-normal leading-[135%] text-(--moneed-gray-9)'>
                            appl
                        </span>
                    </div>
                    <h3 className='text-[1.4rem] font-semibold leading-[140%] text-(--moneed-black)'>{name}</h3>
                </div>
                {!isSelectCategory && (
                    <div className='flex items-center gap-[.6rem]'>
                        <div className='text-[1.4rem] font-semibold leading-[140%] text-(--moneed-black)'>
                            $504.99🇺🇸
                        </div>
                        <div className='text-[1.4rem] font-semibold leading-[140%] text-(--moneed-green) rounded-[.8rem] p-[.4rem]'>
                            16.3%
                        </div>
                    </div>
                )}
            </div>
            {children}
        </>
    );
};

export default MyStockBox;
