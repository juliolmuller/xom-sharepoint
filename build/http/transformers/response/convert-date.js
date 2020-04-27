"use strict";

/* eslint-disable no-param-reassign */
var numOnly = require('@lacussoft/num-only');
/**
 * Regular expression pattern for dates coming from SharePoint
 *
 * @constant {RegExp}
 */


var SP_DATE_PATTERN = /^\/Date\((\d+)\)\/$/;
/**
 * Amount of milliseconds per minute
 *
 * @constant {Number}
 */

var MILLISECONDS_PER_MINUTE = 60000;
/**
 * Convert a SharePoint date notation to a JS Date object
 *
 * @param {String} spDate
 * @return {Date}
 */

var convertToDate = function convertToDate(spDate) {
  spDate = numOnly(spDate);
  spDate = Number(spDate);
  spDate = new Date(spDate);
  spDate = spDate.getTime() + spDate.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
  return new Date(spDate);
};
/**
 * Iterate object properties to convert dates
 *
 * @param {Object} obj
 */


var sweepObject = function sweepObject(obj) {
  Object.keys(obj).forEach(function (key) {
    if (SP_DATE_PATTERN.test(obj[key])) {
      obj[key] = convertToDate(obj[key]);
    }
  });
};
/**
 * Seep the response object(s) and convert dates
 *
 * @param {*} data
 */


module.exports = function (data) {
  if (data) {
    try {
      if (data.constructor === Array) {
        data.forEach(sweepObject);
      } else {
        sweepObject(data);
      }
    } catch (e) {
      /* do nothing */
    }
  }

  return data;
};