//todo 임시적용, 추후 삭제
'use client';

import CommonLayout from '@/components/layout/CommonLayout';
import StreamerTools from '@/components/molecules/StreamerTools';
import makeUrl from '@/lib/makeUrl';
import {
  createContentsSession,
  deleteContentsSession,
  getContentsSessionInfo,
  heartBeatStreamer,
  putContentsSessionNextGroup,
} from '@/services/streamer/streamer';
import useChannelStore from '@/store/channelStore';
import useContentsSessionStore from '@/store/sessionStore';
import { ParticipantResponseType, useSSEStore } from '@/store/sseStore';
import useAuthStore from '@/store/store';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import ViewerList from '@/components/molecules/ViewerList';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { isErrorResponse } from '@/lib/handleErrors';
import useDetectExit from '@/hooks/useDetectExit';
import { logout } from '@/services/auth/auth';

export enum SessionStatus {
  INITIAL = 1,
  OPEN = 2,
  CLOSED = 0,
}

interface getFetchParticipantsDataResponse {
  participants: ParticipantResponseType[];
  nextPage?: number;
}

type InfiniteParticipantsData = {
  pages: getFetchParticipantsDataResponse[];
  pageParams: unknown[];
};

const fetchParticipantsData = async ({
  pageParam = 1,
  accessToken,
  size = 20,
}: {
  pageParam?: unknown;
  accessToken: string;
  size?: number;
}): Promise<getFetchParticipantsDataResponse> => {
  const page = pageParam as number;
  const response = await getContentsSessionInfo({ page, accessToken, size });
  if (isErrorResponse(response)) {
    console.error(`api error 발생: ${response.error}`);
    return Promise.reject(new Error(response.error));
  }

  console.log('fetchParticipantsdata 정보', response.data);

  return {
    participants: response.data.participants?.content ?? [],
    nextPage: response.data.participants?.hasNext ? pageParam + 1 : undefined,
  };
};

