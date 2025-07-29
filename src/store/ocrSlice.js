import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ocrText: null,
  // API 호출 상태 추가
  isLoading: false,
  isSuccess: false,
  error: null,
};

const ocrSlice = createSlice({
  name: 'ocr',
  initialState,
  reducers: {
    // OCR 텍스트 저장
    setOcrText: (state, action) => {
      state.ocrText = action.payload;
      state.isLoading = false; // 로딩 상태를 false로 설정
      state.isSuccess = true;
      state.error = null;
    },
    
    // OCR 상태 초기화
    clearOcrText: (state) => {
      state.ocrText = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },

    // API 호출 시작
    setOcrLoading: (state, action) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // API 호출 실패
    setOcrError: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    },
  },
});

export const {
  setOcrText,
  clearOcrText,
  setOcrLoading,
  setOcrError,
} = ocrSlice.actions;
export default ocrSlice.reducer; 