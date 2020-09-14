"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function lookForDates(obj) {
  var SP_DATE_STR_LENGTH = 20;
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === 'string' && obj[key].length === SP_DATE_STR_LENGTH && Date.parse(obj[key])) {
      obj[key] = new Date(obj[key]);
    }
  });
}

function parseDates(data) {
  try {
    if (data instanceof Array) {
      data.forEach(lookForDates);
    } else {
      lookForDates(data);
    }
  } catch (e) {
    /* do nothing */
  }

  return data;
}

exports["default"] = parseDates;