import { jsonAxios } from '../../config/axios.config';

/**
 * 근처 박물관 검색 API (POST /places/museums/)
 * - 현재 위치(위도, 경도)를 기반으로 근처의 박물관을 검색합니다.
 * - 반경과 키워드를 지정하여 검색 범위를 조정할 수 있습니다.
 *
 * @param {Object} params - 검색 파라미터
 * @param {number} params.latitude - 위도 (-90 ~ 90)
 * @param {number} params.longitude - 경도 (-180 ~ 180)
 * @param {number} [params.radius=3000] - 검색 반경 (미터 단위, 기본값: 3000)
 * @param {string} [params.keyword='museum'] - 검색 키워드 (기본값: 'museum')
 * @returns {Promise<Array<NearbyMuseumResponse>>}
 */
export const searchNearbyMuseums = async ({
  latitude,
  longitude,
  radius = 5000,
  keyword = 'museum'
}) => {
  // 필수 파라미터 검증
  if (latitude === undefined || latitude === null) {
    throw new Error('latitude가 필요합니다.');
  }
  if (longitude === undefined || longitude === null) {
    throw new Error('longitude가 필요합니다.');
  }

  // 위도 범위 검증 (-90 ~ 90)
  if (latitude < -90 || latitude > 90) {
    throw new Error('latitude는 -90에서 90 사이의 값이어야 합니다.');
  }

  // 경도 범위 검증 (-180 ~ 180)
  if (longitude < -180 || longitude > 180) {
    throw new Error('longitude는 -180에서 180 사이의 값이어야 합니다.');
  }

  // 반경 검증 (최소 1)
  if (radius < 1) {
    throw new Error('radius는 1 이상의 값이어야 합니다.');
  }

  // 키워드 검증 (최소 1자)
  if (keyword && keyword.length < 1) {
    throw new Error('keyword는 최소 1자 이상이어야 합니다.');
  }

  try {
    const requestBody = {
      latitude,
      longitude,
      radius,
      keyword
    };

    const response = await jsonAxios.post('/places/museums/', requestBody);

    // 응답 데이터 검증
    if (!Array.isArray(response.data)) {
      throw new Error('응답 데이터가 올바르지 않습니다.');
    }

    // 각 박물관 데이터의 필수 필드 검증
    const museums = response.data.map((museum, index) => {
      if (!museum.name || !museum.address || !museum.place_id || 
          museum.latitude === undefined || museum.longitude === undefined) {
        throw new Error(`박물관 데이터 ${index + 1}의 필수 필드가 누락되었습니다.`);
      }
      return museum;
    });

    return museums;
  } catch (error) {
    console.error('근처 박물관 검색 실패:', error);
    throw error;
  }
};

/**
 * NearbyMuseumResponse 타입 정의
 * @typedef {Object} NearbyMuseumResponse
 * @property {string} name - 박물관 이름
 * @property {string} address - 박물관 주소
 * @property {string} place_id - Google Places API의 place_id
 * @property {number} latitude - 위도
 * @property {number} longitude - 경도
 */
