class MemoryCacheStore {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  async get(key) {
    return this.store.get(key);
  }
  async set(key, value) {
    this.store.set(key, value);
  }
  async delete(key) {
    this.store.delete(key);
  }
  async has(key) {
    return this.store.has(key);
  }
}
function useMemoryCache() {
  return new MemoryCacheStore();
}

export { useMemoryCache };
//# sourceMappingURL=useMemoryCache.mjs.map
