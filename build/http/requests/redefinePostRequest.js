"use strict";

/**
 * Redefine axios' POST request
 *
 * @param {Axios} axiosInstance
 */
module.exports = function redefinePostRequest(axiosInstance) {
  var _post = axiosInstance.post;

  axiosInstance.post = function (url, data, config) {
    config = config || {};
    config.headers = config.headers || this.defaults.headers.common;

    if (config.requestDigest) {
      config.headers['X-RequestDigest'] = config.requestDigest;
    }

    return _post(url, data, config);
  };
};