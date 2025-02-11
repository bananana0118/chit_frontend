'use client';
import CommonLayout from '@/app/components/layout/CommonLayout';
import StreamerTools from '@/app/components/molecules/StreamerTools';
import MemberCard from '@/app/components/organisms/MemberCard';
import { getContentsSessionInfo } from '@/app/services/streamer/streamer';
import useChannelStore from '@/app/store/channelStore';
import useContentsSessionStore from '@/app/store/sessionStore';
import useAuthStore from '@/app/store/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function List() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const sessionInfo = useContentsSessionStore((state) => state.sessionInfo);
  const channelId = useChannelStore((state) => state.channelId);
  const isTokenLoading = useAuthStore((state) => state.isRehydrated);
  const [currentParticipants, setCurrentParticipants] = useState([]);

  useEffect(() => {
    const getSessionInfo = async () => {
      const response = await getContentsSessionInfo(accessToken);
      if ('error' in response) {
        // 에러 발생 시 사용자 피드백 제공
        toast.error(`❌에러코드 : ${response.status} 오류: ${response.error}`, {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      } else {
        const data = response.data;
        const newParticipants = data?.participants?.content ?? [];
        setCurrentParticipants((prev) => [
          ...prev,
          ...newParticipants, // 기존 데이터 유지하면서 새 데이터 추가
        ]);
        console.log('newParticipants');
        console.log(newParticipants);
      }
    };

    const fetchData = async () => {
      try {
        const response = await getSessionInfo();
        console.log(response);
        //setCurrentParticipants(result);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    if (isTokenLoading) fetchData();
  }, [accessToken, isTokenLoading]); // 의존성 배열이 빈 배열이면, 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    if (accessToken) {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/streamer/init?accessToken=${accessToken}`,
      );
      eventSource.onmessage = (event: MessageEvent) => {
        console.log('okay', event);
        const eventData = JSON.parse(event.data);
        console.log(eventData);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [accessToken]);
  if (!isTokenLoading) return <div>로딩중입니다.</div>;

  return (
    isTokenLoading &&
    sessionInfo && (
      <CommonLayout>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
          <section id="controlBox" className="w-full">
            <StreamerTools
              sessionCode={sessionInfo?.sessionCode}
              channelId={channelId!}
            />

            {currentParticipants.length === 0 ? (
              <p className="mb-5 mt-4 text-bold-middle">아직 참여자가 없어요</p>
            ) : (
              <p className="mb-5 mt-4 text-bold-middle">
                총<span className="text-primary">{currentParticipants}명</span>
                이 참여중이에요
              </p>
            )}
          </section>
          <section className="w-full flex-1">
            <div id="listNav " className="mb-3 flex flex-row justify-between">
              <ul className="flex flex-row items-center text-medium-large">
                <li className="menutab mr-3 last:mr-0">전체 인원</li>
                <li className="menutab mr-3 last:mr-0">고정 인원</li>
                <li className="menutab mr-3 last:mr-0">현재 인원</li>
              </ul>
              <div className="rounded-md bg-background-sub p-2 text-semi-bold text-secondary">
                다음 파티 호출 🔈
              </div>
            </div>
            <div id="list" className="flex w-full flex-1">
              {currentParticipants.length === 0 ? (
                <div>유저를 기다리는 중입니다.</div>
              ) : (
                (currentParticipants ?? []).map((participant, index) => (
                  <div
                    key={index}
                    id="partyblock"
                    className="flex h-full w-full flex-row"
                  >
                    <div
                      id="partyOrder"
                      className="mr-[6px] flex w-7 items-center justify-center rounded-md bg-background-sub text-bold-small text-secondary"
                    >
                      {index + 1}
                    </div>
                    <div id="partyMembers" className="flex-1">
                      <MemberCard
                        zicName={`치지직 닉네임${index + 1}`}
                        gameNicname="게임 닉네임"
                        isHeart={true}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </CommonLayout>
    )
  );
}
