'use client';
import BtnWithChildren from '@/app/components/atoms/button/BtnWithChildren';
import Input from '@/app/components/atoms/input/Input';
import ViewerPageLayout from '@/app/components/layout/ViewerPageLayout';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AlertIcon from '@/app/assets/icons/AlertIcon';
import Image from 'next/image';
import ViewerGuide from '@/app/assets/imgs/ViewerGuide.png';
import useAuthStore from '@/app/store/store';
import { loginWithOAuth2 } from '@/app/services/auth/auth';

export default function SignUp() {
  const [viewerChannelId, setViewerChannelId] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewerChannelId(e.target.value);
  };
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setLogin = useAuthStore((state) => state.setLogin);

  const onCompleteChannelId = async () => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      alert('코드 또는 상태 값이 누락되었습니다.');
      router.push('error');
      return;
    }

    try {
      const response = await loginWithOAuth2({ code, state, channelId: '' }); // 서비스 호출
      setAccessToken(response.accessToken); // 액세스 토큰 저장
      setLogin(true); // 로그인 상태 업데이트
      router.push('participation'); // 성공 시 리다이렉트
    } catch (error: any) {
      alert(error.message || '오류가 발생했습니다.');
      router.push('error'); // 실패 시 에러 페이지로 리다이렉트
    }
  };

  return (
    <ViewerPageLayout>
      <div className="flex w-full flex-1 flex-col items-start">
        <section className="mb-5 w-full">
          <div className="mb-5 w-full text-bold-middle">
            <p>시참에 들어가기 전에</p>
            <p>한 가지 정보가 필요해요!</p>
          </div>
          <p className="mb-2 text-bold-small">
            <span className="text-primary">치지직 채널 ID</span>를 알려주세요
          </p>
          <Input
            type="text"
            name="viewerChannelId"
            placeholder="치치직 채널 ID를 입력해주세요"
            onChange={onChangeInput}
            value={viewerChannelId}
          />
        </section>
        <section>
          <div className="flex flex-row items-center text-medium-large text-alert">
            <AlertIcon width={16} height={13} className="mr-1" />
            채널 ID가 뭐에요?
          </div>
          <p className="mb-2 text-medium-small">
            &lsquo;내 채널&rsquo;의 URL에서 맨 뒤쪽에 있는 글자들이에요!
          </p>
          <Image
            src={ViewerGuide}
            width={317}
            height={33}
            alt="viewerGuide"
            unoptimized
          ></Image>
        </section>
      </div>
      {/* todo : state에 따라 닉네임 상태 분리하기  */}
      <BtnWithChildren
        onClickHandler={onCompleteChannelId}
        type={viewerChannelId.length > 0 ? 'default' : 'disable'}
      >
        제 채널 ID 다 입력했어요
      </BtnWithChildren>
    </ViewerPageLayout>
  );
}
