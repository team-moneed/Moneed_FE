import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MobileNavType = {
    className?: string;
    active?: boolean;
    icon?: string;
    activeIcon?: string;
    to: string;
    children?: ReactNode;
};

const MobileNavLink = ({ className, icon, activeIcon, to, children }: MobileNavType) => {
    const pathname = usePathname();
    const active = pathname === to;

    return (
        <Link
            href={to}
            className={`flex flex-col justify-center items-center gap-[.3rem] text-[1rem] flex-1 ${
                active ? 'text-(--moneed-black)' : 'text-(--moneed-gray-6)'
            } ${className}`}
        >
            {icon ? (
                <img src={active ? activeIcon || icon : icon} alt='icon' className='w-[2.4rem] h-[2.4rem]' />
            ) : (
                icon
            )}
            {children}
        </Link>
    );
};
export default MobileNavLink;
