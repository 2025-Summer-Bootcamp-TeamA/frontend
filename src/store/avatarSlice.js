import { createSlice } from '@reduxjs/toolkit';

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: {
    avatarId: null,
    thumbnailUrl: null,
    uploadedUrl: null,
  },
  reducers: {
    setAvatarInfo: (state, action) => {
      const { avatar_id, thumbnail_url, uploaded_url } = action.payload;
      state.avatarId = avatar_id;
      state.thumbnailUrl = thumbnail_url;
      state.uploadedUrl = uploaded_url;
    },
    clearAvatarInfo: (state) => {
      state.avatarId = null;
      state.thumbnailUrl = null;
      state.uploadedUrl = null;
    },
  },
});

export const { setAvatarInfo, clearAvatarInfo } = avatarSlice.actions;
export default avatarSlice.reducer; 