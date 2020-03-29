"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var axios = require('axios')["default"];

var redefinePostRequest = require('./requests/redefinePostRequest');

var redefineDeleteRequest = require('./requests/redefineDeleteRequest');

var redefinePutRequest = require('./requests/redefinePutRequest');

var setDefaultHeaders = require('./requests/setDefaultHeaders');

var convertResponseDates = require('./transform/convertResponseDates');

var extractResponseData = require('./transform/extractResponseData');
/**
 * Create a custom instance of axios
 *
 * @param {string} [siteUrl] If no URL is provided, current site's will be used
 * @return {Axios}
 */


module.exports = function xomHttpFactory(siteUrl) {
  var http = axios.create(); // Define request defaults

  http.defaults.baseURL = siteUrl || function () {
    var delimiters = new RegExp(['/lists/', '/folders/', '/_layouts/', '_api', '/_vti_bin/'].join('|'));
    return window.location.href.toLowerCase().split(delimiters)[0];
  }(); // Define default headers


  setDefaultHeaders(http); // Redefine methods to perform requests

  redefinePostRequest(http);
  redefineDeleteRequest(http);
  redefinePutRequest(http); // Define response transformation

  http.defaults.transformResponse = [].concat(_toConsumableArray(http.defaults.transformResponse), [extractResponseData, convertResponseDates]);
  return http;
};