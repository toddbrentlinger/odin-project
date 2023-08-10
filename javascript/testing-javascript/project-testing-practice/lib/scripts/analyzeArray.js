"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function analyzeArray(arr) {
  return {
    average: arr.reduce(function (accum, curr) {
      return accum + curr;
    }) / arr.length,
    min: arr.reduce(function (prev, curr) {
      return curr < prev ? curr : prev;
    }),
    max: arr.reduce(function (prev, curr) {
      return curr > prev ? curr : prev;
    }),
    length: arr.length
  };
}
var _default = analyzeArray;
exports["default"] = _default;