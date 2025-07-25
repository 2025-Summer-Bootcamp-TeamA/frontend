export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      API_BASE_URL: 'https://hiedu.site/',
    },
  };
}; 