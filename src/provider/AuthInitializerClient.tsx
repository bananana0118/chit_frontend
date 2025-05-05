'use client';

import BtnUserProfile from '@/components/atoms/button/BtnUserProfile';
import useLogout from '@/hooks/useLogout';
import useParamsParser from '@/hooks/useParamsParser';
import { refreshAccessToken } from '@/services/common/common';
import useAuthStore from '@/store/authStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthInitializerClient({ refreshToken }: { refreshToken: string | null }) {
  const resetLocal = useLogout();
  const { setAccessToken, setLogin, isLogin } = useAuthStore((state) => state);
  const [bootstrapped, setBootstrapped] = useState(false);
  const { channelId, sessionCode } = useParamsParser();
  const router = useRouter();
  //새로고침시에 불러오기
  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        if (refreshToken && !isLogin) {
          const res = await refreshAccessToken();
          console.log('res Debug, bootstrap', res);
          if (res.success) {
            const accessToken = res.data.data.data;
            if (accessToken) {
              setLogin(true);
              setAccessToken(accessToken);
            } else {
              resetLocal();
              if (channelId && sessionCode) router.push(`/${channelId}/${sessionCode}`);
              else {
                router.push('/');
              }
            }
          } else {
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
  }, []);

  if (!bootstrapped)
    return <Image src="/assets/loading.svg" alt="loading" width="40" height="40"></Image>;
  if (!isLogin) {
    return null;
  }
  return <BtnUserProfile />;
}
