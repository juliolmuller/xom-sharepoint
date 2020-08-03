"use strict";

/**
 * Define all utilities methods
 *
 * @var {Object<Function>}
 */
var utils = {};
/**
 * Properly expands picture size URL options for given object property
 *
 * @param {Object} userObject User object expected
 * @return {void}
 */

utils.expandPictureURL = function (userObject) {
  var SMALL_PICTURE_CODE = '_SThumb';
  var MEDIUM_PICTURE_CODE = '_MThumb';
  var LARGE_PICTURE_CODE = '_LThumb';

  if (userObject && typeof userObject.Picture !== 'undefined') {
    var url = encodeURI(userObject.Picture.Url);
    var targetExpression = new RegExp("".concat(SMALL_PICTURE_CODE, "|").concat(MEDIUM_PICTURE_CODE, "|").concat(LARGE_PICTURE_CODE), 'i');
    userObject.Picture = {
      Small: url.replace(targetExpression, SMALL_PICTURE_CODE),
      Medium: url.replace(targetExpression, MEDIUM_PICTURE_CODE),
      Large: url.replace(targetExpression, LARGE_PICTURE_CODE)
    };
  }

  return userObject;
};
/**
 * Provide the query to find searched term with user properties
 *
 * @param {String} search
 */


utils.userSearchQuery = function (search) {
  var title = "substringof('".concat(search, "',Title)");
  var email = "substringof('".concat(search, "',EMail)");
  var lastName = "substringof('".concat(search, "',LastName)");
  var firstName = "substringof('".concat(search, "',FirstName)");
  var account = "substringof('".concat(search, "',AccountName)");
  return {
    $filter: "".concat(title, " or ").concat(email, " or ").concat(lastName, " or ").concat(firstName, " or ").concat(account)
  };
};

module.exports = utils;