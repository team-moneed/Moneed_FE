'use client';

import { useEffect, useState } from 'react';

export const useKeyboardOffset = () => {
    const [bottomOffset, setBottomOffset] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.visualViewport) {
                const viewportHeight = window.visualViewport.height;
                const documentHeight = document.documentElement.clientHeight;

                const keyboardHeight = documentHeight - viewportHeight;
                setBottomOffset(keyboardHeight > 0 ? keyboardHeight : 0);
            }
        };

        handleResize();
        window.visualViewport?.addEventListener('resize', handleResize);

        return () => {
            window.visualViewport?.removeEventListener('resize', handleResize);
        };
    }, []);

    return bottomOffset;
};
