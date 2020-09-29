export default function useFrameWheel(inVirtual: boolean, onWheelDelta: (offset: number) => void): (event: MouseWheelEvent) => void;
