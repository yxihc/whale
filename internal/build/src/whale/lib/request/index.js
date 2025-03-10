'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cacheManager = require('./request-cache/cacheManager.js');
var useLocalStorageCache = require('./request-cache/imp/useLocalStorageCache.js');
var useMemoryCache = require('./request-cache/imp/useMemoryCache.js');
var useSessionStorageCache = require('./request-cache/imp/useSessionStorageCache.js');
var requestOptions = require('./request-core/requestOptions.js');
var utils = require('./request-core/utils.js');
var requestManager = require('./request-core/requestManager.js');



exports.CacheManager = cacheManager.CacheManager;
exports.injectCache = cacheManager.injectCache;
exports.requestCache = cacheManager.requestCache;
exports.useCache = cacheManager.useCache;
exports.useLocationStorageCache = useLocalStorageCache.useLocationStorageCache;
exports.useMemoryCache = useMemoryCache.useMemoryCache;
exports.useSessionStorageCache = useSessionStorageCache.useSessionStorageCache;
exports.defaultRequestOptions = requestOptions.defaultRequestOptions;
exports.getDefaultCacheOptions = requestOptions.getDefaultCacheOptions;
exports.actualErrorRetryInterval = utils.actualErrorRetryInterval;
exports.inject = requestManager.inject;
exports.setGlobalOptions = requestManager.setGlobalOptions;
exports.useRequestor = requestManager.useRequestor;
Object.defineProperty(exports, 'whaleRequest', {
	enumerable: true,
	get: function () { return requestManager.whaleRequest; }
});
//# sourceMappingURL=index.js.map
