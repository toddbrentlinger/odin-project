"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function reverseString(str) {
  if (typeof str !== 'string') {
    throw new Error('Input is NOT a string and cannot be reversed!');
  }
  return str.split('').reverse().join('');
}
var _default = reverseString;
exports["default"] = _default;