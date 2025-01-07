'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommonLayout from '../../components/layout/CommonLayout';
import useChannelStore from '@/app/store/channelStore';
import axios from 'axios';
import useAuthStore from '@/app/store/store';

export default function Page() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const channelId = useChannelStore((state) => state.channelId);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setLogin = useAuthStore((state) => state.setLogin);
  const router = useRouter();

  // 로그인의 경우의 수는 두가지
  //1. 홈으로 접속 로그인 후 바로 콜백페이지
  //2. 시청자로 링크타고 온 경우 (시청자는 별도의 ?파라미터 필요할듯)
  //1-2. 1의 경우 code와 state로 바로 대기 화면으로 이동시키면 됨
  //2-2. 2의 경우 1. 채널id와, role을 뽑아내어 리다이렉트 시켜야함 (channelId는 이미 페이지에 접속할 때 담겨있음)
  //*channelId 가 없을경우 기본 ""

  useEffect(() => {
    const onCompleteChannelId = async (channelId?: string | string[]) => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/v1/oauth2/login',
          {
            code: code,
            state: state,

            //todo  viewerChannelId 원래 이코드
            channelId: '',
          },
        );

        const { data, status } = response;

        if (status === 200) {
          setAccessToken(data.data);
          setLogin(true);

          if (channelId) {
            router.push(`/${channelId}`); //2번 케이스 채널 id가 있을 경우
          } else {
            router.push(`/`); //1번 케이스
          }
        }
      } catch (error) {
        //todo 추후 api 타입 지정해줄것
        if (axios.isAxiosError(error)) {
          const { response } = error; // Axios 에러 객체에서 response 추출
          if (response?.status === 400) {
            alert(
              `오류가 발생했습니다. : ${response.data?.error || '알 수 없는 오류'}`,
            );
            router.push('error');
          } else {
            alert('예상치 못한 오류가 발생했습니다.');
            router.push('error');
          }
        }
      }
    };

    if (code && state) {
      setIsRedirecting(true);
      onCompleteChannelId(channelId);
    }
  }, [code, state, channelId, setAccessToken, setLogin, router]);

  if (!code && state) {
    return (
      <CommonLayout>
        <div>재로그인이 필요합니다.</div>
        <button onClick={() => (window.location.href = '/login')}>
          로그인 하러 가기
        </button>
      </CommonLayout>
    );
  }

  return (
    <CommonLayout>
      {isRedirecting ? <div>잠시만 기다려 주세요...</div> : null}
    </CommonLayout>
  );
}
