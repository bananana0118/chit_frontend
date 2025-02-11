import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type RoleType = 'VIEWER' | 'STREAMER';

interface AuthState {
  isLogin: boolean;
  role: RoleType;
  isRehydrated: boolean; // 상태가 로드 완료되었는지 여부 추가
  accessToken: string;
  sessionCode: string;
}

type AuthAction = {
  setAccessToken: (authData: string) => void;
  setLogin: (authData: boolean) => void;
  setRole: (role: RoleType) => void;
};

//일단 persist 처리리
export const AuthStorageKey = 'auth-session-storage';

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        accessToken: '',
        isLogin: false,
        isRehydrated: false,
        role: 'VIEWER',
        sessionCode: '',
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
          role: state.role,
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
