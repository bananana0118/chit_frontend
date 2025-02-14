'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BtnWithChildren from '../../components/atoms/button/BtnWithChildren';
import Live from '../../components/atoms/label/Live';
import OFF from '../../components/atoms/label/Off';
import CategoryText from '../../components/atoms/text/CategoryText';
import StreamerTextLive from '../../components/atoms/text/StreamerTextLive';
import CommonLayout from '../../components/layout/CommonLayout';
import ViewerPageLayout from '../../components/layout/ViewerPageLayout';
import { postStreamerInfo } from '../../services/streamer/streamer';
import useChannelStore from '../../store/channelStore';
import useAuthStore from '../../store/store';
import useContentsSessionStore from '@/app/store/sessionStore';
import useParamsParser from '@/hooks/useParamsParser';

export default function Home() {
  const router = useRouter();
  const { channelId, sessionCode } = useParamsParser();
  const setRole = useAuthStore((state) => state.setRole);
  const streamerInfo = useChannelStore((state) => state.streamerInfo);
  const setChannelId = useChannelStore((state) => state.setChannelId);
  const setStreamerInfo = useChannelStore((state) => state.setStreamerInfo);
  const setSessionInfo = useContentsSessionStore(
    (state) => state.setSessionInfo,
  );
  const accessToken = useAuthStore((state) => state.accessToken);
  //로그인 되어있는지
  useEffect(() => {
    const fetchData = async (channelId: string) => {
      const DummyChannelId = channelId || '0dad8baf12a436f722faa8e5001c5011';

      // const response = await getStreamerInfo(channelId);
      try {
        const streamerInfo = await postStreamerInfo(DummyChannelId);

        if (streamerInfo === null) {
          alert('channelId가 잘못됐거나 해당 스트리머의 방송 정보가 없습니다.');
          router.push(`/${channelId}/error`);
        } else {
          setChannelId(streamerInfo.channel.channelId);
          setStreamerInfo(streamerInfo);
          if (sessionCode)
            setSessionInfo((prev) => ({
              ...prev,
              sessionCode,
            }));
          console.log(streamerInfo);
        }
      } catch (error) {
        console.log('error가 발생했습니다.', error);
        router.push(`/${channelId}/error`);
      }
    };

    fetchData(channelId as string);
  }, [channelId, setChannelId]);

  const onClickLogin = async () => {
    if (accessToken) {
      router.push(`${sessionCode}/participation`);
    } else {
      window.location.href = 'http://localhost:8080/';
    }
    setRole('VIEWER');
  };
  if (!streamerInfo) return;
  if (streamerInfo?.status === 'CLOSE') {
    return (
      <ViewerPageLayout>
        <section className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="w-full">
            <div className="mb-12 flex w-full flex-col items-center justify-center">
              <p className="blcok text-bold-large">종료된 시참이에요</p>
              <p>다음 시참을 기대해주세요 :)</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <p className="text-medium-small text-alert">
                스트리머가 시참을 진행중이라면
              </p>
              <p className="text-medium-small text-alert">
                시참 링크를 요청해보세요!
              </p>
            </div>
          </div>
        </section>
      </ViewerPageLayout>
    );
  }

  return (
    streamerInfo && (
      <CommonLayout>
        <section className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="mb-10 flex flex-col items-center justify-center gap-2">
            <StreamerTextLive isLive={streamerInfo.status}></StreamerTextLive>
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
          <CategoryText
            category={streamerInfo.liveCategoryValue || ''}
          ></CategoryText>
        </section>
        <BtnWithChildren onClickHandler={onClickLogin}>
          (로그인하고 3초만에) 시참등록하기
        </BtnWithChildren>
      </CommonLayout>
    )
  );
}
