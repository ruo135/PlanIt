// Ruo Yang Jiang 261055118

/**
 * This function makes sure anything we pass to it is not null.
 */
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (!val) {
    throw Error("Expected 'val' to be defined, but received " + val)
  }
}
