import { AxiosInstance } from 'axios';
import { refreshAccessToken } from '../common/common';
import useAuthStore from '@/store/authStore';

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

//공통토큰 리프레시 로직을 재사용 가능하게 추출
export default function setUpTokenInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    //리스폰스 후 처리할 콜백 로직
    (response) => response,
    //에러 났을 시 처리할 로직
    async (error) => {
      const originalRequest = error.config; //원래 보냈던 요청

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        //TODO ..토큰 재발급 + 요청 재시도 로직 추가
        console.warn('401 에러: refresh Token으로 accessToken 재발급 시도');

        try {
          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshAccessToken()
              .then((res) => {
                if (res.status !== 200) throw new Error('Refresh 실패');
                return res.data;
              })
              .finally(() => {
                isRefreshing = false;
              });

            const newAccessToken = await refreshPromise;

            console.log('HIT');
            //쿠키 재설정
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };

            useAuthStore.getState().setAccessToken(newAccessToken);

            return instance(originalRequest);
          }
        } catch (err) {
          console.warn('에러로 인해 로그아웃 처리합니다.');
          await fetch('/api/login'); //<<이거 로그아웃임
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );
}
