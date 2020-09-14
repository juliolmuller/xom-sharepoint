"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Register the interceptors in the XomApiClient instance.
 */

function registerInterceptor(http, at) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (events) {
    var _http$interceptors$at;

    var isFunction = typeof events === 'function';
    var interceptionEvents = isFunction ? events(http) : events;

    (_http$interceptors$at = http.interceptors[at]).use.apply(_http$interceptors$at, (0, _toConsumableArray2["default"])(interceptionEvents));
  };
}

exports["default"] = registerInterceptor;