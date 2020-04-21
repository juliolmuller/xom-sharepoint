const commonHeaders = require('./headers-common')

/**
 * Define headers for PATCH method
 *
 * @constant {Object}
 */
module.exports = Object.freeze({
  ...commonHeaders,
  'X-Http-Method': 'MERGE',
  'If-Match': '*',
})
