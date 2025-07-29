// src/configs/axios.config.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// 환경 변수에서 API 기본 URL 가져오기
const BASE_URL = Constants.expoConfig.extra.API_BASE_URL;



/**
 * 박물관 앱용 통합 Axios 인스턴스
 * - OAuth 로그인 
 * - 박물관 검색 (Google Maps API를 백엔드에서 처리)
 * - 영상 생성 (multipart/form-data 자동 처리)
 * - 영상 목록/상세 조회
 * - JWT 토큰 자동 관리
 */
export const jsonAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 일반 API용
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 영상 생성용 확장 타임아웃 인스턴스
 * - 영상 생성은 처리 시간이 오래 걸릴 수 있음
 */
export const videoGenerationAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5분 타임아웃 (300초)
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // FormData 사용시 자동 변경됨
  },
});

// ====== JWT 토큰 자동 추가 인터셉터 ======
const addTokenInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        // OAuth 로그인 요청은 토큰 불필요
        if (config.url?.includes('/users/google')) {
          return config;
        }

        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('토큰 조회 실패:', error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// ====== 토큰 갱신 함수 ======
const refreshAccessToken = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token이 없습니다.');
    }

    const response = await axios.post(`${BASE_URL}/auth/refresh/`, {
      refresh: refreshToken
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    // 새로운 토큰들 저장
    await SecureStore.setItemAsync('accessToken', accessToken);
    if (newRefreshToken) {
      await SecureStore.setItemAsync('refreshToken', newRefreshToken);
    }
    
    return accessToken;
  } catch (error) {
    // 갱신 실패시 토큰 삭제
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    throw error;
  }
};

// ====== 토큰 만료시 자동 갱신 인터셉터 ======
const addRefreshInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 401 또는 403 에러이고 아직 재시도하지 않은 경우
      if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패 → 로그인 화면으로
          console.error('토큰 갱신 실패, 재로그인 필요');
          // TODO: 로그인 화면으로 네비게이션
          return Promise.reject(refreshError);
        }
      }

      // 기타 에러 처리
      if (error.response) {
        const { status, data } = error.response;
        console.error(`API Error ${status}:`, data);
      } else if (error.request) {
        console.error('네트워크 오류:', error.request);
      } else {
        console.error('요청 설정 오류:', error.message);
      }

      return Promise.reject(error);
    }
  );
};

// ====== 인터셉터 적용 ======
addTokenInterceptor(jsonAxios);
addRefreshInterceptor(jsonAxios);

addTokenInterceptor(videoGenerationAxios);
addRefreshInterceptor(videoGenerationAxios);

// ====== 토큰 관리 유틸리티 ======
export const TokenManager = {
  async saveTokens(accessToken, refreshToken) {
    try {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    } catch (error) {
      console.error('토큰 저장 실패:', error);
    }
  },

  async clearTokens() {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
      console.error('토큰 삭제 실패:', error);
    }
  },

  async getAccessToken() {
    try {
      return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
      console.error('토큰 조회 실패:', error);
      return null;
    }
  }
};