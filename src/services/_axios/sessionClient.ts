import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import setUpTokenInterceptor from './setUpTokenInterceptor';
import SessionError, { SessionErrorCode } from '@/errors/sessionError';
import { ErrorResponse } from '../streamer/type';

const sessionClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // API의 기본 URL
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type
  },
});
// 요청 인터셉터
sessionClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 요청 전 처리 (예: 토큰 추가)
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      console.log('axios : ', accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    console.log(error);
    console.log(error.status);
    console.log(error.error);
    console.log('intercepter error');
    return Promise.reject(error);
  },
);

// 응답 인터셉터
sessionClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // 요청 오류 처리
    if (error && error.response) {
      const { status, error: message } = error.response?.data;
      if (status === 400) {
        if (message === '현재 진행중인 라이브 방송을 찾을 수 없습니다. 다시 확인해 주세요.') {
          throw new SessionError(SessionErrorCode.LIVE_SESSION_NOT_FOUND);
        }
        if (message === '이미 진행 중인 컨텐츠 세션이 존재합니다. 중복 생성을 할 수 없습니다.') {
          throw new SessionError(SessionErrorCode.LIVE_SESSION_EXISTS);
        }
        if (message === '현재 진행 중인 시청자 참여 세션이 없습니다. 다시 확인해 주세요.') {
          throw new SessionError(SessionErrorCode.SESSION_CLOSED);
        }
      }
    } else if (axios.isAxiosError(error)) {
      if (error.response) {
        // 서버에서 응답한 에러
        console.warn('🚨 Server Response:', error.response.data);
        return {
          status: error.response.status,
          error: error.response.data?.error || '서버 오류가 발생했습니다.',
          data: error.response.data?.data,
        };
      } else if (error.request) {
        // 요청이 전송되었지만 응답이 없음
        return {
          status: 503,
          error: '서버 응답이 없습니다. 네트워크 상태를 확인하세요.',
          data: 'null',
        };
      }
    }

    // Axios 외의 일반적인 예외 처리
    console.warn('❌ Unexpected Error:', error);
    return {
      status: 500,
      error: '알 수 없는 오류가 발생했습니다.',
      data: 'null',
    };
  },
  // 응답 데이터 가공
);
setUpTokenInterceptor(sessionClient);

export default sessionClient;
