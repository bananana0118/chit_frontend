'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useChannelStore from '@/store/channelStore';
import useAuthStore from '@/store/authStore';
import useContentsSessionStore from '@/store/sessionStore';
import CommonLayout from '@/components/layout/CommonLayout';
import { login } from '@/services/auth/auth';
import { isErrorResponse } from '@/lib/handleErrors';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const sessionCode = useContentsSessionStore((state) => state.sessionInfo?.sessionCode);
  const isRehydrated = useAuthStore((state) => state.isRehydrated);
  const { setChannelId, channelId } = useChannelStore((state) => state);
  const { setLogin, setAccessToken } = useAuthStore((state) => state);

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!code || !state || !isRehydrated) return;

    const loginAndRedirect = async () => {
      setIsRedirecting(true);

      const response = await login({
        code: code,
        state: state,
      }).then((res) => {
        router.refresh();
        return res;
      });

      if (isErrorResponse(response)) {
        setIsRedirecting(false);
        return;
      }

      const { accessToken, channelId: newChannelId } = response;
      setAccessToken(accessToken);
      setChannelId(newChannelId);

      const targetUrl = newChannelId && sessionCode ? `/${newChannelId}/${sessionCode}` : '/';

      router.replace(targetUrl); //2번 케이스 채널 id가 있을 경우
    };

    loginAndRedirect();
  }, [
    code,
    state,
    channelId,
    setLogin,
    router,
    isRehydrated,
    sessionCode,
    setAccessToken,
    setChannelId,
  ]);

  if (!code && !state) {
    return (
      <CommonLayout>
        <div>재로그인이 필요합니다.</div>
        <button onClick={() => (window.location.href = '/login')}>로그인 하러 가기</button>
      </CommonLayout>
    );
  }

  return <CommonLayout>{isRedirecting ? <div>잠시만 기다려 주세요...</div> : null}</CommonLayout>;
}
