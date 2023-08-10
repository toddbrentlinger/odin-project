"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getShiftedCharCodeWithWrap(charCode, shiftFactor) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 97;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 122;
  // Shift lowercase character a-z. Initial char code should be between min-max.

  // If initial char code is NOT between min/max, throw error
  if (charCode < min || charCode > max) {
    throw new Error('Initial char code must be between min and max values!');
  }
  do {
    charCode += shiftFactor;

    // If char code shifted to less than min
    if (charCode < min) {
      // Adjust shift factor
      shiftFactor = min - charCode - 1;

      // Wrap char code around to max
      charCode = max;
    }
    // Else if char code shifted to more than max
    else if (charCode > max) {
      // Adjust shift factor
      shiftFactor = charCode - max - 1;

      // Wrap char code around to min
      charCode = min;
    }
    // Else char code has finished shifting within min/max 
    else {
      shiftFactor = 0;
    }
  } while (shiftFactor !== 0);
  return charCode;
}
function shiftCharacter(_char, shiftFactor) {
  // Return char unchanged if not a-zA-Z
  if (!_char.match(/[a-zA-Z]/)) {
    return _char;
  }

  // Set is uppercase flag
  var isUppercase = _char.toUpperCase() === _char;

  // Convert to lowercase, if uppercase
  if (isUppercase) {
    _char = _char.toLowerCase();
  }
  var shiftedCharCode = getShiftedCharCodeWithWrap(_char.charCodeAt(0), shiftFactor);

  // Convert char code to character
  _char = String.fromCharCode(shiftedCharCode);

  // Return shifted character, converting to uppercase if necessary
  return isUppercase ? _char.toUpperCase() : _char;
}
function caesarCipher(str) {
  var shiftFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var convertedStr = '';
  var _iterator = _createForOfIteratorHelper(str.split('')),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _char2 = _step.value;
      convertedStr += shiftCharacter(_char2, shiftFactor);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return convertedStr;
}
var _default = caesarCipher;
exports["default"] = _default;