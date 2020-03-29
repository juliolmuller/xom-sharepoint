"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var endpoint = require('../config/endpoint');

var httpFactory = require('../http/xomHttpFactory');

var genFileBuffer = require('../utils/genFileBuffer');

var toPascalCase = require('../utils/toPascalCase');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {string} listTitle List title/name to connect to
 * @param {Axios} axiosInstance The Axios instance to beused to perform HTTP
 * '                            requests
 */


module.exports = function XomSharePointList(listTitle, axiosInstance) {
  var _this = this;

  /**
   * Store the SharePoint list title
   *
   * @private
   * @var {string}
   */
  var _title = listTitle;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = axiosInstance || httpFactory();
  /**
   * Define property to get & set 'title' value
   *
   * @property {string} title
   */


  Object.defineProperty(this, 'title', {
    get: function get() {
      return _title;
    },
    set: function set(listTitle) {
      _title = listTitle;
    }
  });
  /**
   * Define property to get 'name' value
   *
   * @property {string} name
   */

  Object.defineProperty(this, 'name', {
    get: function get() {
      return toPascalCase(_title);
    }
  });
  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise}
   */

  this.getAll = function (params) {
    return _http.get(endpoint.listItems(_this.name) + (params || ''));
  };
  /**
   * Perform a GET request to API to obtain a single record based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @return {Promise}
   */


  this.getItem = function (id) {
    return _http.get("".concat(endpoint.listItems(_this.name), "(").concat(id, ")"));
  };
  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise}
   */


  this.createItem = function (data) {
    return _http.post(endpoint.listItems(_this.name), data);
  };
  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise}
   */


  this.updateItem = function (id, data) {
    return _http.put("".concat(endpoint.listItems(_this.name), "(").concat(id, ")"), data);
  };
  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */


  this.deleteItem = function (id) {
    return _http["delete"]("".concat(endpoint.listItems(_this.name), "(").concat(id, ")"));
  };
  /**
   * Get the Request Digest for the context
   *
   * @return {Promise}
   */


  this.getRequestDigest = function () {
    return _http.post(endpoint.contextInfo(), {}).then(function (_ref) {
      var data = _ref.data;
      return data.FormDigestValue || data.GetContextWebInformation.FormDigestValue;
    });
  };
  /**
   * Perform a GET request to API return a list of the files attached to a list item
   *
   * @param {number} itemId Identification number for the record to be changed
   * @return {Promise}
   */


  this.getAttachments = function (itemId) {
    return _http.get(endpoint.listItemsAttachment(_this.title, itemId));
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
   * @return {Promise}
   */


  this.uploadAttachment = function (itemId, fileInput, fileName) {
    return Promise.all([genFileBuffer(fileInput), _this.getRequestDigest()]).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          fileBuffer = _ref3[0],
          requestDigest = _ref3[1];

      fileName = fileName || function () {
        switch (fileInput.constructor.name) {
          case 'String':
            fileInput = document.querySelector(fileInput);

          /* fall through */

          case 'HTMLInputElement':
            fileInput = fileInput.files;

          /* fall through */

          case 'FileList':
            var _fileInput = fileInput;

            var _fileInput2 = _slicedToArray(_fileInput, 1);

            fileInput = _fileInput2[0];

          /* fall through */

          case 'File':
            return fileInput.name;

          default:
            return null;
        }
      }();

      return _http.post("".concat(endpoint.listItemsAttachment(_this.title, itemId), "/add(filename='").concat(fileName, "')"), fileBuffer, {
        digest: requestDigest
      });
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


  this.renameAttachment = function (itemId, oldFileName, newFileName) {
    return Promise.all([_this.getAttachments(itemId), _this.getRequestDigest()]).then(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          attachments = _ref5[0],
          requestDigest = _ref5[1];

      var targetFile = attachments.data.filter(function (att) {
        return att.FileName === oldFileName;
      })[0];
      var newUrl = targetFile.ServerRelativeUrl.replace(oldFileName, newFileName);
      return _http.put("".concat(endpoint.serverResource(targetFile.ServerRelativeUrl), "/moveto(newurl='").concat(newUrl, "', flags=1)"), {}, {
        digest: requestDigest
      });
    });
  };
  /**
   * Perform a POST request to delete a given list item attachment
   *
   * @param {number} itemId Identification number for the record to be changed
   * @param {string} fileName Existing file name
   * @return {Promise}
   */


  this.deleteAttachment = function (itemId, fileName) {
    return _this.getRequestDigest().then(function (requestDigest) {
      return _http["delete"]("".concat(endpoint.listItemsAttachment(_this.title, itemId), "/getByFileName('").concat(fileName, "')"), {
        digest: requestDigest
      });
    });
  };
};