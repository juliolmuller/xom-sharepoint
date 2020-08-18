import requestDigest from './request-digest'
import deleteMethod from './delete-method'
import patchMethod from './patch-method'
import addHeaders from './default-headers'

/**
 * Consolidate all functions to be run on request interception
 *
 * @var {Array<Array|Function>}
 */
export default [

  // custom functions
  requestDigest,
  deleteMethod,
  patchMethod,
  addHeaders,
]
