'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodashEs = require('lodash-es');
var cacheManager = require('../request-cache/cacheManager.js');
var requestOptions = require('./requestOptions.js');
var utils = require('./utils.js');

class WhaleRequest {
  static create(client) {
    return new WhaleRequest(client);
  }
  constructor(client) {
    this.client = client;
  }
  async applyRequestInterceptors(options) {
    return this.applyInterceptors(options, this.client.requestInterceptors);
  }
  async applyResponseInterceptors(options) {
    return this.applyInterceptors(options, this.client.responseInterceptors);
  }
  async applyInterceptors(options, interceptors) {
    if (interceptors) {
      interceptors == null ? void 0 : interceptors.forEach((interceptor) => {
        options = options.then(interceptor);
      });
    }
    return options;
  }
  async applyErrorInterceptors(error) {
    if (this.client.errorInterceptors) {
      for (const interceptor of this.client.errorInterceptors) {
        error = await interceptor(error);
      }
    }
    return Promise.reject(error);
  }
  async getCachedResponse(requestCache, options, cacheOptions) {
    if (!requestCache || !cacheOptions)
      return void 0;
    if (!requestCache.has(cacheOptions.key(options))) {
      return void 0;
    }
    const key = cacheOptions.key(options);
    if (cacheOptions.isValid) {
      if (cacheOptions.isValid(key, options)) {
        return requestCache.getNormal(key);
      }
    } else {
      return requestCache.get(key);
    }
    return void 0;
  }
  async applyCache(chain, options, method) {
    const cacheOptions = (options == null ? void 0 : options.cache) || requestOptions.getDefaultCacheOptions();
    const requestCache = cacheManager.useCache(cacheOptions.isPersist);
    const requestFunc = async () => {
      try {
        const response = await method(options);
        if (cacheOptions && requestCache && options.useCache) {
          requestCache.set(
            cacheOptions.key(options),
            response,
            cacheOptions.duration
          );
        }
        return response;
      } catch (error) {
        if (options.retry && options.retry > 0) {
          throw error;
        } else {
          await this.applyErrorInterceptors(error);
        }
      }
    };
    if (options == null ? void 0 : options.useCache) {
      const cachedResponse = await this.getCachedResponse(
        requestCache,
        options,
        cacheOptions
      );
      if (cachedResponse) {
        chain = chain.then(async () => {
          return Promise.resolve(cachedResponse);
        });
        return chain;
      }
    }
    if ((options == null ? void 0 : options.retry) && options.retry > 0) {
      chain = this.retry(
        requestFunc,
        options.retry,
        options.retryInterval ? options.retryInterval : utils.actualErrorRetryInterval(options.retry)
      );
    } else {
      chain = chain.then(requestFunc);
    }
    return chain;
  }
  async retry(fn, retries, interval) {
    let attempts = 0;
    while (attempts < retries) {
      try {
        return await fn();
      } catch (error) {
        attempts++;
        if (attempts >= retries) {
          await this.applyErrorInterceptors(error);
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
    throw new Error("Exceeded maximum retries");
  }
  async request(method, options) {
    options = this.normalizeOptions(options);
    let chain = Promise.resolve(options);
    chain = this.applyRequestInterceptors(chain);
    chain = this.applyCache(chain, options, method);
    chain = this.applyResponseInterceptors(chain);
    return chain;
  }
  normalizeOptions(options) {
    return lodashEs.defaultsDeep(options, requestOptions.defaultRequestOptions);
  }
  get(options) {
    return this.request(this.client.get, options);
  }
  async post(options) {
    return this.request(this.client.post, options);
  }
}
exports.whaleRequest = void 0;
function inject(requestor) {
  console.log("aadsassadsdsa");
  exports.whaleRequest = WhaleRequest.create(requestor);
}
function useRequestor() {
  return exports.whaleRequest;
}
function setGlobalOptions(options) {
  Object.keys(options).forEach((key) => {
    requestOptions.defaultRequestOptions[key] = options[key];
  });
}

exports["default"] = WhaleRequest;
exports.inject = inject;
exports.setGlobalOptions = setGlobalOptions;
exports.useRequestor = useRequestor;
//# sourceMappingURL=requestManager.js.map
