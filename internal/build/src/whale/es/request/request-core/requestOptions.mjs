const defaultRequestOptions = {
  cache: getDefaultCacheOptions()
};
function getDefaultCacheOptions() {
  return {
    duration: 60 * 1e3,
    key: (config) => {
      return defaultCacheKey(config);
    },
    isPersist: false
  };
}
function defaultCacheKey(options) {
  const cacheKey = `${options.url}_${JSON.stringify(
    options.params || {}
  )}_${JSON.stringify(options.data || {})}`;
  return cacheKey;
}

export { defaultRequestOptions, getDefaultCacheOptions };
//# sourceMappingURL=requestOptions.mjs.map
