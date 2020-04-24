"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var axios = require('axios')["default"];

var exposeDeepData = require('./expose-deep-data');

var convertDate = require('./convert-date');
/**
 * Chain of functions to transform response
 *
 * @var {Array<Function>}
 */


module.exports = [].concat((0, _toConsumableArray2["default"])(axios.defaults.transformResponse), [// custom functions
exposeDeepData, convertDate]);