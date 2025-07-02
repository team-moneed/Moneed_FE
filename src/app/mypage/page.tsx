'use client';
import { useRouter } from 'next/navigation';
import MypageBox from '@/components/Mypage/MypageBox';
import MyStockBox from '@/components/Mypage/MyStockBox';
import { useSelectedStock } from '@/hooks/useSelectedStock';
import LogoutButton from '@/app/mypage/LogoutButton';

export default function Mypage() {
    const { data: selectedStocks } = useSelectedStock();

    const router = useRouter();

    const moveToMyProfile = () => {
        router.push(`/myprofile`);
    };

    const moveToMyPost = () => {
        router.push(`/mypost`);
    };

    const moveToMyComment = () => {
        router.push(`/mycomment`);
    };

    const moveToCommunity = (stockname: string) => {
        router.push(`/community/${stockname}`);
    };

    return (
        <div className='px-8 max-w-512 mx-auto'>
            <div className='lg:flex lg:gap-[2.4rem] lg:mt-[1.6rem]'>
                <div className='space-y-[1.6rem] lg:w-[40%]'>
                    <div className='p-[1.6rem] justify-center items-center rounded-[1.6rem] border border-solid border-moneed-gray-5'>
                        <div className='flex justify-center'>
                            <div className='rounded-full overflow-hidden aspect-square w-[5.6rem]'>
                                <img src='/temp/sample3.png' alt='' className='w-full h-full object-cover' />
                            </div>
                        </div>
                        <div className='flex gap-4 justify-center items-center'>
                            <div className='text-[2rem] my-[.8rem] font-bold leading-[145%] text-moneed-brand'>
                                내가본나의 피드
                            </div>
                            <div className='aspect-square w-[2.4rem] cursor-pointer' onClick={moveToMyProfile}>
                                <img src='/icon/icon-setting.svg' alt='' className='w-full h-full' />
                            </div>
                        </div>
                        <div className='text-center text-[1.4rem] font-normal leading-[145%] text-moneed-gray-7'>
                            연동된 계정: 카카오
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-x-[1.6rem] pb-[1.6rem]'>
                        <MypageBox menu='내가 작성한 게시글' count={5} onClick={moveToMyPost}></MypageBox>
                        <MypageBox menu='내가 작성한 댓글' count={7} onClick={moveToMyComment}></MypageBox>
                    </div>
                </div>
                <div className='flex flex-col gap-[1.6rem] flex-1'>
                    <div className='p-[1.6rem] justify-center items-center rounded-[1.6rem] border border-solid bg-moneed-black-3 border-moneed-gray-5'>
                        <div className='flex mb-[1.6rem] justify-between'>
                            <h2 className='text-[2rem] font-semibold leading-[140%]'>내가 선택한 종목</h2>
                            <div className='aspect-square w-[2.4rem]'>
                                <img src='/icon/icon-addcircle.svg' alt='' className='w-full h-full' />
                            </div>
                        </div>
                        <div className='space-y-[.8rem]'>
                            {selectedStocks?.map(({ id, name }) => (
                                <MyStockBox key={id} name={name} onClick={() => moveToCommunity(name)} />
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center sm:ml-auto sm:mr-0 ml-auto mr-auto gap-x-[1.6rem]'>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
