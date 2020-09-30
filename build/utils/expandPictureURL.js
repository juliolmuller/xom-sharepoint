"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SMALL_PICTURE_CODE = '_SThumb';
var MEDIUM_PICTURE_CODE = '_MThumb';
var LARGE_PICTURE_CODE = '_LThumb';
/**
 * Properly expands picture size URL options for given object property.
 */

function expandPictureURL(userObject) {
  if (userObject) {
    var _userObject$Picture;

    var url = (_userObject$Picture = userObject.Picture) === null || _userObject$Picture === void 0 ? void 0 : _userObject$Picture.Url; // encodeURI(userObject.Picture.Url)

    var targetExpression = new RegExp("".concat(SMALL_PICTURE_CODE, "|").concat(MEDIUM_PICTURE_CODE, "|").concat(LARGE_PICTURE_CODE), 'i');
    userObject.Picture = {
      Small: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, SMALL_PICTURE_CODE)) || null,
      Medium: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, MEDIUM_PICTURE_CODE)) || null,
      Large: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, LARGE_PICTURE_CODE)) || null
    };
  }

  return userObject;
}

exports["default"] = expandPictureURL;