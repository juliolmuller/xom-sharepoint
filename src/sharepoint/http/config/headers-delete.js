const commonHeaders = require('./headers-common')

/**
 * Define headers for DELETE method
 *
 * @constant {Object}
 */
module.exports = Object.freeze({
  ...commonHeaders,
  'X-Http-Method': 'DELETE',
  'If-Match': '*',
})
