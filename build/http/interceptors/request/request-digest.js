"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Add the header for the request digest token
 *
 * @param {Axios} httpInstance
 * @return {Array<Function>}
 */
module.exports = function (httpInstance) {
  return [
  /*#__PURE__*/
  // on success
  function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(config) {
      var digest, method;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              digest = config.digest, method = config.method;

              if (!(digest !== false && /post/i.test(method))) {
                _context.next = 11;
                break;
              }

              config.method = 'post';
              _context.t0 = _objectSpread;
              _context.t1 = {};
              _context.t2 = config.headers;
              _context.next = 8;
              return httpInstance.defaults.requestDigest;

            case 8:
              _context.t3 = _context.sent;
              _context.t4 = {
                'X-RequestDigest': _context.t3
              };
              config.headers = (0, _context.t0)(_context.t1, _context.t2, _context.t4);

            case 11:
              return _context.abrupt("return", config);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()];
};