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
import { useSSEStore } from '@/app/store/sseStore';
import { getContentsSessionInfo } from '@/app/services/streamer/streamer';
import { toast } from 'react-toastify';
import useParamsParser from '@/hooks/useParamsParser';

export default function Page() {
  const streamerInfo = useChannelStore((state) => state.streamerInfo);
  const channel = streamerInfo?.channel;
  const { sessionCode } = useParamsParser();
  const { accessToken, isRehydrated: isTokenLoading = false } = useAuthStore();
  const { order } = useSSEStore();
  const {
    startSSE,
    stopSSE,
    isConnected,
    viewerGameNickname,
    isRehydrated: isViewerInfoLoading = false,
  } = useSSEStore();
  //세션인포 찾기

  useEffect(() => {
    if (accessToken && isViewerInfoLoading && !isConnected) {
      console.log('🔄 SSE 자동 시작');
      console.log(viewerGameNickname);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/viewer/subscribe?sessionParticipationCode=${sessionCode}&gameNickname=${viewerGameNickname}&accessToken=${accessToken}`;

      startSSE(url);
    }
  }, [accessToken, isViewerInfoLoading]); // ✅ accessToken이 바뀔 때마다 SSE 연결

  useEffect(() => {
    return () => {
      console.log('🛑 컴포넌트 언마운트 시 SSE 종료');
      stopSSE();
    };
  }, []); // ✅ 언마운트 시 한 번만 실행
  // useEffect(() => {
  //   const getSessionInfo = async () => {
  //     const response = await getContentsSessionInfo(accessToken);
  //     if ('error' in response) {
  //       // 에러 발생 시 사용자 피드백 제공
  //       toast.error(`❌에러코드 : ${response.status} 오류: ${response.error}`, {
  //         position: 'top-right',
  //         autoClose: 3000,
  //       });
  //       return;
  //     } else {
  //       const data = response.data;

  //       console.log('ResponseData');
  //       console.log(data);
  //     }
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const response = await getSessionInfo();
  //       console.log(response);
  //       //setCurrentParticipants(result);
  //     } catch (error) {
  //       console.error('데이터 가져오기 실패:', error);
  //     }
  //   };
  //   if (isTokenLoading) fetchData();
  // }, [accessToken, isTokenLoading]); // 의존성 배열이 빈 배열이면, 컴포넌트 마운트 시 한 번만 실행

  return (
    streamerInfo &&
    isViewerInfoLoading && (
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

          {/* {order <= maxGroup} */}
          <p className="flex flex-row items-center justify-center text-bold-big text-primary">
            지금 참여
          </p>
        </section>
        <section className="flex w-full items-center justify-center">
          <div className="m-5 text-bold-middle">
            스트리머가 당신을 찾고있어요! 🎉
          </div>
        </section>
        <BtnWithChildren type={'alert'} onClickHandler={() => stopSSE()}>
          이제 시참 그만할래요
        </BtnWithChildren>
      </ViewerPageLayout>
    )
  );
}
