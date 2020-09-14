"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Provide the query to find searched term with user properties
 */

function userSearchQuery(search) {
  var title = "substringof('".concat(search, "',Title)");
  var email = "substringof('".concat(search, "',EMail)");
  var lastName = "substringof('".concat(search, "',LastName)");
  var firstName = "substringof('".concat(search, "',FirstName)");
  var account = "substringof('".concat(search, "',AccountName)");
  return {
    $filter: "".concat(title, " or ").concat(email, " or ").concat(lastName, " or ").concat(firstName, " or ").concat(account)
  };
}

exports["default"] = userSearchQuery;