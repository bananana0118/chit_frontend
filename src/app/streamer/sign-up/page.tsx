/* eslint-disable @typescript-eslint/no-unused-vars */
//안쓰는 페이지
'use client';

import BtnWithChildren from '@/components/atoms/button/BtnWithChildren';
import CommonLayout from '@/components/layout/CommonLayout';
import useAuthStore from '@/store/store';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Input } from 'postcss';
import { useState } from 'react';

export default function Home() {
  const [streamerChannelId, setStreamerChannelId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerify, setIsVerify] = useState(true); //todo 추후 변경할 것

  const searchParams = useSearchParams();
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setLogin = useAuthStore((state) => state.setLogin);

  const onCompleteChannelId = () => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    axios
      .post('http://localhost:8080/api/v1/oauth2/login', {
        code: code,
        state: state,

        //todo  viewerChannelId 원래 이코드
        channelId: '',
      })
      .then(({ data, status }) => {
        if (status === 200) {
          setAccessToken(data.data);
          setLogin(true);
          router.push('participation');
        }
      })
      .catch(({ status, error }) => {
        if (status === 400) {
          alert(`오류가 발생했습니다. : ${error}`);
          router.push(`error`);
        }
      });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreamerChannelId(e.target.value);
  };

  const onChangeVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  return (
    <CommonLayout>
      <div className="flex h-full w-full flex-1 flex-col items-center">
        <section className="mb-5 w-full">
          <div className="mb-5 w-full text-bold-middle">
            <p>
              <span className="text-primary">스트리머</span> 확인을 위해
            </p>
            <p>두가지 정보가 필요해요</p>
          </div>
          <p className="mb-2 text-bold-small">
            <span className="text-primary">치지직 채널 ID</span>를 알려주세요
          </p>
          <Input
            type="text"
            name="streamerChannelId"
            placeholder="치치직 채널 ID를 입력해주세요"
            onChange={onChangeInput}
            value={streamerChannelId}
          />
        </section>
        <section className="mt-10 w-full">
          <p className="mb-2 text-bold-small">
            전달드렸던 <span className="text-primary">메뉴얼</span>에 있는{' '}
            <span className="text-primary">인증코드</span>를 알려주세요
          </p>
          <Input
            type="text"
            name="viewerChannelId"
            placeholder="메뉴얼 인증코드를 입력해주세요"
            onChange={onChangeVerificationCode}
            value={verificationCode}
          />
        </section>
      </div>
      <BtnWithChildren
        onClickHandler={onCompleteChannelId}
        type={isVerify ? 'default' : 'disable'}
      >
        제 채널 ID 다 입력했어요
      </BtnWithChildren>
    </CommonLayout>
  );
}
