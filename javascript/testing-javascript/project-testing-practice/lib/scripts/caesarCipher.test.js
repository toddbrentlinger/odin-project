"use strict";

var _caesarCipher = _interopRequireDefault(require("./caesarCipher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('No-wrap', function () {
  expect((0, _caesarCipher["default"])('defend the east wall of the castle', 1)).toBe('efgfoe uif fbtu xbmm pg uif dbtumf');
});
test('Wrap', function () {
  expect((0, _caesarCipher["default"])('abcdefghijklmnopqrstuvwxyz', 1)).toBe('bcdefghijklmnopqrstuvwxyza');
  expect((0, _caesarCipher["default"])('abcdefghijklmnopqrstuvwxyz', 10)).toBe('klmnopqrstuvwxyzabcdefghij');
});
test('Keep the same case', function () {
  expect((0, _caesarCipher["default"])('Defend the eAst waLl of thE castlE', 1)).toBe('Efgfoe uif fBtu xbMm pg uiF dbtumF');
});
test('Punctuation', function () {
  expect((0, _caesarCipher["default"])('Defend. The east wall, of the castle!', 1)).toBe('Efgfoe. Uif fbtu xbmm, pg uif dbtumf!');
});
test('Shift factor greater than 26', function () {
  expect((0, _caesarCipher["default"])('abcdefghijklmnopqrstuvwxyz', 27)).toBe('bcdefghijklmnopqrstuvwxyza');
});