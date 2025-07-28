import { videoGenerationAxios } from '../../config/axios.config';

/**
 * 아바타 생성 API (POST /avatars/create)
 * - 이미지를 업로드하여 아바타를 생성합니다.
 * - 업로드 이미지는 formData의 'file' 필드로 전달해야 합니다.
 *
 * @param {File|Blob} imageFile - 업로드할 이미지 파일 (정면 인물 사진 권장)
 * @returns {Promise<Object>} 서버 응답 객체
 *   - 성공: { success: true, avatar_id, thumbnail_url, uploaded_url, message }
 *   - 실패(400): { success: false, error, message, retry_required, suggestion }
 *   - 실패(500): { success: false, error, message, retry_required, detail }
 */
export const createAvatar = async (imageUri) => {
  if (!imageUri) {
    throw new Error('이미지 파일이 필요합니다');
  }

  try {
    // URI를 blob으로 변환
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    // React Native 환경에 맞는 FormData 생성
    const formData = new FormData();
    
    // 파일명 추출 (확장자 포함)
    const fileName = imageUri.split('/').pop() || 'image.jpg';
    
    // React Native에서는 File 객체 대신 blob을 직접 사용
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: fileName
    });

    console.log('Request URL:', `${videoGenerationAxios.defaults.baseURL}/avatars`);
    console.log('FormData image:', {
      uri: imageUri,
      type: 'image/jpeg',
      name: fileName
    });
    
    const apiResponse = await videoGenerationAxios.post('/avatars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return apiResponse.data;
  } catch (error) {
    if (error.response) {
      // 서버에서 응답이 온 경우 (400, 500 등)
      return error.response.data;
    } else {
      // 네트워크 오류 또는 기타 예외
      throw error;
    }
  }
};
