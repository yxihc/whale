'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useLocalStorageCache = require('./imp/useLocalStorageCache.js');
var useSessionStorageCache = require('./imp/useSessionStorageCache.js');

class CacheManager {
  constructor(store) {
    this.store = store;
  }
  static create(store) {
    return new CacheManager(store);
  }
  async get(key) {
    const item = await this.store.get(key);
    if (item == null ? void 0 : item.noExpire) {
      return item.value;
    } else {
      if (item && item.expiration > Date.now()) {
        return item.value;
      } else {
        if (item) {
          await this.store.delete(key);
        }
        return void 0;
      }
    }
  }
  async getNormal(key) {
    const item = await this.store.get(key);
    return item == null ? void 0 : item.value;
  }
  async set(key, value, ttl) {
    let expiration = 0;
    let noExpire = false;
    if (!ttl) {
      noExpire = true;
    } else {
      expiration = Date.now() + ttl;
    }
    await this.store.set(key, { value, expiration, noExpire });
  }
  async delete(key) {
    await this.store.delete(key);
  }
  async has(key) {
    return this.store.has(key);
  }
}
const requestCache = {
  memoryCache: {},
  persistCache: {}
};
function injectCache(memoryCache, persistCache) {
  requestCache.memoryCache = memoryCache;
  requestCache.persistCache = persistCache;
}
function useCache(isPersist) {
  if (!requestCache.memoryCache) {
    requestCache.memoryCache = useSessionStorageCache.useSessionStorageCache();
  }
  if (!requestCache.persistCache) {
    requestCache.persistCache = useLocalStorageCache.useLocationStorageCache();
  }
  return CacheManager.create(
    isPersist ? requestCache.persistCache : requestCache.memoryCache
  );
}

exports.CacheManager = CacheManager;
exports.injectCache = injectCache;
exports.requestCache = requestCache;
exports.useCache = useCache;
//# sourceMappingURL=cacheManager.js.map
