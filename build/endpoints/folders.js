"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileByUrl = exports.newFileToFolder = exports.filesInFolder = exports.foldersInFolder = exports.folderByUrl = exports.index = void 0;

var common_1 = require("./common");

var stringifyQuery_1 = __importDefault(require("../utils/stringifyQuery"));
/**
 * Return URI for all the libraries
 */


function index(query) {
  return "".concat(common_1.baseApiUri(), "/Folders").concat(stringifyQuery_1["default"](query));
}

exports.index = index;
/**
 * Return URI to access folder by relative URL
 */

function folderByUrl(relativeUrl) {
  return "".concat(common_1.baseApiUri(), "/GetFolderByServerRelativeUrl('").concat(relativeUrl, "')");
}

exports.folderByUrl = folderByUrl;
/**
 * Return URL to list of folders within a given folder
 */

function foldersInFolder(relativeUrl, query) {
  return "".concat(folderByUrl(relativeUrl), "/Folders").concat(stringifyQuery_1["default"](query));
}

exports.foldersInFolder = foldersInFolder;
/**
 * Return URL to list of files within a given folder
 */

function filesInFolder(relativeUrl, query) {
  return "".concat(folderByUrl(relativeUrl), "/Files").concat(stringifyQuery_1["default"](query));
}

exports.filesInFolder = filesInFolder;
/**
 * Return URL to upload a file to a folder
 */

function newFileToFolder(relativeUrl, fileName) {
  var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return "".concat(filesInFolder(relativeUrl), "/Add(overwrite=").concat(overwrite, ",url='").concat(fileName, "')");
}

exports.newFileToFolder = newFileToFolder;
/**
 * Return URI to access files by relative URL
 */

function fileByUrl(relativeUrl) {
  return "".concat(common_1.baseApiUri(), "/GetFileByServerRelativeUrl('").concat(relativeUrl, "')");
}

exports.fileByUrl = fileByUrl;