import { jsonAxios } from '../../config/axios.config';

/**
 * 비디오 조회 API
 * @param {string} id - 조회할 비디오의 ID
 * @returns {Promise<Object>} 비디오 상세 정보
 */
export const getVideo = async (id) => {
  try {
    console.log('=== 비디오 조회 API 호출 시작 ===');
    console.log('조회할 비디오 ID:', id);

    const response = await jsonAxios.get(`/videos/${id}`);
    
    console.log('=== 비디오 조회 API 응답 ===');
    console.log('응답 데이터:', response.data);
    
    return {
      success: true,
      data: response.data,
      id: response.data.id,
      placeId: response.data.placeId,
      title: response.data.title,
      artist: response.data.artist,
      description: response.data.description,
      thumbnailUrl: response.data.thumbnailUrl,
      videoUrl: response.data.videoUrl,
      createdAt: response.data.createdAt
    };

  } catch (error) {
    console.error('=== 비디오 조회 API 에러 ===');
    
    if (error.response) {
      // 서버에서 응답이 왔지만 에러인 경우
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);
      
      return {
        success: false,
        error: 'API_ERROR',
        status: status,
        message: data.message || '비디오 조회 중 오류가 발생했습니다.',
        detail: data
      };
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      console.error('네트워크 오류:', error.request);
      
      return {
        success: false,
        error: 'NETWORK_ERROR',
        message: '네트워크 연결을 확인해주세요.'
      };
    } else {
      // 요청 설정 자체에 문제가 있는 경우
      console.error('요청 설정 오류:', error.message);
      
      return {
        success: false,
        error: 'REQUEST_ERROR',
        message: '요청 설정 중 오류가 발생했습니다.'
      };
    }
  }
};