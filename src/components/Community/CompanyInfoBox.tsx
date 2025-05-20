'use client';

const CompanyInfoBox = () => {
    return (
        <>
            <div className='px-[1.2rem] py-[1.6rem] flex items-center gap-4 bg-(--moneed-black-3) border border-solid border-(--moneed-gray-5) rounded-[1.6rem]'>
                <div className='overflow-hidden aspect-square w-[2.4rem]'>
                    <img src='/icon/icon-bulb.svg' alt='' className='w-full h-full object-cover' />
                </div>
                <div className='text-[1.4rem] font-normal leading-[140%] text-(--moneed-black)'>
                    유나이티드 헬스 그룹(UNH)는 건강 및 후생 관련 사업을 진행하는 회사입니다.
                </div>
            </div>
        </>
    );
};

export default CompanyInfoBox;
