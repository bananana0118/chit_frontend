'use client';

import BtnWithChildren from './components/atoms/button/BtnWithChildren';
import CommonLayout from './components/layout/CommonLayout';
import useAuthStore from './store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Live from './components/atoms/label/Live';
import OFF from './components/atoms/label/Off';
import CategoryText from './components/atoms/text/CategoryText';
import RefreshText from './components/atoms/text/RefreshText';
import StreamerTextComment from './components/atoms/text/StreamerTextComment';
import StreamerTextLive from './components/atoms/text/StreamerTextLive';
import useChannelStore from './store/channelStore';
import Image from 'next/image';
import { postStreamerInfo, StreamerInfo } from './services/streamer/streamer';
import DummyData from './constants/Dummy';

export default function Home() {
  const router = useRouter();
  const setRole = useAuthStore((state) => state.setRole);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isRehydrated = useAuthStore((state) => state.isRehydrated);
  const [streamerInfo, setStateStreamerInfo] = useState<StreamerInfo | null>(
    null,
  );
  const setChannelId = useChannelStore((state) => state.setChannelId);
  const setStreamerInfo = useChannelStore((state) => state.setStreamerInfo);
  console.log(streamerInfo);
  const onClickCreateSession = () => {
    router.push('/streamer/settings');
  };

  useEffect(() => {
    console.log('access', accessToken);
    const fetchData = async () => {
      const dummyChannelId = DummyData.channelId;
      const response = await postStreamerInfo(dummyChannelId);
      if (response) {
        setStateStreamerInfo(response);
        setChannelId(response.channel.channelId);
        setStreamerInfo(response);
      }
    };

    if (isRehydrated) {
      if (!accessToken) {
        setRole('STREAMER');
        router.push('/login');
      } else {
        fetchData();
      }
    }
  }, [accessToken, isRehydrated]);

  // 로드가 완료될 때까지 로딩 화면 표시
  if (!isRehydrated) {
    return <div>Loading...</div>;
  }

  return (
    streamerInfo && (
      <CommonLayout>
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
          <BtnWithChildren onClickHandler={onClickCreateSession}>
            시참 등록 생성할래요
          </BtnWithChildren>
        </div>
      </CommonLayout>
    )
  );
}
