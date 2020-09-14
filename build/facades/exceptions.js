"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.missingItemId = void 0;
/**
 * Returns an instance of the exception when an item ID is missing.
 */

function missingItemId() {
  return new TypeError('Item ID not provided.');
}

exports.missingItemId = missingItemId;