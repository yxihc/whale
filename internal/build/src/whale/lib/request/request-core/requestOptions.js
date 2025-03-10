'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.defaultRequestOptions = defaultRequestOptions;
exports.getDefaultCacheOptions = getDefaultCacheOptions;
//# sourceMappingURL=requestOptions.js.map
