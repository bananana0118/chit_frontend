import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SSEState = {
  contentsSessionInfo: SSEStateContentsSession | null;
  eventSource: EventSource | null;
  isConnected: boolean;
  order: number | null;
  viewerGameNickname: string | null;
  error: string | null;
  isRehydrated: boolean; // 상태가 로드 완료되었는지 여부 추가
  setViewerInfo: (viewerGameNickname: string) => void;
  startSSE: (url: string) => void;
  stopSSE: () => void;
};

type SSEStateContentsSession = {
  sessionCode?: string;
  maxGroupParticipants?: number;
  currentParticipantsCount?: number;
  gameParticipationCode?: string;
  order?: number;
  fixed?: boolean;
};

enum SSEEventType {
  SESSION_STATUS_UPDATED = 'SESSION_STATUS_UPDATED',
  SESSION_INFORMATION_UPDATED = 'SESSION_INFORMATION_UPDATED',
  PARTICIPANT_ADDED = 'PARTICIPANT_ADDED',
  PARTICIPANT_REMOVED = 'PARTICIPANT_REMOVED',
  PARTICIPANT_UPDATED = 'PARTICIPANT_UPDATED',
  SESSION_CLOSED = 'SESSION_CLOSED',
}
type EVENT_ParticipantAddedResponse = {
  maxGroupParticipants: number;
  currentParticipants?: number;
};

type EVENT_SessionStatusUpdateResponse = {
  sessionCode: string;
  maxGroupParticipants: number;
  currentParticipants: number;
  gameParticipationCode: string;
};

type EVENT_ParticipantResponse = {
  order: number;
  fixed: boolean;
};

export const SSEStorageKey = 'SSE-storage';

export const useSSEStore = create<SSEState>()(
  persist(
    (set, get) => ({
      eventSource: null,
      isConnected: false,
      order: null,
      error: null,
      viewerGameNickname: null,
      isRehydrated: false,
      contentsSessionInfo: null,
      setViewerInfo: (viewerGameNickname) => {
        set((state) => ({
          ...state,
          viewerGameNickname,
        }));
      },
      startSSE: (url) => {
        set((state) => {
          if (state.isConnected) {
            console.log('⚠️ 이미 SSE가 연결되어 있음. 중복 구독 방지');
            return state;
          }

          console.log('새로운 SSE연결 시작');
          const newEventSource = new EventSource(url);

          newEventSource.onopen = (event) => {
            console.log('SSE연결 성공~');
            console.log('연결성공메세지 수신', event);
            set({ isConnected: true, error: null }); // ✅ 에러 초기화
          };

          // ✅ 모든 이벤트 리스너 등록
          Object.values(SSEEventType).forEach((eventType) => {
            newEventSource.addEventListener(eventType, (event) => {
              console.log(
                `📩 ${eventType} 이벤트 수신:`,
                JSON.parse(event.data),
              );

              const eventData = JSON.parse(event.data);
              const newState: Partial<SSEState> = {};

              // ✅ 이벤트 타입에 따라 ORDER 값 변경
              switch (eventType) {
                case SSEEventType.SESSION_STATUS_UPDATED:
                  newState.contentsSessionInfo = {
                    ...(get().contentsSessionInfo || {}),
                    ...(eventData as EVENT_SessionStatusUpdateResponse),
                    currentParticipantsCount:
                      eventData.currentParticipants || 0,
                  };
                  break;

                case SSEEventType.PARTICIPANT_ADDED:
                  const { maxGroupParticipants, currentParticipants } =
                    eventData as EVENT_ParticipantAddedResponse;

                  newState.contentsSessionInfo = {
                    ...(get().contentsSessionInfo || {}),
                    maxGroupParticipants,
                    currentParticipantsCount: currentParticipants || 0,
                  };
                  break;

                case SSEEventType.PARTICIPANT_REMOVED:
                  newState.order = (
                    eventData as EVENT_ParticipantResponse
                  ).order;
                  break;

                case SSEEventType.SESSION_CLOSED:
                  console.log('session이 종료되었습니다.');
                  break;

                default:
                  console.log('📩 세션 이벤트 수신:', eventData);
              }

              set(newState); // 상태 업데이트
            });
          });
          newEventSource.onmessage = (event) =>
            console.log('메세지 수신', JSON.parse(event.data));

          newEventSource.onerror = (error) => {
            console.log('SSE오류 발생~', error);
            newEventSource.close();
            set({ isConnected: false, eventSource: null, error: '연결실패' });
          };

          return {
            eventSource: newEventSource,
            isConnected: true,
            error: null,
          };
        });
      },
      stopSSE: () => {
        set((state) => {
          if (state.eventSource) {
            console.log('SSE연결을 종료합니다.');
            state.eventSource.close();
          }
          return { eventSource: null, isConnected: false };
        });
      },
    }),

    {
      name: SSEStorageKey,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        viewerGameNickname: state.viewerGameNickname,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isRehydrated = true; // 로드 완료 플래그 설정
        }
      },
    },
  ),
);
