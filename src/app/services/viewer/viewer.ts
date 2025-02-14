import { handleApiError } from '@/app/lib/error';
import axiosInstance from '../axios';
import { ApiResponse } from '@/app/store/sessionStore';
import { ErrorResponse } from '../streamer/streamer';

type GameCodeType = {
  gameParticipationCode: string;
};

type GetContentsSessionGameCodeResponse =
  | ApiResponse<GameCodeType>
  | ErrorResponse;

export const getContentsSessionGameCode = async ({
  sessionCode,
  accessToken,
}: {
  sessionCode: string;
  accessToken: string;
}): Promise<GetContentsSessionGameCodeResponse> => {
  console.log(accessToken);
  try {
    const url = `/api/v1/contents/session/${sessionCode}/gameCode`;
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // accessToken을 Bearer 토큰으로 추가
      },
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error: unknown) {
    return handleApiError(error); // 에러 핸들링 함수 사용
  }
};
