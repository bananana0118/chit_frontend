'use client';
import CopyIcon from '@/app/assets/icons/CopyIcon';
import BtnWithChildren from '@/app/components/atoms/button/BtnWithChildren';
import Live from '@/app/components/atoms/label/Live';
import OFF from '@/app/components/atoms/label/Off';
import ViewerPageLayout from '@/app/components/layout/ViewerPageLayout';
import useChannelStore from '@/app/store/channelStore';
import Image from 'next/image';
import { useEffect } from 'react';
import useAuthStore from '@/app/store/store';

export default function Page() {
  const streamerInfo = useChannelStore((state) => state.streamerInfo);
  const channel = streamerInfo?.channel;
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    streamerInfo && (
      <ViewerPageLayout>
        <section className="flex flex-row justify-start">
          <Image
            src={channel?.channelImageUrl || '/tempImage.png'}
            width={64}
            height={64}
            alt="profile"
            className={`${streamerInfo.status === 'OPEN' ? 'shadow-inset-primary' : 'shadow-inset-disable'} overflow-hidden rounded-full p-[3px]`}
          />
          <div className="ml-2 flex flex-col items-start justify-center">
            {streamerInfo.status === 'OPEN' ? <Live /> : <OFF />}
            <div className="text-bold-large">
              {streamerInfo.channel.channelName}
            </div>
          </div>
        </section>
        <section className="mt-5 flex w-full flex-col items-start">
          <div className="text-bold-small">
            <span className="text-secondary">참여 코드</span>를 입력해서 게임에
            참여해주세요
          </div>
          <div className="mt-1 flex flex-row items-center justify-center text-bold-large">
            임시 참여코드
            <CopyIcon width={16} height={16} className="ml-2"></CopyIcon>
          </div>
        </section>
        {/* 나중에 1번 2번 3버 이런식으로 할 것 */}
        <section className="flex w-full flex-1 flex-col items-center justify-center">
          <p className="text-bold-large">내 순서는</p>
          <p className="flex flex-row items-center justify-center text-bold-big text-primary">
            지금 참여
          </p>
        </section>
        <section className="flex w-full items-center justify-center">
          <div className="m-5 text-bold-middle">
            스트리머가 당신을 찾고있어요! 🎉
          </div>
        </section>
        <BtnWithChildren type={'alert'}>이제 시참 그만할래요</BtnWithChildren>
      </ViewerPageLayout>
    )
  );
}
