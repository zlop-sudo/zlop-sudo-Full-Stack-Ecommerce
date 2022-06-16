"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

exports.webcrypto = exports.btoa = exports.atob = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _weakMap = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/weak-map"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _atob = _interopRequireDefault(require("atob"));

var _btoa = _interopRequireDefault(require("btoa"));

var _webcrypto = require("@peculiar/webcrypto");

function _getRequireWildcardCache(nodeInterop) { if (typeof _weakMap.default !== "function") return null; var cacheBabelInterop = new _weakMap.default(); var cacheNodeInterop = new _weakMap.default(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _getOwnPropertyDescriptor.default; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? (0, _getOwnPropertyDescriptor.default)(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let a;
exports.atob = a;

if (typeof atob !== 'undefined') {
  exports.atob = a = atob;
} else {
  exports.atob = a = _atob.default;
}

let b;
exports.btoa = b;

if (typeof btoa !== 'undefined') {
  exports.btoa = b = btoa;
} else {
  exports.btoa = b = _btoa.default;
}

const crypto = (async () => {
  try {
    return await _promise.default.resolve().then(() => _interopRequireWildcard(require('crypto')));
  } catch (err) {
    // this environment has no crypto module!
    return undefined;
  }
})();

let webcrypto;
exports.webcrypto = webcrypto;

if (typeof crypto !== 'undefined' && crypto['webcrypto']) {
  exports.webcrypto = webcrypto = crypto['webcrypto'];
} else {
  exports.webcrypto = webcrypto = new _webcrypto.Crypto();
}
//# sourceMappingURL=node.js.map