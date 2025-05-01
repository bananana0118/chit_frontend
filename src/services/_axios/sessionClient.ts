import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import setUpTokenInterceptor from './setUpTokenInterceptor';
import { ErrorResponse } from '../streamer/type';
import CustomError from '@/errors/errors';

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
    console.log('intercepter error');
    return Promise.reject(error);
  },
);

setUpTokenInterceptor(sessionClient);

// 응답 인터셉터
sessionClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError<ErrorResponse>) => {
    // 요청 오류 처리
    if (axios.isAxiosError(err)) {
      console.log('response?');
      console.log(err);
      if (err.response) {
        // 서버에서 응답한 에러
        console.warn('🚨 Server Response:', err.response.data);
        const { code, status, error } = err.response.data;
        console.log('dasdasdas');
        return Promise.reject(
          new CustomError({
            statusCode: code,
            status: status,
            error: error || '서버 오류가 발생했습니다.',
          }),
        );
      }
      return Promise.reject(
        new CustomError({
          statusCode: 500,
          status: 500,
          error: err.message || 'Axios 요청 중 오류가 발생했습니다.',
        }),
      );
    }

    // Axios 외의 일반적인 예외 처리
    console.warn('❌ Unexpected Error:', err);
    return Promise.reject(
      new CustomError({
        statusCode: 500,
        status: 500,
        error: '알 수 없는 오류가 발생했습니다!.',
      }),
    );
  },
  // 응답 데이터 가공
);

export default sessionClient;
