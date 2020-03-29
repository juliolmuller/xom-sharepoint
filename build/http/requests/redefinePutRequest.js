"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Redefine axios' PUT request
 *
 * @param {Axios} axiosInstance
 */
module.exports = function redefinePutRequest(axiosInstance) {
  axiosInstance.put = function (url, data, config) {
    var _this = this;

    config = config || {};
    config.headers = config.headers || _objectSpread({}, this.defaults.headers.common, {
      'X-Http-Method': config.digest ? 'PUT ' : 'MERGE',
      'If-Match': '*'
    });

    if (config.digest) {
      return this.post(url, data, config);
    }

    return new Promise(function (resolve) {
      _this.post(url, data, config).then(function (response) {
        _this.get(url).then(function (_ref) {
          var data = _ref.data;
          response.data = data;
          resolve(response);
        });
      });
    });
  };
};