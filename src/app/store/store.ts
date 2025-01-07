import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type RoleType = 'VIEWER' | 'STREAMER';

interface AuthState {
  isLogin: boolean;
  role: RoleType;
  isRehydrated: boolean; // 상태가 로드 완료되었는지 여부 추가
  accessToken: string;
}

type AuthAction = {
  setAccessToken: (authData: string) => void;
  isRehydrated: boolean; // 상태가 로드 완료되었는지 여부 추가
  setLogin: (authData: boolean) => void;
  setRole: (role: RoleType) => void;
};

//일단 persist 처리리
export const AuthStorageKey = 'auth-session-storage';

const useAuthStore = create(
  devtools(
    persist<Partial<AuthState & AuthAction>>(
      (set) => ({
        accessToken: '',
        isLogin: false,
        isRehydrated: false,
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
        partialize: (state) => ({
          accessToken: state.accessToken, // accessToken만 스토리지에 저장
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isRehydrated = true; // 로드 완료 플래그 설정
          }
        },
      },
    ),
    { anonymousActionType: 'authStore', enabled: true, name: 'authStore' },
  ),
);

export default useAuthStore;
