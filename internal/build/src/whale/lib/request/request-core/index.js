'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var requestOptions = require('./requestOptions.js');
var utils = require('./utils.js');
var requestManager = require('./requestManager.js');



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
