import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type RoleType = 'VIEWER' | 'STREAMER';

interface AuthState {
  isLogin: boolean;
  role: RoleType;
  accessToken: string;
}

type AuthAction = {
  setAccessToken: (authData: string) => void;
  setLogin: (authData: boolean) => void;
  setRole: (role: RoleType) => void;
};

//일단 persist 처리리
export const AuthStorageKey = 'auth-session-storage';

const useAuthStore = create(
  devtools(
    persist<AuthState & AuthAction>(
      (set) => ({
        accessToken: '',
        isLogin: false,
        role: 'VIEWER',
        setAccessToken: (value: string) =>
          set(() => ({
            accessToken: value,
          })),
        setLogin: (value: boolean) =>
          set(() => ({
            isLogin: value,
          })),
        setRole: (value: RoleType) =>
          set(() => ({
            role: value,
          })),
      }),
      {
        name: AuthStorageKey,
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: (state) => console.log(state),
      },
    ),
    { anonymousActionType: 'authStore', enabled: true, name: 'authStore' },
  ),
);

export default useAuthStore;
