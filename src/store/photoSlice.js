import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: [null, null],
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      const { index, uri } = action.payload;
      state.photos[index] = uri;
    },
    resetPhotos: (state) => {
      state.photos = [null, null];
    },
  },
});

export const { setPhoto, resetPhotos } = photoSlice.actions;
export default photoSlice.reducer; 