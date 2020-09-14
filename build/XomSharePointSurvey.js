"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var requests = __importStar(require("./facades/requests"));
/**
 * Instantiate the object with the necessary information to connect to a SharePoint survey through its REST API.
 */


var XomSharePointSurvey = /*#__PURE__*/function () {
  function XomSharePointSurvey(surveyTitle, httpInstance) {
    (0, _classCallCheck2["default"])(this, XomSharePointSurvey);
    this._title = surveyTitle;
    this._http = httpInstance;
    this._itemsType = requests.getListItemType(this._http, this._title);
  }

  (0, _createClass2["default"])(XomSharePointSurvey, [{
    key: "getQuestions",

    /**
     * Gets fields that corresponds to the questions and their choices.
     */
    value: function () {
      var _getQuestions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var response, questions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return requests.getListFields(this._http, this._title, {
                  $filter: '(CanBeDeleted eq true)'
                });

              case 2:
                response = _context.sent;
                questions = response.map(function (field) {
                  return {
                    Field: field.InternalName,
                    Description: field.Description,
                    Question: field.Title,
                    Type: field.TypeDisplayName,
                    Choices: field.Choices && field.Choices.results,
                    DefaultValue: field.DefaultValue
                  };
                });
                Object.defineProperty(questions, '__response', {
                  value: response.__response
                });
                return _context.abrupt("return", questions);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getQuestions() {
        return _getQuestions.apply(this, arguments);
      }

      return getQuestions;
    }()
    /**
     * Returns a list of the responses stored in the survey list.
     */

  }, {
    key: "getResponses",
    value: function getResponses(params) {
      return requests.getListItems(this._http, this._title, params);
    }
    /**
     * Returns a single response by its ID.
     */

  }, {
    key: "findResponse",
    value: function findResponse(id, params) {
      return requests.getListItemById(this._http, this._title, id, params);
    }
    /**
     * Saves a new response in the SharePoint survey list.
     */

  }, {
    key: "submitResponse",
    value: function () {
      var _submitResponse = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = requests;
                _context2.t1 = this._http;
                _context2.t2 = this._title;
                _context2.next = 5;
                return this._itemsType;

              case 5:
                _context2.t3 = _context2.sent;
                _context2.t4 = data;
                return _context2.abrupt("return", _context2.t0.postListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submitResponse(_x) {
        return _submitResponse.apply(this, arguments);
      }

      return submitResponse;
    }()
    /**
     * Updates an existing response.
     */

  }, {
    key: "changeResponse",
    value: function () {
      var _changeResponse = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = requests;
                _context3.t1 = this._http;
                _context3.t2 = this._title;
                _context3.t3 = id;
                _context3.next = 6;
                return this._itemsType;

              case 6:
                _context3.t4 = _context3.sent;
                _context3.t5 = data;
                return _context3.abrupt("return", _context3.t0.patchListItem.call(_context3.t0, _context3.t1, _context3.t2, _context3.t3, _context3.t4, _context3.t5));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function changeResponse(_x2, _x3) {
        return _changeResponse.apply(this, arguments);
      }

      return changeResponse;
    }()
    /**
     * Deletes an existing response.
     */

  }, {
    key: "delete",
    value: function _delete(id) {
      return requests.deleteListItem(this._http, this._title, id);
    }
  }, {
    key: "title",
    get: function get() {
      return this._title;
    }
  }]);
  return XomSharePointSurvey;
}();

exports["default"] = XomSharePointSurvey;