/**
 * High-performance generic object pool to reduce GC pressure during frame updates.
 */
export class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private resetFn: (item: T) => void;

  constructor(factory: () => T, resetFn: (item: T) => void, initialSize = 100) {
    this.factory = factory;
    this.resetFn = resetFn;
    this.prewarm(initialSize);
  }

  private prewarm(size: number): void {
    for (let i = 0; i < size; i++) {
      this.pool.push(this.factory());
    }
  }

  /**
   * Acquires an object from the pool or instantiates a new one if exhausted.
   */
  public acquire(): T {
    return this.pool.pop() ?? this.factory();
  }

  /**
   * Returns an object to the pool after resetting its state.
   */
  public release(item: T): void {
    this.resetFn(item);
    this.pool.push(item);
  }

  /**
   * Clears all cached instances in the pool.
   */
  public clear(): void {
    this.pool.length = 0;
  }

  /**
   * Returns the current number of available idle objects in the pool.
   */
  public get size(): number {
    return this.pool.length;
  }
}