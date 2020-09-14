"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regionalSettings = exports.recycleBin = exports.parentSite = exports.contextInfo = exports.resources = exports.info = void 0;

var common_1 = require("./common");
/**
 * Return URI for site metadata
 */


function info() {
  return common_1.baseApiUri();
}

exports.info = info;
/**
 * Return URI for site metadata
 */

function resources() {
  return common_1.baseApiUri();
}

exports.resources = resources;
/**
 * Return URI for site context information
 */

function contextInfo() {
  return '/_api/ContextInfo';
}

exports.contextInfo = contextInfo;
/**
 * Return URI for site's parent info
 */

function parentSite() {
  return "".concat(common_1.baseApiUri(), "/ParentWeb");
}

exports.parentSite = parentSite;
/**
 * Return URI for site's recycle bin
 */

function recycleBin() {
  return "".concat(common_1.baseApiUri(), "/RecycleBin");
}

exports.recycleBin = recycleBin;
/**
 * Return URI for site regional settings
 */

function regionalSettings() {
  return "".concat(common_1.baseApiUri(), "/RegionalSettings");
}

exports.regionalSettings = regionalSettings;