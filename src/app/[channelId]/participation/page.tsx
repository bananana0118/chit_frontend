'use client';

import BtnWithChildren from '@/app/components/atoms/button/BtnWithChildren';
import Input from '@/app/components/atoms/input/Input';
import CategoryText from '@/app/components/atoms/text/CategoryText';
import HintText from '@/app/components/atoms/text/HintText';
import ViewerPageLayout from '@/app/components/layout/ViewerPageLayout';
import useChannelStore from '@/app/store/channelStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Settings() {
  const [viewerNickname, setViewerNickname] = useState('');
  const router = useRouter();
  const streamerInfo = useChannelStore((state) => state.streamerInfo);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewerNickname(e.target.value);
  };

  const onCompleteViewerNickname = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/contents-session/viewer/subscribe`,
        {
          //todo  sessionParticipationCode 원래 이코드
          sessionParticipationCode: '',
          gameNickname: viewerNickname,
        },
      )
      .then(({ status }) => {
        if (status === 200) {
          router.push('waiting');
        }
      })
      .catch(({ status, error }) => {
        if (status === 400) {
          alert(`오류가 발생했습니다. : ${error}`);
          router.push(`error`);
        }
      });
  };

  return (
    <ViewerPageLayout>
      <section className="flex w-full flex-1 flex-col items-start">
        <div className="mb-8">
          <CategoryText
            isMiddle={true}
            category={streamerInfo?.liveCategoryValue || ''}
          />
          <div className="text-bold-small">처음 참여하시는 게임이네요!</div>
        </div>
        <div className="mb-5 w-full">
          <div className="mb-12 w-full text-bold-middle">
            <p>
              <span className="text-secondary">게임 닉네임</span>을 알려주시면
            </p>
            <p>스트리머에게 전달해드릴게요:)</p>
            <HintText>
              닉네임은 스트리머에게만 보여지며, 다른 목적으로 활용하지 않아요
            </HintText>
          </div>
          <Input
            type="text"
            onChange={onChangeInput}
            name="gameNickname"
            placeholder="여기에 게임닉네임을 입력해 주세요"
          />
          <HintText>* 등록한 닉네임은 나중에 수정할 수 있어요</HintText>
        </div>
      </section>
      {/* todo : state에 따라 닉네임 상태 분리하기  */}
      <BtnWithChildren
        onClickHandler={onCompleteViewerNickname}
        type={viewerNickname.length > 0 ? 'default' : 'disable'}
      >
        닉네임 다 입력했어요
      </BtnWithChildren>
    </ViewerPageLayout>
  );
}
