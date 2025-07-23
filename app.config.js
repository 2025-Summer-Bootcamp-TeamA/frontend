// =============================
// [환경별 실행 방법]
// 개발환경: npx cross-env APP_ENV=development expo start
// 운영환경: npx cross-env APP_ENV=production expo start
// =============================

export default ({ config }) => {
  const isProd = process.env.APP_ENV === 'production';

  return {
    ...config,
    extra: {
      ...config.extra,
      API_BASE_URL: isProd
        ? 'https://api.myapp.com'      // 운영 서버
        : 'https://dev-api.myapp.com', // 개발 서버
    },
  };
}; 