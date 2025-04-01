import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
export enum ViewerStatus {
  JOINED = 'JOINED', // 시청자가 세션에 참여 중
  LIVE_CLOSED = 'LIVE_CLOSED', // 스트리머가 세션 종료함
  DISCONNECTED = 'DISCONNECTED', // 연결이 끊긴 상태
  KICKED = 'KICKED', //강퇴당한 상태
}

type SSEState = {
  contentsSessionInfo: SSEStateContentsSession | null;
  sessionCode: string | null;
  currentParticipants: ParticipantResponseType[] | null;
  eventSource: EventSource | null;
  lastEventId: string | null;
  isConnected: boolean;
  viewerSessionInfo: viewerSessionInfo | null;
  viewerNickname?: string | null;
  error: string | null;
  viewerStatus: ViewerStatus | null;
  isRehydrated: boolean; // 상태가 로드 완료되었는지 여부 추가
  setCurrentParticipants: (newCurrentParticipants: ParticipantResponseType[]) => void;
  setViewerNickname: (viewerNickname: string) => void;
  startSSE: (url: string) => void;
  restartSSE: () => void;
  stopSSE: () => void;
};

type SSEStateContentsSession = {
  sessionCode?: string;
  maxGroupParticipants?: number;
  totalParticipants?: number;
  gameParticipationCode?: string;
  order?: number;
  fixed?: boolean;
  participant?: ParticipantResponseType;
};

enum SSEEventType {
  JOINED_SESSION = 'JOINED_SESSION',
  LEFT_SESSION = 'LEFT_SESSION',
  KICKED_SESSION = 'KICKED_SESSION',
  PARTICIPANT_JOINED_SESSION = 'PARTICIPANT_JOINED_SESSION',
  PARTICIPANT_FIXED_SESSION = 'PARTICIPANT_FIXED_SESSION',
  PARTICIPANT_KICKED_SESSION = 'PARTICIPANT_KICKED_SESSION',
  PARTICIPANT_LEFT_SESSION = 'PARTICIPANT_LEFT_SESSION',
  SESSION_ORDER_UPDATED = 'SESSION_ORDER_UPDATED',
  //LEFT로 바뀐듯
  STREAMER_PARTICIPANT_REMOVED = 'STREAMER_PARTICIPANT_REMOVED',
  //깜빡하신듯
  STREAMER_SESSION_UPDATED = 'STREAMER_SESSION_UPDATED',
  PARTICIPANT_SESSION_UPDATED = 'PARTICIPANT_SESSION_UPDATED', //스트리머가 업데이트시
}

export type ParticipantResponseType = {
  order: number;
  round: number;
  status: ViewerStatus;
  fixedPick: boolean;
  viewerId: number;
  participantId: number;
  chzzkNickname: string;
  gameNickname: string;
};

type EVENT_ParticipantAddedResponse = {
  maxGroupParticipants: number;
  currentParticipants?: number;
  participant: ParticipantResponseType;
};

type EVENT_ParticipantRemovededResponse = EVENT_ParticipantAddedResponse;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EVENT_ParticipantFixedResponse = EVENT_ParticipantAddedResponse;

interface EVENT_SessionStatusUpdateResponse extends EVENT_ParticipantAddedResponse {
  sessionCode: string;
  maxGroupParticipants: number;
  currentParticipants: number;
  gameParticipationCode: string;
}
type Event_BaseResponse = {
  status: string;
  message: string;
};

interface EVENT_JoinedSessionResponse extends Event_BaseResponse {
  data: string; // 세션참가코드
}

interface EVENT_ParticipantOrderUpdated extends ParticipantResponseType {
  gameParticipationCode?: string | null;
}

type viewerSessionInfo = EVENT_ParticipantOrderUpdated;
export const SSEStorageKey = 'SSE-storage';

