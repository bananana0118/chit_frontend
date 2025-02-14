'use client';
import axios from 'axios';

// 서버 에러 형식 정의
type ErrorResponse = {
  status: number;
  error: string;
};

// API 에러 핸들링 함수
export const handleApiError = (error: unknown): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // 서버에서 응답한 에러
      console.warn('🚨 Server Response:', error.response.data);
      return {
        status: error.response.status,
        error: error.response.data?.error || '서버 오류가 발생했습니다.',
      };
    } else if (error.request) {
      // 요청이 전송되었지만 응답이 없음
      return {
        status: 503,
        error: '서버 응답이 없습니다. 네트워크 상태를 확인하세요.',
      };
    }
  }

  // Axios 외의 일반적인 예외 처리
  console.warn('❌ Unexpected Error:', error);
  return { status: 500, error: '알 수 없는 오류가 발생했습니다.' };
};
