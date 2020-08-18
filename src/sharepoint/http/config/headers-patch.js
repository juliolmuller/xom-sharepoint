import commonHeaders from './headers-common'

/**
 * Define headers for PATCH method
 *
 * @constant {Object}
 */
export default Object.freeze({
  ...commonHeaders,
  'X-Http-Method': 'MERGE',
  'If-Match': '*',
})
