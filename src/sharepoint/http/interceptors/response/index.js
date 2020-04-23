const rewrap = require('./rewrap')

/**
 * Consolidate all functions to be run on response interception
 *
 * @var {Array<Array|Function>}
 */
module.exports = [

  // custom functions
  rewrap,
]
