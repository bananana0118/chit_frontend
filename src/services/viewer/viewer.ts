import { handleApiError } from '@/lib/error';
import axiosInstance from '../axios';
import {
  DeleteContentSessionLeaveRequest,
  GetContentsSessionGameCodeRequest,
  GetContentsSessionGameCodeResponse,
  GetContentsSessionViewerSubscribeRequest,
} from './type';
import makeUrl from '@/lib/makeUrl';

//시청자 구독 요청
export const getContentsSessionViewerSubscribe = async ({
  sessionCode,
  gameNickname,
  accessToken,
}: GetContentsSessionViewerSubscribeRequest): Promise<any> => {
  try {
    const URL = makeUrl({
      accessToken,
      isStreamer: false,
      sessionCode,
      viewerNickname: gameNickname,
    });
    const response = await axiosInstance.get(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // accessToken을 Bearer 토큰으로 추가
      },
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error: unknown) {
    return handleApiError(error); // 에러 핸들링 함수 사용
  }
};

//게임코드 가져오기
export const getContentsSessionGameCode = async ({
  sessionCode,
  accessToken,
}: GetContentsSessionGameCodeRequest): Promise<GetContentsSessionGameCodeResponse> => {
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

//세션에서 참가자 추방
export const deleteContentsSessionParticipant = async (
  accessToken: string,
  sessionCode: string,
): Promise<DeleteContentSessionLeaveRequest> => {
  console.log(accessToken);
  try {
    const response = await axiosInstance.delete(
      `/api/v1/contents/session/${sessionCode}/leave`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // accessToken을 Bearer 토큰으로 추가
        },
      },
    );

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error: unknown) {
    return handleApiError(error); // 에러 핸들링 함수 사용
  }
};
