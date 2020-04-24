"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var axios = require('axios')["default"];
/**
 * Chain of functions to transform request
 *
 * @var {Array<Function>}
 */


module.exports = (0, _toConsumableArray2["default"])(axios.defaults.transformRequest);