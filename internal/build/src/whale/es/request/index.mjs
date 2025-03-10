export { CacheManager, injectCache, requestCache, useCache } from './request-cache/cacheManager.mjs';
export { useLocationStorageCache } from './request-cache/imp/useLocalStorageCache.mjs';
export { useMemoryCache } from './request-cache/imp/useMemoryCache.mjs';
export { useSessionStorageCache } from './request-cache/imp/useSessionStorageCache.mjs';
export { defaultRequestOptions, getDefaultCacheOptions } from './request-core/requestOptions.mjs';
export { actualErrorRetryInterval } from './request-core/utils.mjs';
export { inject, setGlobalOptions, useRequestor, whaleRequest } from './request-core/requestManager.mjs';
//# sourceMappingURL=index.mjs.map
