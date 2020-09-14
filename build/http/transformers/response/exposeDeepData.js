"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function exposeDeepData(data) {
  var _data;

  if ((_data = data) === null || _data === void 0 ? void 0 : _data.d) {
    var _data2 = data,
        d = _data2.d;
    /* eslint-disable-next-line no-param-reassign */

    data = d.results || d;
    Object.defineProperty(data, '__next', {
      value: d.__next || null,
      writable: true
    });
  }

  return data;
}

exports["default"] = exposeDeepData;