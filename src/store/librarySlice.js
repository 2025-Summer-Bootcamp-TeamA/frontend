import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoLibrary: [
    // 국립중앙박물관 3개
    {
      videoId: 1,
      visionstoryId: "5097095957362458165",
      placeId: 'ChIJR7Ck0ULifDURQeLq4dK1Z2A', // 국립중앙박물관
      museumName: '국립중앙박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '훈민정음',
        artist: '세종대왕',
        description: '한글 창제의 위대한 업적을 담은 작품',
        videoScript: '훈민정음은 세종대왕이 창제한 한글의 원리를 담고 있습니다.'
      }
    },
    {
      videoId: 2,
      visionstoryId: "5097095957362458166",
      placeId: 'ChIJR7Ck0ULifDURQeLq4dK1Z2A',
      museumName: '국립중앙박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '금관',
        artist: '신라 장인',
        description: '신라 시대의 화려한 금관',
        videoScript: '신라 금관은 뛰어난 금세공 기술을 보여줍니다.'
      }
    },
    {
      videoId: 3,
      visionstoryId: "5097095957362458167",
      placeId: 'ChIJR7Ck0ULifDURQeLq4dK1Z2A',
      museumName: '국립중앙박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '백제 금동대향로',
        artist: '백제 장인',
        description: '백제의 예술성과 종교성을 담은 향로',
        videoScript: '백제 금동대향로는 동아시아 최고의 금속공예품 중 하나입니다.'
      }
    },
    // 국립고궁박물관 3개
    {
      videoId: 4,
      visionstoryId: "5097095957362458168",
      placeId: 'ChIJwzD1QK2ifDURQJkQ0b2Q2iA', // 국립고궁박물관
      museumName: '국립고궁박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '조선 왕실의 보물',
        artist: '조선 장인',
        description: '조선 왕실의 다양한 보물과 유물',
        videoScript: '조선 왕실의 보물은 역사적 가치가 매우 높습니다.'
      }
    },
    {
      videoId: 5,
      visionstoryId: "5097095957362458169",
      placeId: 'ChIJwzD1QK2ifDURQJkQ0b2Q2iA',
      museumName: '국립고궁박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '왕실 의복',
        artist: '조선 재단사',
        description: '조선 왕실의 의복과 장신구',
        videoScript: '왕실 의복은 조선의 미적 감각을 보여줍니다.'
      }
    },
    {
      videoId: 6,
      visionstoryId: "5097095957362458170",
      placeId: 'ChIJwzD1QK2ifDURQJkQ0b2Q2iA',
      museumName: '국립고궁박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '왕실 도자기',
        artist: '조선 도공',
        description: '조선 왕실에서 사용된 도자기',
        videoScript: '왕실 도자기는 조선의 도자기 기술을 대표합니다.'
      }
    },
    // 국립민속박물관 3개
    {
      videoId: 7,
      visionstoryId: "5097095957362458171",
      placeId: 'ChIJc8QJ3K2ifDURQJkQ0b2Q2iB', // 국립민속박물관(예시)
      museumName: '국립민속박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '상평통보',
        artist: '조선 조폐국',
        description: '조선 시대의 화폐',
        videoScript: '상평통보는 조선의 대표적인 동전입니다.'
      }
    },
    {
      videoId: 8,
      visionstoryId: "5097095957362458172",
      placeId: 'ChIJc8QJ3K2ifDURQJkQ0b2Q2iB',
      museumName: '국립민속박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '천원권 지폐',
        artist: '한국은행',
        description: '한국의 대표적인 지폐',
        videoScript: '천원권 지폐는 대한민국의 화폐입니다.'
      }
    },
    {
      videoId: 9,
      visionstoryId: "5097095957362458173",
      placeId: 'ChIJc8QJ3K2ifDURQJkQ0b2Q2iB',
      museumName: '국립민속박물관',
      videoUrl: 'https://storage.googleapis.com/teama-buck/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B3%E1%84%83%E1%85%A9_%E1%84%83%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%B5_%E1%84%86%E1%85%A9%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2__07-24%2022_20.mp4',
      status: 'created',
      artworkInfo: {
        title: '오천원권 지폐',
        artist: '한국은행',
        description: '한국의 대표적인 지폐',
        videoScript: '오천원권 지폐는 대한민국의 화폐입니다.'
      }
    },
  ],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.videoLibrary.push(action.payload);
    },
    deleteVideo: (state, action) => {
      // action.payload: videoId 또는 videoId 배열
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.videoLibrary = state.videoLibrary.filter(video => !idsToDelete.includes(video.videoId));
    },
    updateVideo: (state, action) => {
      // action.payload: { videoId, updates }
      const { videoId, updates } = action.payload;
      const video = state.videoLibrary.find(v => v.videoId === videoId);
      if (video) {
        Object.assign(video, updates);
      }
    },
  },
});

export const { addVideo, deleteVideo, updateVideo } = librarySlice.actions;
export default librarySlice.reducer; 