export const useSSEStore = create<SSEState>()(
  persist(
    (set, get) => ({
      eventSource: null,
      isConnected: false,
      sessionCode: null,
      lastEventId: null,
      viewerSessionInfo: null,
      currentParticipants: null,
      viewerStatus: null,
      error: null,
      viewerNickname: null,
      isRehydrated: false,
      contentsSessionInfo: null,
      resetContentSessionInfo: () => {
        set((state) => ({ ...state, contentsSessionInfo: null }));
      },
      setCurrentParticipants: (newParticipants) => {
        set((state) => ({ ...state, currentParticipants: newParticipants }));
      },
      setViewerNickname: (viewerNickname) => {
        set((state) => ({
          ...state,
          viewerNickname,
        }));
      },
      restartSSE: () => {
        set((state) => {
          if (state.eventSource && state.lastEventId) {
            const lastId = state.lastEventId;
            const url = lastId ? `/events?lastEventId=${lastId}` : '/events';
            const eventSource = new EventSource(url);

            return {
              eventSource: eventSource,
              isConnected: true,
              error: null,
            };
          } else {
            return {
              ...state,
            };
          }
        });
      },
      stopSSE: () => {
        set((state) => {
          if (state.eventSource) {
            console.log('SSE연결을 종료합니다.');
            try {
              state.eventSource.close();
            } catch (error) {
              console.error('SSE 종료 중 오류 발생:', error);
            }
          }
          return {
            eventSource: null,
            isConnected: false,
            viewerSessionInfo: null,
          };
        });
      },
      startSSE: (url) => {
        set((state) => {
          if (state.isConnected) {
            console.log('⚠️ 이미 SSE가 연결되어 있음. 중복 구독 방지');
            return state;
          }

          console.log('새로운 SSE연결 시작');
          set({
            isConnected: false,
            error: null,
            viewerStatus: ViewerStatus.JOINED,
          }); // ✅ 에러 초기화
          const newEventSource = new EventSource(url);
          console.log(newEventSource);
          newEventSource.onopen = (event) => {
            console.log('SSE연결 성공~');
            console.log('연결성공메세지 수신', event);
            set({
              isConnected: true,
              error: null,
              viewerStatus: ViewerStatus.JOINED,
            }); // ✅ 에러 초기화
          };

          // ✅ 모든 이벤트 리스너 등록
          Object.values(SSEEventType).forEach((eventType) => {
            newEventSource.addEventListener(eventType, (event) => {
              console.log(`📩 ${eventType} 이벤트 수신:`, JSON.parse(event.data));

              const eventData = JSON.parse(event.data);
              if (!eventData) return;
              const newState: Partial<SSEState> = {};

              switch (eventType) {
                // ✅ 공통 세션 참가 이벤트
                case SSEEventType.JOINED_SESSION:
                  console.log('📩 세션참가이벤트:', eventData);

                  const { data } = eventData as EVENT_JoinedSessionResponse;
                  newState.sessionCode = data;
                  break;

                //스트리머 세션 떠났을 때
                case SSEEventType.LEFT_SESSION:
                  get().stopSSE(); // 기존 stopSSE 함수 호출하여 안전하게 종료
                  break;

                case SSEEventType.PARTICIPANT_JOINED_SESSION:
                  const { maxGroupParticipants, currentParticipants, participant } =
                    eventData as EVENT_ParticipantAddedResponse;

                  newState.contentsSessionInfo = {
                    ...(get().contentsSessionInfo || {}),
                    maxGroupParticipants,
                    totalParticipants: currentParticipants || 0,
                  };
                  console.log(newState.currentParticipants);
                  const newCurrentParticipants = [
                    ...(get().currentParticipants ?? []),
                    participant,
                  ];

                  newState.currentParticipants = newCurrentParticipants;
                  break;

                case SSEEventType.STREAMER_PARTICIPANT_REMOVED: {
                  const removedData = eventData as EVENT_ParticipantRemovededResponse;
                  const previoustParticipants = get().currentParticipants ?? [];
                  const {
                    participant: removedParticipant,
                    maxGroupParticipants,
                    currentParticipants,
                  } = removedData;
                  const newParticipants = previoustParticipants.filter(
                    (participant: ParticipantResponseType) =>
                      participant.viewerId !== removedParticipant.viewerId,
                  );

                  newState.contentsSessionInfo = {
                    ...(get().contentsSessionInfo || {}),
                    maxGroupParticipants,
                    totalParticipants: currentParticipants,
                  };
                  newState.currentParticipants = newParticipants.map((participant) => {
                    const updated = {
                      ...participant,
                      order: participant.order - 1,
                    };
                    console.log('updated order:', updated.order);
                    return updated;
                  });
                  console.log('hit');
                  console.log(newParticipants);
                  break;
                }
                case SSEEventType.PARTICIPANT_FIXED_SESSION: {
                  const fixedData = eventData as EVENT_ParticipantRemovededResponse;
                  const previoustParticipants = get().currentParticipants ?? [];
                  const { participant: fixedParticipant } = fixedData;
                  const newParticipants = previoustParticipants.filter(
                    (participant: ParticipantResponseType) =>
                      participant.viewerId !== fixedParticipant.viewerId,
                  );

                  newState.contentsSessionInfo = {
                    ...(get().contentsSessionInfo || {}),
                  };
                  newState.currentParticipants = [...newParticipants, fixedParticipant];

                  console.log('newState');
                  console.log(newState);
                  break;
                }

                case SSEEventType.STREAMER_SESSION_UPDATED:
                  newState.contentsSessionInfo = {
                    ...(get().contentsSessionInfo || {}),
                    ...(eventData as EVENT_SessionStatusUpdateResponse),
                  };
                  break;

                case SSEEventType.SESSION_ORDER_UPDATED:
                case SSEEventType.PARTICIPANT_SESSION_UPDATED:
                  newState.viewerSessionInfo = {
                    ...(get().viewerSessionInfo || {}),
                    ...(eventData as EVENT_ParticipantOrderUpdated),
                  };
                  break;

                case SSEEventType.PARTICIPANT_LEFT_SESSION:
                  console.log('📩 참가자 세션 종료 이벤트 발생');
                  get().stopSSE(); // 기존 stopSSE 함수 호출하여 안전하게 종료
                  set({
                    viewerSessionInfo: null,
                    viewerStatus: ViewerStatus.DISCONNECTED,
                  }); // viewer 세션 정보 초기화
                  break;

                case SSEEventType.PARTICIPANT_KICKED_SESSION: {
                  console.log('📩 참가자 세션 강퇴 이벤트 발생');
                  get().stopSSE(); // 기존 stopSSE 함수 호출하여 안전하게 종료
                  set({
                    viewerSessionInfo: null,
                    viewerStatus: ViewerStatus.KICKED,
                  }); // viewer 세션 정보 초기화
                  break;
                }

                default:
                  console.log('📩 세션 이벤트 수신:', eventData);
              }

              set(newState); // 상태 업데이트
            });
          });
          newEventSource.onmessage = (event) => {
            set({ ...state, lastEventId: event.lastEventId });
            console.log('메세지 수신', JSON.parse(event.data));
          };

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
    }),

    {
      name: SSEStorageKey,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        viewerNickname: state.viewerNickname,
        viewerSessionInfo: state.viewerSessionInfo,
        currentParticipants: state.currentParticipants,
        contentsSessionInfo: state.contentsSessionInfo,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isRehydrated = true; // 로드 완료 플래그 설정
        }
      },
    },
  ),
);
