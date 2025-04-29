import { handleAuthError } from '@/lib/handleErrors';
import authClient from '../_axios/authClient';
import { RequestLogout } from './type';
import { AUTH_URLS } from '@/constants/urls';
import { ErrorResponse } from '../streamer/type';

type loginType = {
  code: string;
  state: string;
};

export const login = async ({
  code: code,
  state: state,
}: loginType): Promise<{ accessToken: string } | ErrorResponse> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ code, state }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ 쿠키 보내려면 이거 필요
    });
    const { data } = await response.json();
    return { accessToken: data }; // 성공적인 응답 데이터 반환
  } catch (error: any) {
    return handleAuthError(error);
  }
};

//로그아웃
export const logout = async ({ accessToken }: RequestLogout) => {
  try {
    const response = await authClient.post(
      AUTH_URLS.logout,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    console.log(response);

    if (response.status === 200) {
      const response2 = await fetch('/api/login');
      console.log(response2);
    }
    return response;
  } catch (error: any) {
    return handleAuthError(error);
  }
};
