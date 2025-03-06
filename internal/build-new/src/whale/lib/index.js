'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var components = require('@whale/components');



Object.keys(components).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return components[k]; }
	});
});
//# sourceMappingURL=index.js.map
