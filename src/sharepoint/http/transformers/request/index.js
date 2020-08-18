import axios from 'axios'

/**
 * Chain of functions to transform request
 *
 * @var {Array<Function>}
 */
export default [
  // custom functions
  // ...

  // JSON stringify
  ...axios.defaults.transformRequest,

  // custom functions
  // ...
]
