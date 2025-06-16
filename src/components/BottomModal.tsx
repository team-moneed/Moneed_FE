'use client';

import { ReactElement, useEffect, useState } from 'react';
import Button from './Button';
import ReactDOM from 'react-dom';

type BottomModalProps = {
    imageSrc?: string;
    title?: string;
    description?: ReactElement;
    ButtonText?: string;
    onButtonClick?: () => void;
    onClose?: () => void;
};

const BottomModal = ({ imageSrc, title, description, ButtonText, onButtonClick, onClose }: BottomModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleOutsideClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
    };

    const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <>
            <div
                onClick={handleOutsideClick}
                className={`fixed inset-0 bg-gray-900/50 z-50 flex items-end justify-center transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div
                    onClick={handleInsideClick}
                    className={`bg-white w-200 h-176 rounded-lg p-6 shadow-lg transform transition-transform duration-300 ${
                        isVisible ? 'translate-y-0' : 'translate-y-full'
                    }`}
                >
                    {imageSrc && (
                        <img src={imageSrc} alt='모달 이미지' className='w-48 aspect-square  mb-[.8rem] mx-auto' />
                    )}

                    {title && (
                        <h2 className='text-[2.4rem] text-center text-moneed-black font-bold leading-[140%]'>
                            {title}
                        </h2>
                    )}

                    {description && (
                        <div className='text-[1.6rem] text-center text-moneed-black font-semibold leading-[140%] mt-[3.8rem]'>
                            {description}
                        </div>
                    )}

                    <div className='mt-[2.4rem] flex justify-center'>
                        <Button
                            theme='primary'
                            textcolor='primary'
                            className='text-[1.6rem] font-bold leading-[140%] px-58 py-[1.8rem]'
                            onClick={onButtonClick}
                        >
                            {ButtonText}
                        </Button>
                    </div>
                </div>
            </div>
        </>,
        document.body,
    );
};

export default BottomModal;
