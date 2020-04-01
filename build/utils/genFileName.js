"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Extract file name based on a given input object
 *
 * @param {String|HTMLElement|FileList|File} input Some reference of the input type 'file':
 *          String - if it is a query selector;
 *          HTMLElement - if it is a direct reference to the input element;
 *          FileList - if it is direct reference to the 'files' attribute of the element; and
 *          File - if it is a direct reference to the file.
 *        For the three first options, as it will result in a array of files (FileList), only
 *        the first File of the collection will be selected
 * @return {String}
 */
module.exports = function genFileName(input) {
  switch (input.constructor.name) {
    case 'String':
      input = document.querySelector(input);

    /* fall through */

    case 'HTMLInputElement':
      input = input.files;

    /* fall through */

    case 'FileList':
      var _input = input;

      var _input2 = _slicedToArray(_input, 1);

      input = _input2[0];

    /* fall through */

    case 'File':
      return input.name;

    default:
      return null;
  }
};