import MobileNavLink from '../MobileNavLink';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const motetowritepost = () => {
        const lastPathSegment = location.pathname.split('/').pop();

        if (location.pathname.startsWith('/community/')) {
            if (lastPathSegment && decodeURIComponent(lastPathSegment) !== '전체') {
                navigate(`/writepost/${lastPathSegment}`);
            } else {
                navigate(`/writepost`);
            }
        } else {
            navigate(`/writepost`);
        }
    };

    return (
        <>
            <div className='flex fixed bottom-0 left-0 right-0 z-[10] pt-[.6rem] pb-4 px-8 bg-[var(--moneed-gray-3)] lg:hidden'>
                <MobileNavLink to='/' icon='/icon/icon-m-nav-1.svg' activeIcon='/icon/icon-lnb-1-on.svg'>
                    홈페이지
                </MobileNavLink>
                <MobileNavLink to='/shortform' icon='/icon/icon-m-nav-2.svg' activeIcon='/icon/icon-lnb-2-on.svg'>
                    숏폼
                </MobileNavLink>
                <MobileNavLink to='/community' icon='/icon/icon-m-nav-3.svg' activeIcon='/icon/icon-lnb-3-on.svg'>
                    커뮤니티
                </MobileNavLink>
                <MobileNavLink to='/mypage' icon='/icon/icon-lnb-4.svg' activeIcon='/icon/icon-lnb-4-on.svg'>
                    내프로필
                </MobileNavLink>

                <button
                    type='button'
                    onClick={motetowritepost}
                    className='aspect-[1/1] w-[5.2rem] bg-[var(--moneed-brand-color)] absolute bottom-[calc(100%+2rem)] flex items-center justify-center rounded-full right-[2rem]'
                >
                    <img src='/icon/icon-edit.svg' alt='' />
                </button>
            </div>
        </>
    );
};

export default MobileNav;
