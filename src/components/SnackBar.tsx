import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useSnackBarStore from '../store/useSnackBarStore';

export default function SnackBar() {
    const { message, icon, position, type, isVisible, hideSnackBar } = useSnackBarStore();

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
        backgroundColor = 'bg-[--moneed-gray-7]';
        textColor = 'text-[--moneed-white]';
    } else if (type === 'action') {
        backgroundColor = 'bg-[--moneed-blue-light]';
        textColor = 'text-[--moneed-blue]';
    } else if (type === 'cancel') {
        backgroundColor = 'bg-[--moneed-red-light]';
        textColor = 'text-[--moneed-red]';
    }

    const portalRoot = document.getElementById('portal-root') || document.body;

    return isVisible
        ? ReactDOM.createPortal(
              <div className='flex items-center justify-center'>
                  <div
                      className={`fixed z-[150] flex h-[4rem] py-[.8rem] w-[90%] max-w-[73rem] rounded-[1rem] opacity-[97%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)] items-center justify-center 
            ${position === 'top' ? 'top-[4rem] animate-snackbar-top' : 'bottom-[7rem] animate-snackbar-bottom'}
            ${backgroundColor}`}
                  >
                      <div className='flex gap-[.8rem]'>
                          {icon && (
                              <div className='overflow-hidden aspect-[1/1] w-[1.8rem]'>
                                  <img src={icon} alt='' className='w-full h-full object-cover' />
                              </div>
                          )}
                          <p className={`text-[1.4rem] font-[600] ${textColor}`}>{message}</p>
                      </div>
                  </div>
              </div>,
              portalRoot,
          )
        : null;
}
