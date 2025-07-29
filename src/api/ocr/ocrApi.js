import { jsonAxios } from '../../config/axios.config';

/**
 * OCR API - 이미지에서 텍스트 추출
 * @param {FormData} imageFormData - 업로드할 이미지 파일 (multipart/form-data)
 * @returns {Promise<Object>} OCR 결과
 * @returns {string} ocr_text - 추출된 텍스트
 */
export const performOcr = async (imageFormData) => {
  try {
    const response = await jsonAxios.post('/ocr', imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('OCR API 호출 실패:', error);
    throw error;
  }
};

/**
 * 이미지 파일을 FormData로 변환하여 OCR 수행
 * @param {Object} imageFile - 이미지 파일 객체 (React Native에서 선택된 파일)
 * @returns {Promise<Object>} OCR 결과
 */
export const performOcrWithImage = async (imageFile) => {
  try {
    const formData = new FormData();
    
    // 이미지 파일을 FormData에 추가
    formData.append('image', {
      uri: imageFile.uri,
      type: imageFile.type || 'image/jpeg',
      name: imageFile.name || 'image.jpg',
    });

    return await performOcr(formData);
  } catch (error) {
    console.error('이미지 OCR 처리 실패:', error);
    throw error;
  }
};

/**
 * 이미지 URI로부터 OCR 수행
 * @param {string} imageUri - 이미지 URI
 * @param {string} imageType - 이미지 타입 (기본값: 'image/jpeg')
 * @param {string} fileName - 파일명 (기본값: 'image.jpg')
 * @returns {Promise<Object>} OCR 결과
 */
export const performOcrWithUri = async (imageUri, imageType = 'image/jpeg', fileName = 'image.jpg') => {
  try {
    const formData = new FormData();
    
    formData.append('image', {
      uri: imageUri,
      type: imageType,
      name: fileName,
    });

    return await performOcr(formData);
  } catch (error) {
    console.error('URI 기반 OCR 처리 실패:', error);
    throw error;
  }
}; 