/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../axios';
import { RequestLoginWithOAuth2, ResponseLoginWithOAuth2 } from './type';

// OAuth2 로그인 요청 함수
export const loginWithOAuth2 = async ({
  code,
  state,
  channelId = '',
}: RequestLoginWithOAuth2): Promise<ResponseLoginWithOAuth2> => {
  try {
    const response = await axiosInstance.post('/api/v1/oauth2/login', {
      code,
      state,
      channelId,
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error(`오류가 발생했습니다: ${error.response.data.error}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
