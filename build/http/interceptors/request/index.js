"use strict";

var requestDigest = require('./request-digest');

var deleteMethod = require('./delete-method');

var patchMethod = require('./patch-method');

var addHeaders = require('./default-headers');
/**
 * Consolidate all functions to be run on request interception
 *
 * @var {Array<Array|Function>}
 */


module.exports = [// custom functions
requestDigest, deleteMethod, patchMethod, addHeaders];