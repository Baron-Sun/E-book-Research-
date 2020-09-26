import { useRef } from 'react';
import raf from "rc-util/es/raf";
export default function useFrameWheel(inVirtual, onWheelDelta) {
  var offsetRef = useRef(0);
  var nextFrameRef = useRef(null);

  function onWheel(event) {
    if (!inVirtual) return; // Proxy of scroll events

    event.preventDefault();
    raf.cancel(nextFrameRef.current);
    offsetRef.current += event.deltaY;
    nextFrameRef.current = raf(function () {
      onWheelDelta(offsetRef.current);
      offsetRef.current = 0;
    });
  }

  return onWheel;
}