'use client';

import useLogout from '@/hooks/useLogout';
import { refreshAccessToken } from '@/services/common/common';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthInitializerClient({ refreshToken }: { refreshToken: string | null }) {
  const resetLocal = useLogout();
  const { setAccessToken, setLogin, isLogin, role } = useAuthStore((state) => state);
  const [bootstrapped, setBootstrapped] = useState(false);
  const router = useRouter();
  //새로고침시에 불러오기
  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        if (refreshToken && !isLogin) {
          const res = await refreshAccessToken();
          console.log('res Debug, bootstrap', res);
          if (res.status === 200) {
            const accessToken = res.data;
            if (accessToken) {
              setLogin(true);
              setAccessToken(accessToken);
            } else {
              console.log('hit2');
              resetLocal();
              if (role === 'STREAMER') router.push('/');
              else {
                router.push('error');
              }
            }
          } else {
            console.log('hit1');
            resetLocal();
          }
        }
      } catch (error) {
        console.log('auth bootstrapFaild', error);
        resetLocal();
      } finally {
        setBootstrapped(true);
      }
    };

    restoreAuthState();
  }, [setAccessToken, resetLocal, refreshToken, setLogin]);
  if (!bootstrapped) return <div>부트스트랩중</div>;

  return null;
}
