/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAuthError } from '@/lib/handleErrors';
import apiAuth from '../axios/apiAuth';
import { RequestLoginWithOAuth2, RequestLogout, ResponseLoginWithOAuth2 } from './type';
import { AUTH_URLS } from '@/constants/urls';
import { accessToken } from 'chzzk/dist/api/chat';

// OAuth2 로그인 요청 함수
export const loginWithOAuth2 = async ({
  code,
  state,
  channelId = '',
}: RequestLoginWithOAuth2): Promise<ResponseLoginWithOAuth2> => {
  try {
    const response = await apiAuth.post(AUTH_URLS.login, {
      code,
      state,
      channelId,
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error: any) {
    return handleAuthError(error);
  }
};

//로그아웃
export const logout = async ({ accessToken }: RequestLogout) => {
  try {
    const response = await apiAuth.post(
      AUTH_URLS.logout,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    sessionStorage.clear();
  } catch (error: any) {
    return handleAuthError(error);
  }
};
