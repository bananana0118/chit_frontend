'use client';
import CopyIcon from '@/app/assets/icons/CopyIcon';

import useChannelStore from '@/store/channelStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/store';
import { useSSEStore } from '@/store/sseStore';
import { toast } from 'react-toastify';
import useParamsParser from '@/hooks/useParamsParser';
import BtnWithChildren from '@/components/atoms/button/BtnWithChildren';
import Live from '@/components/atoms/label/Live';
import OFF from '@/components/atoms/label/Off';
import ViewerPageLayout from '@/components/layout/ViewerPageLayout';
import { deleteContentsSessionViewerLeave } from '@/services/viewer/viewer';
import { useRouter } from 'next/navigation';
import useParentPath from '@/hooks/useParentPath';
import copyClipBoard from '@/lib/copyClipBoard';
import useBeforeUnload from '@/hooks/useBeforeUnload';

export default function Page() {
  const streamerInfo = useChannelStore((state) => state.streamerInfo);
  const channel = streamerInfo?.channel;
  const router = useRouter();
  const parentPath = useParentPath();
  const { sessionCode } = useParamsParser();
  const { accessToken, isRehydrated: isTokenLoading = false } = useAuthStore();
  const {
    stopSSE,
    viewerSessionInfo,
    isRehydrated: isViewerInfoLoading = false,
  } = useSSEStore();
  //세션인포 찾기
  useBeforeUnload();
  const onClickSessionCloseHandler = async () => {
    console.log('🛑세션종료');
    if (sessionCode) {
      const response = await deleteContentsSessionViewerLeave({
        accessToken,
        sessionCode,
      });

      if (response.status === 200) {
        toast.success('세션이 종료되었습니다.');
        router.replace(parentPath);
      }
    }
  };
  useEffect(() => {
    console.log('이게 왜 실행되는겁니까?');
    return () => {
      if (isViewerInfoLoading) {
        console.log('🛑 컴포넌트 언마운트 시 SSE 종료!!');
        stopSSE();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ 언마운트 시 한 번만 실행
  // useEffect(() => {
  //   const getGameCode = async () => {
  //     if (sessionCode) {
  //       const response = await getContentsSessionViewerGameCode({
  //         accessToken,
  //         sessionCode,
  //       });
  //       if ('error' in response) {
  //         // 에러 발생 시 사용자 피드백 제공
  //         toast.error(
  //           `❌에러코드 : ${response.status} 오류: ${response.error}`,
  //           {
  //             position: 'top-right',
  //             autoClose: 3000,
  //           },
  //         );
  //         return;
  //       } else {
  //         const data = response.data;

  //         console.log('ResponseData');
  //         console.log(data);
  //       }
  //     }
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const response = await getGameCode();
  //       console.log(response);
  //       //setCurrentParticipants(result);
  //     } catch (error) {
  //       console.error('데이터 가져오기 실패:', error);
  //     }
  //   };
  //   if (isTokenLoading) fetchData();
  // }, [accessToken, isTokenLoading, sessionCode]); // 의존성 배열이 빈 배열이면, 컴포넌트 마운트 시 한 번만 실행
  const [gameCode, setGameCode] = useState('아직 순서가 되지 않았습니다.');
  useEffect(() => {
    console.log(viewerSessionInfo?.gameParticipationCode);
    setGameCode(
      viewerSessionInfo?.gameParticipationCode ??
        '아직 순서가 되지 않았습니다.',
    );
  }, [isViewerInfoLoading, viewerSessionInfo]);

  return (
    isTokenLoading &&
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
          {gameCode ? (
            <>
              <div className="text-bold-small">
                <span className="text-secondary">참여 코드</span>를 입력해서
                게임에 참여해주세요
              </div>
              <div className="mt-1 flex flex-row items-center justify-center text-bold-large">
                {gameCode}
                <CopyIcon
                  width={16}
                  height={16}
                  className="ml-2"
                  onClickHandler={() => copyClipBoard(gameCode)}
                ></CopyIcon>
              </div>
            </>
          ) : (
            <>
              <div className="text-bold-small">순서를 기다려주세요</div>
            </>
          )}
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
        <BtnWithChildren
          type={'alert'}
          onClickHandler={onClickSessionCloseHandler}
        >
          이제 시참 그만할래요
        </BtnWithChildren>
      </ViewerPageLayout>
    )
  );
}
