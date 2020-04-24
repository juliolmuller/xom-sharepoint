"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

/**
 * Generate a byte buffer from a HTML file input
 *
 * @param {String|HTMLElement|FileList|File} baseInput Some reference of the input type 'file':
 *          String - if it is a query selector;
 *          HTMLElement - if it is a direct reference to the input element;
 *          FileList - if it is direct reference to the 'files' attribute of the element; and
 *          File - if it is a direct reference to the file.
 *        For the three first options, as it will result in a array of files (FileList), only
 *        the first File of the collection will be selected. If you want to get the byte buffer
 *        of other files, provide a File instance explicitaly
 * @return {Promise<ArrayBuffer>}
 */
module.exports = function genFileBuffer(baseInput) {
  var input = baseInput;
  var reader = new FileReader();

  var file = function () {
    switch (input.constructor.name) {
      case 'String':
        input = document.querySelector(input);

      /* fall through */

      case 'HTMLInputElement':
        input = input.files;

      /* fall through */

      case 'FileList':
        var _input = input;

        var _input2 = (0, _slicedToArray2["default"])(_input, 1);

        input = _input2[0];

      /* fall through */

      case 'File':
        return input;

      default:
        throw new TypeError('Type must be an instance of HTMLInputElement, FileList, File or String (input selector)');
    }
  }();

  return new Promise(function (resolve, reject) {
    reader.onloadend = function (ev) {
      return resolve(ev.target.result);
    };

    reader.onerror = function (ev) {
      return reject(ev.target.error);
    };

    reader.readAsArrayBuffer(file);
  });
};