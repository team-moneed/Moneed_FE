import { useRouter } from 'next/navigation';

export default function Logo() {
    const router = useRouter();

    return (
        <div className='flex items-center gap-[.8rem] z-20 cursor-pointer' onClick={() => router.push('/')}>
            <div className='w-[2.8rem] h-[2.8rem] bg-moneed-black rounded-full flex items-center justify-center'>
                <img className='w-[1.4rem] h-[1.2rem]' src='/icon/icon-logo.svg' alt='moneed logo' />
            </div>
            <span className='font-semibold leading-[140%] text-[1.8rem] ml-[.8rem]'>moneed</span>
        </div>
    );
}
