"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var XomSharePointSite_1 = __importDefault(require("./XomSharePointSite"));
/**
 * Instantiate a XomSharePoint object to connect to a SharePoint site and,
 * therefore, exchange data with its contents (lists, libraries, permissions)
 * through SharePoint native REST API
 */


function xomSharePoint(baseSiteUrl) {
  return new XomSharePointSite_1["default"](baseSiteUrl);
}

exports["default"] = xomSharePoint;