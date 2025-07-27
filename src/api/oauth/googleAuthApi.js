import { jsonAxios } from '../../config/axios.config';

/**
 * Google OAuth 로그인 (POST /users/google)
 * - Google OAuth로 받은 id_token을 Request Body에 담아 서버에 전달합니다.
 * - 응답으로 accessToken, refreshToken을 반환합니다.
 *
 * @param {string} idToken - Google OAuth에서 받은 id_token
 * @returns {Promise<{ accessToken: string, refreshToken: string }>}
 */
export const googleLogin = async (idToken) => {
  if (!idToken) {
    throw new Error('id_token이 필요합니다.');
  }

  try {
    const response = await jsonAxios.post('/users/google', {
      id_token: idToken,
    });

    const { accessToken, refreshToken } = response.data;
    if (!accessToken || !refreshToken) {
      throw new Error('로그인 실패: 응답 데이터가 올바르지 않습니다.');
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Google OAuth 로그인 실패:', error);
    throw error;
  }
}; 