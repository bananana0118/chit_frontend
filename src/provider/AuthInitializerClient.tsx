'use client';

import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

export default function AuthInitializerClient({ accessToken }: { accessToken: string | null }) {
  const { setAccessToken, setLogin } = useAuthStore((state) => state);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
      setLogin(true);
    } else {
      setAccessToken(null);
      setLogin(false);
    }
  }, [accessToken, setAccessToken, setLogin]);

  return null;
}
