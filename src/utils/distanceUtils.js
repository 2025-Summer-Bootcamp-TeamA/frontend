/**
 * 거리를 도보 시간으로 변환하는 함수
 * @param {number} distanceM - 거리 (미터)
 * @returns {string} 도보 시간 문자열
 */
export const formatDistance = (distanceM) => {
  if (distanceM < 100) {
    return `🚶‍♂️ 도보 1분 (${distanceM}m)`;
  } else if (distanceM < 500) {
    const minutes = Math.ceil(distanceM / 80); // 평균 도보 속도 80m/분
    return `🚶‍♂️ 도보 ${minutes}분 (${distanceM}m)`;
  } else if (distanceM < 1000) {
    const minutes = Math.ceil(distanceM / 80);
    return `🚶‍♂️ 도보 ${minutes}분 (${(distanceM / 1000).toFixed(1)}km)`;
  } else {
    const km = (distanceM / 1000).toFixed(1);
    return `🚶‍♂️ 도보 ${Math.ceil(distanceM / 80)}분 (${km}km)`;
  }
};

/**
 * 거리별 색상 반환 함수
 * @param {number} distanceM - 거리 (미터)
 * @returns {string} 색상 코드
 */
export const getDistanceColor = (distanceM) => {
  if (distanceM < 500) return '#4CAF50'; // 녹색 (가까움)
  if (distanceM < 1000) return '#FF9800'; // 주황색 (보통)
  if (distanceM < 3000) return '#FF5722'; // 빨간색 (멀음)
  return '#9E9E9E'; // 회색 (매우 멀음)
}; 