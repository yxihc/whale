'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cacheManager = require('./cacheManager.js');
var useLocalStorageCache = require('./imp/useLocalStorageCache.js');
var useMemoryCache = require('./imp/useMemoryCache.js');
var useSessionStorageCache = require('./imp/useSessionStorageCache.js');



exports.CacheManager = cacheManager.CacheManager;
exports.injectCache = cacheManager.injectCache;
exports.requestCache = cacheManager.requestCache;
exports.useCache = cacheManager.useCache;
exports.useLocationStorageCache = useLocalStorageCache.useLocationStorageCache;
exports.useMemoryCache = useMemoryCache.useMemoryCache;
exports.useSessionStorageCache = useSessionStorageCache.useSessionStorageCache;
//# sourceMappingURL=index.js.map
