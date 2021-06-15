
/**
 * Returns an instance of the exception when an item ID is missing.
 */
export function missingItemId() {
  return new TypeError('Item ID not provided.')
}
