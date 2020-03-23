"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var endpoint = require('./config/endpoint');

var genFileBuffer = require('./utils/genFileBuffer');

var toPascalCase = require('./utils/toPascalCase');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {string} listName Base URL of the SharePoint site to connect to
 * @param {Axios} axiosInstance The Axios instance to beused to perform HTTP
 * '                            requests
 */


module.exports = function XomSharePointList(listName, axiosInstance) {
  var _this2 = this;

  /**
   * Ensure pointer to propper 'this'
   *
   * @private
   * @final
   * @var {this}
   */
  var _this = this;
  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {string}
   */


  var _listName = listName;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = axiosInstance;
  /**
   * Define property to get & set 'siteUrl' value
   *
   * @property {string} siteUrl
   */

  Object.defineProperty(_this, 'siteUrl', {
    get: function get() {
      return _http.defaults.apiUri;
    },
    set: function set(siteUrl) {
      _http.defaults.apiUri = siteUrl;
    }
  });
  /**
   * Define property to get & set 'listName' value
   *
   * @property {string} listName
   */

  Object.defineProperty(_this, 'listName', {
    get: function get() {
      return toPascalCase(_listName);
    },
    set: function set(listName) {
      _listName = listName;
    }
  });
  /**
   * Define property to get 'apiUri' value
   *
   * @property {string} apiUri
   */

  Object.defineProperty(_this, 'apiUri', {
    get: function get() {
      return endpoint.listItems(_this.listName);
    }
  });
  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise<Object[]>}
   */

  _this.get = function (params) {
    return new Promise(function (resolve, reject) {
      _http.get(_this.apiUri + (params || '')).then(function (response) {
        return resolve(response.data.d.results || response.data.d);
      })["catch"](reject);
    });
  };
  /**
   * Perform a GET request to API to obtain a single record based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @return {Promise<Object>}
   */


  _this.getOne = function (id) {
    return new Promise(function (resolve, reject) {
      _http.get("".concat(_this.apiUri, "(").concat(id, ")")).then(function (response) {
        return resolve(response.data.d);
      })["catch"](reject);
    });
  };
  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise<Object>}
   */


  _this.post = function (data) {
    return new Promise(function (resolve, reject) {
      _http.post(_this.apiUri, data).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](reject);
    });
  };
  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise<Object>}
   */


  _this.update = function (id, data) {
    return _http.post(_this.apiUri + "(".concat(id, ")"), data, {
      headers: _objectSpread({}, _http.defaults.headers.common, {
        'X-Http-Method': 'MERGE',
        'If-Match': '*'
      })
    });
  };
  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise<Object>}
   */


  _this["delete"] = function (id) {
    return _http.post(_this.apiUri + "(".concat(id, ")"), {}, {
      headers: _objectSpread({}, _http.defaults.headers.common, {
        'X-Http-Method': 'DELETE',
        'If-Match': '*'
      })
    });
  };
  /**
   * Get the Request Digest for the context
   *
   * @return {Promise<String>}
   */


  _this.getRequestDigest = function () {
    return new Promise(function (resolve, reject) {
      _http.post(endpoint.contextInfo(), {}).then(function (_ref) {
        var data = _ref.data;
        return resolve(data.FormDigestValue || data.d.GetContextWebInformation.FormDigestValue);
      })["catch"](reject);
    });
  };
  /**
   * Perform a GET request to API return a list of the files attached to a list item
   *
   * @param {number} itemId Identification number for the record to be changed
   * @return {Promise<Object[]>}
   */


  _this.getAttachments = function (itemId) {
    return new Promise(function (resolve, reject) {
      _http.get(endpoint.listItemsAttachment(_this.listName, itemId)).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](reject);
    });
  };
  /**
   * Upload a file attachment to a list item
   *
   * @param {number} itemId
   * @param {string|HTMLElement|FileList|File} fileInput Some reference of the input type 'file':
   *          String - if it is a query selector;
   *          HTMLElement - if it is a direct reference to the input element;
   *          FileList - if it is direct reference to the 'files' attribute of the element; and
   *          File - if it is a direct reference to the file.
   *        For the three first options, as it will result in a array of files (FileList), only
   *        the first File of the collection will be selected. If you want to get the byte buffer
   *        of other files, provide a File instance explicitaly
   * @param {string} [fileName] Define a different name to be set to the uploaded file
   * @return {Promise<Object>}
   */


  _this.postAttachment = function (itemId, fileInput, fileName) {
    return new Promise(function (resolve, reject) {
      var requests = [genFileBuffer(fileInput), _this.getRequestDigest()];
      Promise.all(requests).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            fileBuffer = _ref3[0],
            requestDigest = _ref3[1];

        fileName = fileName || function () {
          switch (fileInput.constructor.name) {
            case 'String':
              fileInput = document.querySelector(fileInput);

            case 'HTMLInputElement':
              fileInput = fileInput.files;

            case 'FileList':
              fileInput = fileInput[0];

            case 'File':
              return fileInput.name;
          }
        }();

        _http.post("".concat(endpoint.listItemsAttachment(_this2.listName, itemId), "/add(filename='").concat(fileName, "')"), fileBuffer, {
          headers: _objectSpread({}, _http.defaults.headers.common, {
            'X-RequestDigest': requestDigest
          })
        }).then(function (response) {
          return resolve(response.data.d);
        })["catch"](reject);
      })["catch"](reject);
    });
  };
  /**
   * Perform a POST request to rename a given list item attachment
   *
   * @param {number} itemId Identification number for the record to be changed
   * @param {string} oldFileName Existing file name
   * @param {string} newFileName Name to be set to selected file
   * @return {Promise}
   */


  _this.renameAttachment = function (itemId, oldFileName, newFileName) {
    return new Promise(function (resolve, reject) {
      var requests = [_this.getAttachments(itemId), _this.getRequestDigest()];
      Promise.all(requests).then(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            attachments = _ref5[0],
            requestDigest = _ref5[1];

        var targetFile = attachments.filter(function (att) {
          return att.FileName === oldFileName;
        })[0];
        var newUrl = targetFile.ServerRelativeUrl.replace(oldFileName, newFileName);

        _http.post("".concat(endpoint.serverResource(targetFile.ServerRelativeUrl), "/moveto(newurl='").concat(newUrl, "', flags=1)"), {}, {
          headers: _objectSpread({}, _http.defaults.headers.common, {
            'X-RequestDigest': requestDigest,
            'X-Http-Method': 'PUT',
            'If-Match': '*'
          })
        }).then(resolve)["catch"](reject);
      })["catch"](reject);
    });
  };
  /**
   * Perform a POST request to delete a given list item attachment
   *
   * @param {number} itemId Identification number for the record to be changed
   * @param {string} fileName Existing file name
   * @return {Promise}
   */


  _this.deleteAttachment = function (itemId, fileName) {
    return new Promise(function (resolve, reject) {
      _this.getRequestDigest().then(function (requestDigest) {
        _http.post("".concat(endpoint.listItemsAttachment(_this2.listName, itemId), "/getByFileName('").concat(fileName, "')"), {}, {
          headers: _objectSpread({}, _http.defaults.headers.common, {
            'X-RequestDigest': requestDigest,
            'X-Http-Method': 'DELETE',
            'If-Match': '*'
          })
        }).then(resolve)["catch"](reject);
      })["catch"](reject);
    });
  };
};