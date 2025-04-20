import { STORAGE_KEYS } from '@/constants/urls';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type RoleType = 'VIEWER' | 'STREAMER';

interface AuthState {
  isLogin: boolean;
  role: RoleType;
  isRehydrated: boolean; // 상태가 로드 완료되었는지 여부 추가
  accessToken: string | null;
  sessionCode: string;
}

type AuthAction = {
  setAccessToken: (authData: string | null) => void;
  setLogin: (authData: boolean) => void;
  setRole: (role: RoleType) => void;
};

//일단 persist 처리

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        isLogin: false,
        isRehydrated: false,
        role: 'VIEWER',
        sessionCode: '',
        setAccessToken: (value: string | null) =>
          set(
            () => ({
              accessToken: value,
            }),
            false,
            'auth/setAccessToken',
          ),
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
        name: STORAGE_KEYS.AuthStorageKey,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          role: state.role,
          isLogin: state.isLogin,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isRehydrated = true; // 로드 완료 플래그 설정
          }
        },
      },
    ),
    {
      anonymousActionType: STORAGE_KEYS.AuthStorageKey,
      enabled: true,
      name: STORAGE_KEYS.AuthStorageKey,
    },
  ),
);

export default useAuthStore;
