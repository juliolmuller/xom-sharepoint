"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var addRequestDigest_1 = __importDefault(require("./addRequestDigest"));

var onDeleteMethod_1 = __importDefault(require("./onDeleteMethod"));

var onPatchMethod_1 = __importDefault(require("./onPatchMethod"));

var requestInterceptors = [addRequestDigest_1["default"], onDeleteMethod_1["default"], onPatchMethod_1["default"]];
exports["default"] = requestInterceptors;