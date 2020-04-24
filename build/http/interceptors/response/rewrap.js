"use strict";

/**
 * Put the data object to higher level and wrap response metadata
 *
 * @var {Array<Function>}
 */
module.exports = [// on success
function (response) {
  var data = response.data;

  if (data) {
    delete response.data;
    Object.defineProperty(data, '__response', {
      value: response,
      writable: true
    });
    return data;
  }

  return response;
}];