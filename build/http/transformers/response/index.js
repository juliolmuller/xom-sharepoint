"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var axios_1 = __importDefault(require("axios"));

var exposeDeepData_1 = __importDefault(require("./exposeDeepData"));

var parseDate_1 = __importDefault(require("./parseDate"));

var defaultTransformers = axios_1["default"].defaults.transformResponse;
var responseTransformers = [].concat((0, _toConsumableArray2["default"])(defaultTransformers), [exposeDeepData_1["default"], parseDate_1["default"]]);
exports["default"] = responseTransformers;