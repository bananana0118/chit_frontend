'use client';

import BtnWithChildren from '@/components/atoms/button/BtnWithChildren';
import Live from '@/components/atoms/label/Live';
import OFF from '@/components/atoms/label/Off';
import CategoryText from '@/components/atoms/text/CategoryText';
import RefreshText from '@/components/atoms/text/RefreshText';
import StreamerTextComment from '@/components/atoms/text/StreamerTextComment';
import StreamerTextLive from '@/components/atoms/text/StreamerTextLive';
import useChannelStore from '@/store/channelStore';
import useAuthStore from '@/store/store';
import Image from 'next/image';

export default function Home() {
  const { setRole } = useAuthStore();
  const streamerInfo = useChannelStore((state) => state.streamerInfo);
  console.log(streamerInfo);
  const onClickLogin = async () => {
    window.location.href = 'http://localhost:8080/api/v1/oauth2';
    setRole('STREAMER');
  };

  return (
    streamerInfo && (
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <section className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="mb-10 flex flex-col items-center justify-center gap-2">
            <StreamerTextLive isLive={streamerInfo.status}></StreamerTextLive>
            <StreamerTextComment
              isLive={streamerInfo.status}
            ></StreamerTextComment>
          </div>
          <Image
            src={streamerInfo.channel.channelImageUrl || '/tempImage.png'}
            width={128}
            height={128}
            alt="profile"
            className={`${streamerInfo.status === 'OPEN' ? 'shadow-inset-primary' : 'shadow-inset-disable'} overflow-hidden rounded-full p-[3px]`}
          />

          <div className="mt-3 flex flex-row items-center justify-center">
            {streamerInfo.status === 'OPEN' ? <Live /> : <OFF />}
            <div className="text-bold-large">
              {streamerInfo.channel.channelName}
            </div>
          </div>
          {streamerInfo.status === 'OPEN' ? (
            <CategoryText
              category={streamerInfo.liveCategoryValue || ''}
            ></CategoryText>
          ) : (
            <RefreshText />
          )}
        </section>
        <BtnWithChildren onClickHandler={onClickLogin}>
          시참 등록 생성할래요
        </BtnWithChildren>
      </div>
    )
  );
}
