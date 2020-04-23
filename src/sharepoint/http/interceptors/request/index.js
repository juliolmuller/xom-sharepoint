const requestDigest = require('./request-digest')
const deleteMethod = require('./delete-method')
const patchMethod = require('./patch-method')
const addHeaders = require('./default-headers')

/**
 * Consolidate all functions to be run on request interception
 *
 * @var {Array<Array|Function>}
 */
module.exports = [

  // custom functions
  requestDigest,
  deleteMethod,
  patchMethod,
  addHeaders,
]
