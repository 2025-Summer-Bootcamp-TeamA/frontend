import { createSlice } from '@reduxjs/toolkit';

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: {
    avatarId: null,
    thumbnailUrl: null,
    uploadedUrl: null,
    // API 호출 상태 추가
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  reducers: {
    setAvatarInfo: (state, action) => {
      const { avatar_id, thumbnail_url, uploaded_url } = action.payload;
      state.avatarId = avatar_id;
      state.thumbnailUrl = thumbnail_url;
      state.uploadedUrl = uploaded_url;
      state.isLoading = false; // 로딩 상태를 false로 설정
      state.isSuccess = true;
      state.error = null;
    },
    clearAvatarInfo: (state) => {
      state.avatarId = null;
      state.thumbnailUrl = null;
      state.uploadedUrl = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
    // API 호출 시작
    setAvatarLoading: (state, action) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    // API 호출 실패
    setAvatarError: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    },
  },
});

export const { setAvatarInfo, clearAvatarInfo, setAvatarLoading, setAvatarError } = avatarSlice.actions;
export default avatarSlice.reducer; 