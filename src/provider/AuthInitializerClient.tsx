'use client';

import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

export default function AuthInitializerClient({ accessToken }: { accessToken: string | null }) {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken, setAccessToken]);

  return null;
}
