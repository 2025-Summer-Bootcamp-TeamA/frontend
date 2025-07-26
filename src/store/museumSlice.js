import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchNearbyMuseums } from '../api/places/nearbyMuseumsApi';

// 비동기 액션: 근처 박물관 검색
export const fetchNearbyMuseums = createAsyncThunk(
  'museum/fetchNearbyMuseums',
  async ({ latitude, longitude, radius = 3000, keyword = 'museum' }, { rejectWithValue }) => {
    try {
      const museums = await searchNearbyMuseums({ latitude, longitude, radius, keyword });
      return { museums, location: { latitude, longitude } };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  museums: [],
  isLoading: false,
  error: null,
  lastLocation: null,
  lastFetchTime: null,
  cacheExpiry: 60 * 60 * 1000, // 1시간 (밀리초)
};

const museumSlice = createSlice({
  name: 'museum',
  initialState,
  reducers: {
    clearMuseums: (state) => {
      state.museums = [];
      state.error = null;
    },
    setMuseums: (state, action) => {
      state.museums = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyMuseums.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNearbyMuseums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.museums = action.payload.museums;
        state.lastLocation = action.payload.location;
        state.lastFetchTime = Date.now();
        state.error = null;
      })
      .addCase(fetchNearbyMuseums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '박물관 데이터를 가져오는데 실패했습니다.';
      });
  },
});

export const { clearMuseums, setMuseums, clearError } = museumSlice.actions;

// Selectors
export const selectMuseums = (state) => state.museum.museums;
export const selectMuseumsLoading = (state) => state.museum.isLoading;
export const selectMuseumsError = (state) => state.museum.error;
export const selectLastLocation = (state) => state.museum.lastLocation;
export const selectLastFetchTime = (state) => state.museum.lastFetchTime;

// 캐시 유효성 확인 함수
export const selectIsCacheValid = (state) => {
  const { lastFetchTime, cacheExpiry } = state.museum;
  if (!lastFetchTime) return false;
  return Date.now() - lastFetchTime < cacheExpiry;
};

export default museumSlice.reducer; 