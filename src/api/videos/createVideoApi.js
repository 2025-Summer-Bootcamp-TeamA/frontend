import { videoGenerationAxios } from '../../config/axios.config';

/**
 * 영상 생성 API
 * @param {Object} params - 영상 생성에 필요한 파라미터
 * @param {string} params.ocrText - OCR로 추출된 텍스트
 * @param {string} params.museumName - 박물관 이름
 * @param {string} params.avatarId - 아바타 ID
 * @returns {Promise<Object>} 생성된 영상 정보
 */
export const createVideo = async ({ ocrText, museumName, avatarId }) => {
  try {
    console.log('=== 영상 생성 API 호출 시작 ===');
    console.log('전송할 파라미터:', { ocrText, museumName, avatarId });

    // Request body 구성
    const requestBody = {
      ocrText: ocrText || "텍스트 정보 없음",
      museumName: museumName || "박물관 정보 없음", 
      avatarId: avatarId,
      voiceId: "Alice",           // 기본값
      aspectRatio: "9:16",        // 기본값
      resolution: "480p",         // 기본값
      emotion: "cheerful",        // 기본값
      backgroundColor: ""         // 기본값
    };


    const response = await videoGenerationAxios.post('/videos', requestBody);
    
    console.log('=== 영상 생성 API 응답 ===');
    console.log('응답 데이터:', response.data);
    
    return {
      success: true,
      data: response.data,
      videoId: response.data.videoId,
      visionstoryId: response.data.visionstoryId,
      videoUrl: response.data.videoUrl,
      status: response.data.status,
      museumName: response.data.museumName,
      placeId: response.data.placeId,
      artworkInfo: response.data.artworkInfo
    };

  } catch (error) {
    console.error('=== 영상 생성 API 에러 ===');
    
    if (error.response) {
      // 서버에서 응답이 왔지만 에러인 경우
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);
      
      return {
        success: false,
        error: 'API_ERROR',
        status: status,
        message: data.message || '영상 생성 중 오류가 발생했습니다.',
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