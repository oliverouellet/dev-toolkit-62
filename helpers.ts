/**
 * dev-toolkit-62: high-frequency game loop performance helpers
 */

export interface PerformanceBuffer {
  readonly timestamps: Float64Array;
  ptr: number;
  size: number;
}

/**
 * memoized frame timing tracker to reduce garbage collection
 */
export const createFrameBuffer = (size: number = 60): PerformanceBuffer => ({
  timestamps: new Float64Array(size),
  ptr: 0,
  size,
});

/**
 * efficient circular buffer update for rolling average metrics
 */
export const updateFrameBuffer = (buffer: PerformanceBuffer, now: number): number => {
  buffer.timestamps[buffer.ptr] = now;
  const old = buffer.timestamps[(buffer.ptr + 1) % buffer.size];
  buffer.ptr = (buffer.ptr + 1) % buffer.size;
  
  return now - old;
};

/**
 * throttle frequent state updates to prevent UI thread lock
 */
export const createThrottler = (limit: number) => {
  let last = 0;
  return (callback: () => void) => {
    const now = performance.now();
    if (now - last >= limit) {
      callback();
      last = now;
    }
  };
};