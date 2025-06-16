import { create } from 'zustand';

export type SnackBarType = 'normal' | 'action' | 'caution';

interface SnackBarState {
    message: string;
    icon?: string;
    position: 'top' | 'bottom';
    type: SnackBarType;
    isVisible: boolean;
    showSnackBar: (message: string, type: SnackBarType, position: 'top' | 'bottom', icon?: string) => void;
    hideSnackBar: () => void;
}

const useSnackBarStore = create<SnackBarState>(set => ({
    message: '',
    icon: undefined,
    position: 'bottom',
    type: 'normal',
    isVisible: false,
    showSnackBar: (message, type, position, icon) => set({ isVisible: true, message, type, position, icon }),
    hideSnackBar: () => set({ isVisible: false }),
}));

export default useSnackBarStore;
