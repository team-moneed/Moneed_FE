'use client';

import { ReactNode, useEffect, useRef } from 'react';

type DropdownProps = {
    children?: ReactNode;
    onClose: () => void;
};

const Dropdown = ({ children, onClose }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return <div ref={dropdownRef}>{children}</div>;
};

export type PrimaryDropdownProps = {
    dropdownMenus: { text: string; icon: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }[];
    closeDropdown: () => void;
};

export const PrimaryDropdown = ({ dropdownMenus, closeDropdown }: PrimaryDropdownProps) => {
    return (
        <div className='relative z-2 pointer-events-auto'>
            <Dropdown onClose={closeDropdown}>
                <div className='absolute top-0 right-10 z-50 bg-white shadow-custom rounded-[.8rem]'>
                    <div className='px-[4.4rem] py-[3.6rem]'>
                        {dropdownMenus.map(menu => (
                            <button
                                key={menu.text}
                                type='button'
                                className='cursor-pointer flex items-center mb-[2.4rem] whitespace-nowrap'
                                onClick={menu.onClick}
                            >
                                <div className='overflow-hidden aspect-square w-[1.8rem] mr-[.6rem] '>
                                    <img src={menu.icon} alt={menu.text} className='w-full h-full object-cover' />
                                </div>
                                <div>{menu.text}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </Dropdown>
        </div>
    );
};
export default Dropdown;
