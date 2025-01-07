import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { StreamerInfo } from '../services/streamer/streamer';

interface ChannelState {
  channelId: string | undefined | string[];
  streamerInfo: StreamerInfo | null;
  isRehydrated: boolean;
}

type ChannelAction = {
  setChannelData: (ChannelData: string | string[]) => void;
  setStreamerInfo: (streamerInfo: StreamerInfo) => void;
};

export const ChannelStorageKey = 'channel-session-storage';

const useChannelStore = create<ChannelState & ChannelAction>()(
  devtools(
    persist(
      (set) => ({
        channelId: '',
        streamerInfo: null,
        isRehydrated: false,
        setChannelData: (channelId) =>
          set(() => ({
            channelId: channelId,
          })),
        setStreamerInfo: (streamerInfo) =>
          set(() => ({
            streamerInfo: streamerInfo,
          })),
      }),
      {
        name: ChannelStorageKey,
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          channelId: state.channelId,
          streamerInfo: state.streamerInfo,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isRehydrated = true; // 로드 완료 플래그 설정
          }
        },
      },
    ),
    { anonymousActionType: 'channelStore', name: 'channelStore' },
  ),
);

export default useChannelStore;
