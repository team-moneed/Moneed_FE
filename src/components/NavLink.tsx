import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/util/style';

type NavLinkType = {
    className?: string;
    active?: boolean;
    icon?: string;
    activeIcon?: string;
    to: string;
    children?: ReactNode;
};

const NavLink = ({ className, icon, activeIcon, to, children }: NavLinkType) => {
    const pathname = usePathname();
    const active = pathname === to;

    return (
        <Link href={to} className={cn('text-[1rem]', active ? 'text-moneed-black' : 'text-moneed-gray-6', className)}>
            {icon ? (
                <img src={active ? activeIcon || icon : icon} alt='icon' className='w-[2.4rem] h-[2.4rem]' />
            ) : (
                icon
            )}
            {children}
        </Link>
    );
};
export default NavLink;
