"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var calculator = function () {
  var add = function add(a, b) {
    return a + b;
  };
  var subtract = function subtract(a, b) {
    return a - b;
  };
  var divide = function divide(a, b) {
    return a / b;
  };
  var multiply = function multiply(a, b) {
    return a * b;
  };
  return {
    add: add,
    subtract: subtract,
    divide: divide,
    multiply: multiply
  };
}();
var _default = calculator;
exports["default"] = _default;