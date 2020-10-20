"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFrameWheel;

var _react = require("react");

var _raf = _interopRequireDefault(require("rc-util/lib/raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFrameWheel(inVirtual, onWheelDelta) {
  var offsetRef = (0, _react.useRef)(0);
  var nextFrameRef = (0, _react.useRef)(null);

  function onWheel(event) {
    if (!inVirtual) return; // Proxy of scroll events

    event.preventDefault();

    _raf.default.cancel(nextFrameRef.current);

    offsetRef.current += event.deltaY;
    nextFrameRef.current = (0, _raf.default)(function () {
      onWheelDelta(offsetRef.current);
      offsetRef.current = 0;
    });
  }

  return onWheel;
}