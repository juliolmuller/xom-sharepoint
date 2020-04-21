const requestDigest = require('./request-digest')
const deleteMethod = require('./delete-method')
const patchMethod = require('./patch-method')
const addHeaders = require('./default-headers')

module.exports = [

  // custom functions
  requestDigest,
  deleteMethod,
  patchMethod,
  addHeaders,
]
