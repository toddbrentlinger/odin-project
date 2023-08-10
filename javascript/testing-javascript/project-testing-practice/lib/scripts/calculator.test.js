"use strict";

var _calculator = _interopRequireDefault(require("./calculator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('Add integers', function () {
  expect(_calculator["default"].add(2, 3)).toBe(5);
});
test('Add floating point numbers', function () {
  expect(_calculator["default"].add(0.1, 0.2)).toBeCloseTo(0.3);
});
test('Subtract integers', function () {
  expect(_calculator["default"].subtract(3, 2)).toBe(1);
});
test('Subtract floating point numbers', function () {
  expect(_calculator["default"].subtract(0.3, 0.2)).toBeCloseTo(0.1);
});
test('Divide integers', function () {
  expect(_calculator["default"].divide(1, 2)).toBeCloseTo(0.5);
});
test('Divide floating point numbers', function () {
  expect(_calculator["default"].divide(0.6, 0.2)).toBeCloseTo(3);
});
test('Divide by zero', function () {
  expect(_calculator["default"].divide(5, 0)).toBe(Infinity);
});
test('Multiply integers', function () {
  expect(_calculator["default"].multiply(2, 3)).toBe(6);
});
test('Multiply floating point numbers', function () {
  expect(_calculator["default"].multiply(0.2, 0.3)).toBeCloseTo(0.06);
});