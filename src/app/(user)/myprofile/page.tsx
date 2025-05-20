'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import SelectProfileImage from '@/components/Mypage/SelectProfileImage';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
    const router = useRouter();
    const [nickname, setNickname] = useState('');
    const [showProfileImage, setShowProfileImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState('/temp/sample3.png'); // 기본 이미지

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleSubmitNickname = () => {
        console.log('닉네임 저장:', nickname);
        console.log('선택된 이미지:', selectedImage);
    };

    const handleClickEditProfile = () => {
        setShowProfileImage(prev => !prev);
    };

    const cancelChangeProfile = () => {
        router.back();
    };

    const handleImageSelect = (img: string) => {
        setSelectedImage(img);
        setShowProfileImage(false);
    };

    return (
        <div className='w-full max-w-[480px] px-6 mx-auto'>
            <div className='flex justify-center items-center rounded-full aspect-square w-56 mx-auto mt-24 relative'>
                <img src={selectedImage} alt='Selected Profile' className='w-full h-full object-cover rounded-full' />
                <div
                    onClick={handleClickEditProfile}
                    className='absolute bottom-[0rem] right-2 bg-(--moneed-white) border border-solid border-(--moneed-gray-5) rounded-full p-[0.6rem] cursor-pointer '
                >
                    <img src='/icon/icon-edit-profile.svg' alt='Edit Profile' className='w-full h-full object-cover' />
                </div>
            </div>

            {showProfileImage && <SelectProfileImage onSelect={handleImageSelect} />}

            <div>
                <div className='text-[1.6rem] font-normal leading-[140%] text-(--moneed-black) mt-[6.9rem]'>
                    닉네임
                </div>
                <input
                    value={nickname}
                    onChange={handleNicknameChange}
                    className='bg-(--moneed-gray-4) text-[1.6rem] rounded-[1.2rem] px-[2.4rem] py-[.8rem] h-[5.4rem] w-full'
                />
            </div>

            <div>
                <li className='text-[1.4rem] font-normal leading-[140%] text-(--moneed-gray-7) mt-[.8rem]'>
                    닉네임은 2-10자까지 입력하실 수 있습니다.
                </li>
                <li className='text-[1.4rem] font-normal leading-[140%] text-(--moneed-gray-7)'>
                    한번 수정된 닉네임은 30일 뒤에 변경이 가능합니다.
                </li>
            </div>

            <div className='pt-24 flex justify-between'>
                <Button
                    onClick={cancelChangeProfile}
                    theme='secondary'
                    textcolor='secondary'
                    className='border border-solid border-(--moneed-gray-6) text-[1.6rem] font-bold leading-[140%] px-[2.4rem] py-[1.8rem]'
                >
                    취소
                </Button>
                <Button
                    onClick={handleSubmitNickname}
                    theme='primary'
                    textcolor='primary'
                    className='text-[1.6rem] font-bold leading-[140%] px-58 py-[1.8rem]'
                >
                    저장하기
                </Button>
            </div>
        </div>
    );
};

export default MyProfile;
