import { create } from 'zustand';

type SSEState = {
  eventSource: EventSource | null;
  isConnected: boolean;
  order: number | null;
  startSSE: (url: string) => void;
  stopSSE: () => void;
};

const EVENT_TYPES = [
  'SESSION_STATUS_UPDATED',
  'SESSION_INFORMATION_UPDATED',
  'PARTICIPANT_ADDED',
  'PARTICIPANT_REMOVED',
  'PARTICIPANT_UPDATED',
  'SESSION_CLOSED',
];

export const useSSEStore = create<SSEState>((set) => ({
  eventSource: null,
  isConnected: false,
  order: null,
  startSSE: (url) => {
    set((state) => {
      if (state.eventSource) {
        console.log('기존sse연결 있을 시 연결 닫기');
        state.eventSource.close();
      }

      console.log('새로운 SSE연결 시작');
      const newEventSource = new EventSource(url);

      newEventSource.onopen = (event) => {
        console.log('SSE연결 성공~');
        console.log('연결성공메세지 수신', event);
      };

      // ✅ 모든 이벤트 리스너 등록
      EVENT_TYPES.forEach((eventType) => {
        newEventSource.addEventListener(eventType, (event) => {
          console.log(`📩 ${eventType} 이벤트 수신:`, JSON.parse(event.data));

          const eventData = JSON.parse(event.data);
          console.log(eventData);

          // ✅ 이벤트 타입에 따라 ORDER 값 변경
          let newOrder = 0;
          //   switch (eventType) {
          //     case 'SESSION_STATUS_UPDATED':
          //       newOrder = 1;
          //       break;
          //     case 'SESSION_INFORMATION_UPDATED':
          //       newOrder = 2;
          //       break;
          //     case 'PARTICIPANT_ADDED':
          //       newOrder = eventData.order ?? 3;
          //       break;
          //     case 'PARTICIPANT_REMOVED':
          //       newOrder = eventData.order ?? 4;
          //       break;
          //     case 'PARTICIPANT_UPDATED':
          //       newOrder = eventData.order ?? 5;
          //       break;
          //     case 'SESSION_CLOSED':
          //       newOrder = 99;
          //       break;
          //     default:
          //       newOrder = 0;
          //   }

          set({ order: newOrder }); // 상태 업데이트
          console.log(`🔄 ORDER 변경: ${newOrder}`);
        });
      });
      newEventSource.onmessage = (event) =>
        console.log('메세지 수신', JSON.parse(event.data));

      newEventSource.onerror = (error) => {
        console.log('SSE오류 발생~', error);
        newEventSource.close();
        set({ isConnected: false, eventSource: null });
      };

      return { eventSource: newEventSource, isConnected: true };
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
}));
