// lib/streamerService.ts
import axios from 'axios';
import { ChzzkClient, PartialChannel } from 'chzzk';

const client = new ChzzkClient();

export type StreamerStatusType = 'OPEN' | 'CLOSE';
export type StreamerInfo = {
  status: StreamerStatusType;
  channel: PartialChannel;
  liveCategory: string | undefined;
  liveCategoryValue: string | undefined;
};

export const getStreamerInfo = async (
  channelId: string,
): Promise<StreamerInfo | null> => {
  try {
    const liveDetail = await client.live.detail(channelId);
    const { status, channel, liveCategory, liveCategoryValue } = liveDetail;

    const resStreamerInfo: StreamerInfo = {
      status,
      channel,
      liveCategory,
      liveCategoryValue,
    };
    return resStreamerInfo;
  } catch (error) {
    console.error('Error fetching streamer info:', error);
    throw new Error('Failed to fetch streamer info');
  }
};

const handleFetchError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Axios에서 발생한 오류 처리
    if (error.response) {
      // 서버에서 오류 응답을 반환했을 경우
      throw new Error(
        `서버 오류: ${error.response.status} - ${error.response.data.message || '알 수 없는 오류'}`,
      );
    } else if (error.request) {
      throw new Error(
        '요청이 전송되었지만 응답이 없습니다. 네트워크 상태를 확인하세요.',
      );
      // 요청이 만들어졌지만 응답이 없을 경우
    } else {
      throw new Error(`요청 중 오류가 발생했습니다: ${error.message}`);
      // 요청 생성 중 발생한 오류
    }
  } else {
    // 예상치 못한 오류 처리
    throw new Error(`알 수 없는 오류가 발생했습니다: ${String(error)}`);
  }

  // 추가: 로그를 서버로 전송하거나 콘솔에 기록
};

export const postStreamerInfo = async (
  channelId: string,
): Promise<StreamerInfo | null> => {
  const data = await axios
    .post(`${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/streamer`, {
      channelId: channelId,
    })
    .catch((error) => {
      handleFetchError(error);
      throw error;
    });
  if (data?.data) return data.data.streamerInfo;
  return null;
};
