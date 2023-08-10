"use strict";

var _reverseString = _interopRequireDefault(require("./reverseString"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('Normal string (length > 1)', function () {
  expect((0, _reverseString["default"])('abc')).toBe('cba');
});
test('Normal string (length === 1)', function () {
  expect((0, _reverseString["default"])('a')).toBe('a');
});
test('Zero length string', function () {
  expect((0, _reverseString["default"])('')).toBe('');
});
test('Blank string (non-zero length)', function () {
  expect((0, _reverseString["default"])(' ')).toBe(' ');
});
test('Non-string', function () {
  expect(function () {
    return (0, _reverseString["default"])(0);
  }).toThrow();
  expect(function () {
    return (0, _reverseString["default"])(0);
  }).toThrow(Error);
});