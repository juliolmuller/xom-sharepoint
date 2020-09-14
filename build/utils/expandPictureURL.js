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
  if (userObject && typeof userObject.Picture !== 'undefined') {
    var url = userObject.Picture.Url; // encodeURI(userObject.Picture.Url)

    var targetExpression = new RegExp("".concat(SMALL_PICTURE_CODE, "|").concat(MEDIUM_PICTURE_CODE, "|").concat(LARGE_PICTURE_CODE), 'i');
    userObject.Picture = {
      Small: userObject.Picture && url.replace(targetExpression, SMALL_PICTURE_CODE),
      Medium: userObject.Picture && url.replace(targetExpression, MEDIUM_PICTURE_CODE),
      Large: userObject.Picture && url.replace(targetExpression, LARGE_PICTURE_CODE)
    };
  }

  return userObject;
}

exports["default"] = expandPictureURL;