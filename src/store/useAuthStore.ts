import { create } from 'zustand';

interface IAuthState {
    accessToken: string | null;
}

interface IAuthActions {
    setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<IAuthState & IAuthActions>()(set => ({
    // TODO: UserInfo 저장 필요 (로그인 시 저장, 로그아웃 시 삭제) (UserStore와 연동이 가능한가?)
    accessToken: null,
    setAccessToken: (accessToken: string) => {
        set({ accessToken });
    },
}));

export default useAuthStore;
