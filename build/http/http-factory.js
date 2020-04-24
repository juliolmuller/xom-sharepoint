"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var axios = require('axios')["default"];

var reqTransformers = require('./transformers/request');

var respTransformers = require('./transformers/response');

var requestInterceptors = require('./interceptors/request');

var responseInterceptors = require('./interceptors/response');

var _require = require('../facades/requests'),
    getRequestDigest = _require.getRequestDigest;
/**
 * Create and configure the custom instance of axios and provide it
 *
 * @param {String} [siteUrl] If no URL is provided, current site's will be used
 * @return {Axios}
 */


module.exports = function (siteUrl) {
  // Create a new axios instance
  var http = axios.create(); // Set base URL for requests

  http.defaults.baseURL = siteUrl || function () {
    var delimiters = new RegExp(['/lists/', '/folders/', '/_layouts/', '/_api/', '/_vti_bin/', '/sitepages/'].join('|'));
    return window.location.href.toLowerCase().split(delimiters)[0];
  }(); // Set request transformers and interceptors


  http.defaults.transformRequest = reqTransformers;
  requestInterceptors.forEach(function (intc) {
    var _http$interceptors$re;

    return (_http$interceptors$re = http.interceptors.request).use.apply(_http$interceptors$re, (0, _toConsumableArray2["default"])(intc.constructor === Function ? intc(http) : intc));
  }); // Set response transformers and interceptors

  http.defaults.transformResponse = respTransformers;
  responseInterceptors.forEach(function (intc) {
    var _http$interceptors$re2;

    return (_http$interceptors$re2 = http.interceptors.response).use.apply(_http$interceptors$re2, (0, _toConsumableArray2["default"])(intc.constructor === Function ? intc(http) : intc));
  }); // Eagerly get request digest

  http.defaults.requestDigest = getRequestDigest(http);
  return http;
};