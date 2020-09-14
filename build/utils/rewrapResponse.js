"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Taxes an AxiosResponse and rewrap it as a XomApiRawResponse object.
 */

function rewrapResponse(response) {
  var data = response.data,
      metadata = (0, _objectWithoutProperties2["default"])(response, ["data"]);
  var newResponse = data || {};
  Object.defineProperty(newResponse, '__response', {
    value: metadata,
    writable: true
  });
  return newResponse;
}

exports["default"] = rewrapResponse;