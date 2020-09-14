"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemAttachmentsRename = exports.itemAttachmentsUpload = exports.itemAttachmentByName = exports.itemAttachments = exports.itemById = exports.items = exports.fields = exports.byTitle = exports.index = void 0;

var common_1 = require("./common");

var folders = __importStar(require("./folders"));

var stringifyQuery_1 = __importDefault(require("../utils/stringifyQuery"));
/**
 * Return URI to get aall lists metadata
 */


function index(query) {
  return "".concat(common_1.baseApiUri(), "/Lists").concat(stringifyQuery_1["default"](query));
}

exports.index = index;
/**
 * Return URI to get a given list metadata
 */

function byTitle(listTitle, query) {
  return "".concat(index(), "/GetByTitle('").concat(listTitle, "')").concat(stringifyQuery_1["default"](query));
}

exports.byTitle = byTitle;
/**
 * Return URI to get a given list fields
 */

function fields(listTitle, query) {
  return "".concat(byTitle(listTitle), "/Fields").concat(stringifyQuery_1["default"](query));
}

exports.fields = fields;
/**
 * Return URI to get a given list items
 */

function items(listTitle, query) {
  return "".concat(byTitle(listTitle), "/Items").concat(stringifyQuery_1["default"](query));
}

exports.items = items;
/**
 * Return URI to get an specific list item
 */

function itemById(listTitle, itemId, query) {
  return items(listTitle, "(".concat(itemId, ")").concat(stringifyQuery_1["default"](query)));
}

exports.itemById = itemById;
/**
 * Return URI to handle list items attachments
 */

function itemAttachments(listTitle, itemId) {
  return "".concat(itemById(listTitle, itemId), "/AttachmentFiles");
}

exports.itemAttachments = itemAttachments;
/**
 * Return URI to handle list items attachments
 */

function itemAttachmentByName(listTitle, itemId, fileName) {
  return "".concat(itemById(listTitle, itemId), "/AttachmentFiles/GetByFileName('").concat(fileName, "')");
}

exports.itemAttachmentByName = itemAttachmentByName;
/**
 * Return URI to handle upload of list items attachments
 */

function itemAttachmentsUpload(listTitle, itemId, fileName) {
  return "".concat(itemAttachments(listTitle, itemId), "/Add(filename='").concat(fileName, "')");
}

exports.itemAttachmentsUpload = itemAttachmentsUpload;
/**
 * Return URI to handle renaming of list items attachments
 */

function itemAttachmentsRename(oldFileUrl, newFileUrl) {
  return "".concat(folders.fileByUrl(oldFileUrl), "/MoveTo(newurl='").concat(newFileUrl, "',flags=1)");
}

exports.itemAttachmentsRename = itemAttachmentsRename;