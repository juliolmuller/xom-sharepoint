"use strict";

/**
 * Define axios' common headers
 *
 * @param {Axios} axiosInstance
 */
module.exports = function setDefaultHeaders(axiosHeaders) {
  axiosHeaders.defaults.withCredentials = true;
  axiosHeaders.defaults.headers.common = {
    'Accept': 'application/json;odata=verbose',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json;odata=verbose'
  };
};