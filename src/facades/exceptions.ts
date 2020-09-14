
/**
 * Returns an instance of the exception when an item ID is missing.
 */
export function missingItemId(): TypeError {
  return new TypeError('Item ID not provided.')
}
