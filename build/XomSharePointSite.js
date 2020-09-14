"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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

var httpFactory_1 = __importDefault(require("./http/httpFactory"));

var requests = __importStar(require("./facades/requests"));

var XomSharePointList_1 = __importDefault(require("./XomSharePointList"));

var XomSharePointSurvey_1 = __importDefault(require("./XomSharePointSurvey"));

var XomSharePointFolder_1 = __importDefault(require("./XomSharePointFolder"));

var userSearchQuery_1 = __importDefault(require("./utils/userSearchQuery"));
/**
 * Instantiate the object with the necessary information to connect to a SharePoint site through its REST API.
 */


var XomSharePointSite = /*#__PURE__*/function () {
  function XomSharePointSite(baseSiteUrl) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, XomSharePointSite);
    this._http = httpFactory_1["default"](baseSiteUrl);
    this._currUser = requests.getSiteCurrentUser(this._http).then(function (_ref) {
      var id = _ref.Id;
      return requests.getSiteUserById(_this._http, id);
    });
  }

  (0, _createClass2["default"])(XomSharePointSite, [{
    key: "getInfo",

    /**
     * Gets the SharePoint site metadata.
     */
    value: function getInfo() {
      return requests.getSite(this._http);
    }
    /**
     * Queries the SharePoint API to get user information. Inform nothing to get
     * current user information or pass an specific user ID.
     */

  }, {
    key: "getUserInfo",
    value: function getUserInfo(id) {
      return id ? requests.getSiteUserById(this._http, id) : this._currUser;
    }
    /**
     * Queries SharePoint API searching for user name.
     */

  }, {
    key: "searchUser",
    value: function searchUser(search) {
      return requests.getSiteUsersListItems(this._http, userSearchQuery_1["default"](search));
    }
    /**
     * Returns a reference to connect to a SharePoint list.
     */

  }, {
    key: "getList",
    value: function getList(listTitle) {
      return new XomSharePointList_1["default"](listTitle, this._http);
    }
    /**
     * Creates a new SharePoint list.
     */

  }, {
    key: "createList",
    value: function createList(listTitle) {
      return requests.createList(this._http, listTitle);
    }
    /**
     * Deletes an existing SharePoint list.
     */

  }, {
    key: "deleteList",
    value: function deleteList(listTitle) {
      return requests.deleteList(this._http, listTitle);
    }
    /**
     * Returns a reference to connect to a SharePoint survey.
     */

  }, {
    key: "getSurvey",
    value: function getSurvey(surveyTitle) {
      return new XomSharePointSurvey_1["default"](surveyTitle, this._http);
    }
    /**
     * Returns a reference to connect to a SharePoint file library.
     */

  }, {
    key: "getFolder",
    value: function getFolder(folderAddress) {
      return new XomSharePointFolder_1["default"](folderAddress, this._http);
    }
  }, {
    key: "http",
    get: function get() {
      return this._http;
    }
  }, {
    key: "baseUrl",
    get: function get() {
      return this._http.defaults.baseURL;
    }
  }]);
  return XomSharePointSite;
}();

exports["default"] = XomSharePointSite;