'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useSnackBarStore from '@/store/useSnackBarStore';

export default function SnackBar() {
    const { message, icon, position, type, isVisible, hideSnackBar } = useSnackBarStore();
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPortalRoot(document.getElementById('portal-root') || document.body);
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                hideSnackBar();
            }, 2000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, hideSnackBar]);

    let backgroundColor = '';
    let textColor = '';

    if (type === 'normal') {
        backgroundColor = 'bg-(--moneed-gray-7)';
        textColor = 'text-(--moneed-white)';
    } else if (type === 'action') {
        backgroundColor = 'bg-(--moneed-blue-light)';
        textColor = 'text-(--moneed-blue)';
    } else if (type === 'cancel') {
        backgroundColor = 'bg-(--moneed-red-light)';
        textColor = 'text-(--moneed-red)';
    }

    if (!portalRoot) return null;

    return isVisible
        ? ReactDOM.createPortal(
              <div className='flex items-center justify-center'>
                  <div
                      className={`fixed z-150 flex h-16 py-[.8rem] w-[90%] max-w-292 rounded-2xl opacity-97 shadow-[0px_2px_8px_rgba(0,0,0,0.25)] items-center justify-center 
            ${position === 'top' ? 'top-16 animate-snackbar-top' : 'bottom-28 animate-snackbar-bottom'}
            ${backgroundColor}`}
                  >
                      <div className='flex gap-[.8rem]'>
                          {icon && (
                              <div className='overflow-hidden aspect-square w-[1.8rem]'>
                                  <img src={icon} alt='' className='w-full h-full object-cover' />
                              </div>
                          )}
                          <p className={`text-[1.4rem] font-semibold ${textColor}`}>{message}</p>
                      </div>
                  </div>
              </div>,
              portalRoot,
          )
        : null;
}
