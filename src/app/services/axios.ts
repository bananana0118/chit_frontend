import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // API의 기본 URL
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type
  },
});
// 요청 인터셉터
axiosInstance.interceptors.request.use(
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
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 데이터 가공
    return response;
  },
  (error) => {
    // 응답 오류 처리
    if (error.response) {
      // 서버가 응답했지만, 상태 코드가 2xx 범위를 벗어났을 경우
      console.error(`Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      // 요청이 전송되었지만, 응답이 없는 경우
      console.error('No response received:', error.request);
    } else {
      // 요청 설정 중에 오류 발생
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
