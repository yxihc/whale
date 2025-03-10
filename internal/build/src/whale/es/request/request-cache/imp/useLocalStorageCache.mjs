class LocalStorageCacheStore {
  constructor() {
    this.storage = localStorage;
  }
  async get(key) {
    const item = this.storage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return void 0;
  }
  async set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  async delete(key) {
    this.storage.removeItem(key);
  }
  async has(key) {
    return this.storage.getItem(key) !== null;
  }
}
function useLocationStorageCache() {
  return new LocalStorageCacheStore();
}

export { useLocationStorageCache };
//# sourceMappingURL=useLocalStorageCache.mjs.map
