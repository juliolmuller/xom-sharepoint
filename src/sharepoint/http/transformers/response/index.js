import axios from 'axios'
import exposeDeepData from './expose-deep-data'
import convertDate from './convert-date'

/**
 * Chain of functions to transform response
 *
 * @var {Array<Function>}
 */
export default [
  // custom functions
  // ...

  // JSON parse
  ...axios.defaults.transformResponse,

  // custom functions
  exposeDeepData,
  convertDate,
]
