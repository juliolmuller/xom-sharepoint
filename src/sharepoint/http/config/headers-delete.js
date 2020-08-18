import commonHeaders from './headers-common'

/**
 * Define headers for DELETE method
 *
 * @constant {Object}
 */
export default Object.freeze({
  ...commonHeaders,
  'X-Http-Method': 'DELETE',
  'If-Match': '*',
})
