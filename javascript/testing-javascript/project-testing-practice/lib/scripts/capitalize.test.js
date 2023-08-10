"use strict";

var _capitalize = _interopRequireDefault(require("./capitalize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('Lower-case string', function () {
  expect((0, _capitalize["default"])('lower')).toBe('Lower');
});
test('Upper-case string', function () {
  expect((0, _capitalize["default"])('Upper')).toBe('Upper');
});
test('Zero length string', function () {
  expect((0, _capitalize["default"])('')).toBe('');
});
test('Blank string (non-zero length)', function () {
  expect((0, _capitalize["default"])(' ')).toBe(' ');
});
test('Non-string', function () {
  expect(function () {
    return (0, _capitalize["default"])(0);
  }).toThrow();
  expect(function () {
    return (0, _capitalize["default"])(0);
  }).toThrow(Error);
});