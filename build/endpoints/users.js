"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byId = exports.listItems = exports.listFields = exports.listMetadata = exports.current = void 0;

var common_1 = require("./common");

var stringifyQuery_1 = __importDefault(require("../utils/stringifyQuery"));
/**
 * Return URI to get basic information for current user
 */


function current() {
  return "".concat(common_1.baseApiUri(), "/CurrentUser");
}

exports.current = current;
/**
 * Return URI to get users list metadata
 */

function listMetadata() {
  return "".concat(common_1.baseApiUri(), "/SiteUserInfoList");
}

exports.listMetadata = listMetadata;
/**
 * Return URI to get users list fields
 */

function listFields(query) {
  return "".concat(listMetadata(), "/Fields").concat(stringifyQuery_1["default"](query));
}

exports.listFields = listFields;
/**
 * Return URI to get users records
 */

function listItems(query) {
  return "".concat(listMetadata(), "/Items").concat(stringifyQuery_1["default"](query));
}

exports.listItems = listItems;
/**
 * Return URI to get a given user information
 */

function byId(id) {
  return "".concat(listMetadata(), "/Items(").concat(id, ")");
}

exports.byId = byId;