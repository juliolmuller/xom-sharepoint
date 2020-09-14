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

var axios_1 = __importDefault(require("axios"));

var requests = __importStar(require("../facades/requests"));

var commonHeaders_1 = __importDefault(require("./config/commonHeaders"));

var request_1 = __importDefault(require("./transformers/request"));

var response_1 = __importDefault(require("./transformers/response"));

var request_2 = __importDefault(require("./interceptors/request"));

var response_2 = __importDefault(require("./interceptors/response"));

var registerInterceptor_1 = __importDefault(require("../utils/registerInterceptor"));

function httpFactory(siteUrl) {
  var http = axios_1["default"].create({
    headers: commonHeaders_1["default"],
    baseURL: siteUrl || '/',
    withCredentials: true,
    transformRequest: request_1["default"],
    transformResponse: response_1["default"]
  });
  request_2["default"].forEach(registerInterceptor_1["default"](http, 'request'));
  response_2["default"].forEach(registerInterceptor_1["default"](http, 'response'));
  http.defaults.requestDigest = requests.getRequestDigest(http);
  return http;
}

exports["default"] = httpFactory;