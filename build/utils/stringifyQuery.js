"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var querystring_1 = __importDefault(require("querystring"));
/**
 * Converts possible query string inputs into
 */


function stringifyQuery(query) {
  if (!query) {
    return '';
  }

  if (typeof query === 'string') {
    return query[0] === '$' ? "?".concat(query) : query;
  }

  return "?".concat(querystring_1["default"].stringify(query));
}

exports["default"] = stringifyQuery;