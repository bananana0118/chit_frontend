import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { StreamerInfo } from '../services/streamer/streamer';

interface ChannelState {
  channelId: string | undefined | string[];
  streamerInfo: StreamerInfo | null;
}

type ChannelAction = {
  setChannelData: (ChannelData: string | string[]) => void;
  setStreamerInfo: (streamerInfo: StreamerInfo) => void;
};

export const ChannelStorageKey = 'channel-session-storage';

const useChannelStore = create(
  devtools(
    persist<ChannelState & ChannelAction>(
      (set) => ({
        channelId: '',
        streamerInfo: null,
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
      },
    ),
    { anonymousActionType: 'channelStore', name: 'channelStore' },
  ),
);

export default useChannelStore;
