"use strict";

var _analyzeArray = _interopRequireDefault(require("./analyzeArray"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('Simple example', function () {
  expect((0, _analyzeArray["default"])([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6
  });
});