export default function List() {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { isRehydrated: isLoadingContentsSessionInfo, sessionInfo } = useContentsSessionStore(
    (state) => state,
  );
  const { startSSE, stopSSE, isConnected, contentsSessionInfo, currentParticipants } =
    useSSEStore();
  const channelId = useChannelStore((state) => state.channelId);
  const isTokenLoading = useAuthStore((state) => state.isRehydrated);
  const [isSessionOn, setIsSessionOn] = useState<SessionStatus>(SessionStatus.INITIAL);
  // const [participants, setParticipants] = useState<ParticipantResponseType[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<getFetchParticipantsDataResponse>({
      queryKey: ['participants'],
      queryFn: async ({ pageParam = 1 }) => {
        return await fetchParticipantsData({ pageParam, accessToken, size: 10 });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined, // 다음 페이지 정보
      enabled: !!accessToken,
    });

  //브라우저 종료시 실행되는 콜백 함수
  const handleExit = async () => {
    alert('⚠️ 로그아웃 되었습니다.');
    // await logout({ accessToken });
    //로그아웃 api 쓰기
  };

  useDetectExit(handleExit);

  //다음 파티 호출 버튼 클릭시 Handler
  const nextPartyCallHandler = async () => {
    try {
      const response = await putContentsSessionNextGroup({ accessToken });
      if (response.status === 200) {
        toast.success('다음 파티를 호출 했습니다.');
        queryClient.setQueryData(['participants'], () => ({
          pages: [],
          pageParams: [0],
        })); // participants 호출
        queryClient.refetchQueries({ queryKey: ['participants'] }); // 쿼리 재요청 (첫 페이지부터)
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const filterParticipantsData = (participants: ParticipantResponseType[]) => {
    const filtered = participants.filter(
      (participant, index, self) =>
        index === self.findIndex((p) => p.viewerId === participant.viewerId),
    );

    return filtered;
  };

  //이벤트 발생에 따른 로드
  useEffect(() => {
    if (currentParticipants) {
      queryClient.setQueryData<InfiniteParticipantsData>(
        ['participants'],
        (oldData: InfiniteParticipantsData | undefined) => {
          if (!oldData) return;

          //이벤트로 발생한 데이터와 페이지네이션으로 데이터 발생시 통합 관리
          const unionData = [
            ...oldData.pages.flatMap((page: any) => page.participants || []),
            ...currentParticipants,
          ];

          const newParticipants = filterParticipantsData(unionData);

          return {
            ...oldData,
            pages: [
              { ...oldData.pages[0], participants: newParticipants },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );
    }
  }, [currentParticipants, queryClient]);

  const participants = useMemo(() => {
    return data?.pages.flatMap((p) => p.participants || []) ?? [];
  }, [data]);

  const loadMoreData = async () => {
    if (!hasNextPage || isFetchingNextPage) return;
    await fetchNextPage();
  };

  //하트비트 체크
  useEffect(() => {
    heartBeatStreamer(accessToken);

    const intervalId = setInterval(() => {
      heartBeatStreamer(accessToken);
      console.log('ping');
    }, 10000); // 10초

    return () => {
      clearInterval(intervalId);
    };
  }, [accessToken, isTokenLoading]);
  console.log(data);
  //세션 생성 함수
  const onCreateSession = async () => {
    if (sessionInfo) {
      const { gameParticipationCode, maxGroupParticipants } = sessionInfo;
      const reqData = {
        gameParticipationCode,
        maxGroupParticipants,
      };

      const response = await createContentsSession(reqData, accessToken);

      return response.status;
    }
  };

  //스트리머 세션 컨트롤 핸들러
  const onClickSessionOnOff = async () => {
    if (!accessToken) {
      toast.warn('잠시후 다시 시도해주세요');
      return;
    }

    // 상태변화 sessionOn=>sessionOff
    if (isSessionOn) {
      const response = await deleteContentsSession(accessToken);

      if (
        response.status === 200 &&
        (isSessionOn === SessionStatus.INITIAL || isSessionOn === SessionStatus.OPEN)
      ) {
        stopSSE();
        setIsSessionOn(SessionStatus.CLOSED);
        toast.success('시참이 종료되었습니다.');
        return;
      }
    } else {
      // 상태변화 sessionOff=>sessionOn
      const status = await onCreateSession();
      if (status !== 200) {
        toast.warn('에러가 발생했습니다. 나중에 다시 시도해 주세요');
        return;
      }

      const url = makeUrl({ accessToken, isStreamer: true });
      startSSE(url);
      setIsSessionOn(SessionStatus.OPEN);
      toast.success('시참이 시작되었습니다.');
      return;
    }

    toast.warn('요청에 실패했습니다. 잠시후 다시 시도해주세요');
  };

  //todo 테스트 동안만 잠가놓는 최초 데이터 불러오는 api

  useEffect(() => {
    if (accessToken) {
      queryClient.invalidateQueries({ queryKey: ['participants'], refetchType: 'none' }); // ✅ accessToken이 변경될 때 데이터 갱신
    }
  }, [accessToken, queryClient]);

  useEffect(() => {
    if (accessToken && !isConnected) {
      console.log('🔄 SSE 자동 시작');
      const url = makeUrl({ accessToken, isStreamer: true });
      startSSE(url);
    }
  }, [accessToken, isConnected, startSSE]); // ✅ accessToken이 바뀔 때마다 SSE 연결

  console.log(participants);

  if (!isTokenLoading) return <div>로딩중입니다.</div>;
  const maxGroupParticipants = sessionInfo?.maxGroupParticipants ?? 1;
  return (
    isTokenLoading &&
    sessionInfo && (
      <CommonLayout>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
          <section id="controlBox" className="w-full">
            <StreamerTools
              onClickSessionHandler={onClickSessionOnOff}
              isSessionOn={!!isSessionOn}
              sessionCode={sessionInfo?.sessionCode}
              channelId={channelId!}
            />
          </section>
          <section id="infoBox" className="w-full">
            {!isSessionOn ? (
              <p className="mb-5 mt-4 text-bold-middle">시참을 시작해주세요</p>
            ) : participants.length === 0 ? (
              <p className="mb-5 mt-4 text-bold-middle">아직 참여자가 없어요</p>
            ) : (
              <p className="mb-5 mt-4 text-bold-middle">
                총 <span className="text-primary">{participants.length}명</span>이 참여중이에요
              </p>
            )}
          </section>
          <section className="mb-3 flex min-h-[34px] w-full">
            <div id="listNav " className="flex w-full flex-row justify-between">
              <ul className="flex flex-row items-center text-medium-large">
                <li className="menutab mr-3 last:mr-0">전체 인원</li>
                <li className="menutab mr-3 last:mr-0">고정 인원</li>
                <li className="menutab mr-3 last:mr-0">현재 인원</li>
              </ul>
              <div
                // onClick={nextPartyCallHandler}
                onClick={handleExit}
                className="cursor-pointer rounded-md bg-background-sub p-2 text-semi-bold text-secondary"
              >
                다음 파티 호출 🔈
              </div>
            </div>
          </section>
          <section className="w-full flex-1 overflow-y-auto">
            {!isSessionOn ? (
              <div>시참을 시작해주세요.</div>
            ) : participants.length === 0 ? (
              <div>유저를 기다리는 중입니다.</div>
            ) : (
              <ViewerList
                accessToken={accessToken}
                participants={participants}
                loadMoreItems={loadMoreData}
                maxGroupParticipants={maxGroupParticipants}
                key={'viewerList'}
              ></ViewerList>
            )}
          </section>
        </div>
      </CommonLayout>
    )
  );
}
