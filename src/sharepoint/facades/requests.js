/* eslint-disable arrow-body-style */

const endpoints = require('./endpoints')

/**
 * Define all possible requests to the SharePoint API
 *
 * @var {Object<Function>}
 */
const requests = {}

/**
 * Fetch site root API
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */
requests.getSite = (http) => {
  return http.get(endpoints.site.info())
}

/**
 * Fetch site context API for the request digest
 *
 * @param {Axios} http
 * @return {Promise<String>}
 */
requests.getRequestDigest = async (http) => {
  const resp = await http.post(endpoints.site.contextInfo(), null, { digest: false })
  return resp.FormDigestValue || resp.GetContextWebInformation.FormDigestValue
}

/**
 * Fetch for site parent metadata
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */
requests.getSiteParent = (http) => {
  return http.get(endpoints.site.parentSite())
}

/**
 * Fetch list of content in site Recycle Bin
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */
requests.getSiteRecycleBin = (http) => {
  return http.get(endpoints.site.recycleBin())
}

/**
 * Fetch for site Regional Settings
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */
requests.getSiteRegionalSettings = (http) => {
  return http.get(endpoints.site.regionalSettings())
}

/**
 * Fetch for basic current user information
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */
requests.getSiteCurrentUser = (http) => {
  return http.get(endpoints.users.current())
}

/**
 * Fetch list metadata for site users
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */
requests.getSiteUsersList = (http) => {
  return http.get(endpoints.users.listMetadata())
}

/**
 * Fetch list fields metadata for site users
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */
requests.getSiteUsersListFields = (http, query = '') => {
  return http.get(endpoints.users.listFields(query))
}

/**
 * Fetch list items for site users
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */
requests.getSiteUsersListItems = (http, query = '') => {
  return http.get(endpoints.users.listItems(query))
}

/**
 * Fetch a single list item with user information
 *
 * @param {Axios} http
 * @param {Number} id
 * @return {Promise<Object>}
 */
requests.getSiteUserById = (http, id) => {
  return http.get(endpoints.users.byId(id))
}

/**
 * Fetch list of all site folders/libraries
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */
requests.getFolders = (http, query = '') => {
  return http.get(endpoints.libs.index(query))
}

/**
 * Fetch the content with a given folder/library based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @return {Promise<Object>}
 */
requests.getFolderByUrl = (http, relativeUrl) => {
  return http.get(endpoints.libs.folderByUrl(relativeUrl))
}

/**
 * Fetch the content with a given file within a library based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @return {Promise<Object>}
 */
requests.getFileByUrl = (http, relativeUrl) => {
  return http.get(endpoints.libs.fileByUrl(relativeUrl))
}

/**
 * Fetch list of all site lists
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */
requests.getLists = (http, query = '') => {
  return http.get(endpoints.lists.index(query))
}

/**
 * Create a new list in the site
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<Object>}
 */
requests.createList = (http, title) => {
  return http.post(endpoints.lists.index(), {
    __metadata: { type: 'SP.List' },
    BaseTemplate: 100,
    Title: title,
  })
}

/**
 * Delete an existing list in the site
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<Object>}
 */
requests.deleteList = (http, title) => {
  return http.delete(endpoints.lists.byTitle(title))
}

/**
 * Fetch list metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Object>}
 */
requests.getListByTitle = (http, title, query = '') => {
  return http.get(endpoints.lists.byTitle(title, query))
}

/**
 * Fetch list metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<Array>}
 */
requests.getListItemType = (http, title) => {
  return requests.getListByTitle(http, title, '?$select=ListItemEntityTypeFullName')
}

/**
 * Fetch list fields metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Array>}
 */
requests.getListFields = (http, title, query = '') => {
  return http.get(endpoints.lists.fields(title, query))
}

/**
 * Fetch list items
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Array>}
 */
requests.getListItems = (http, title, query = '') => {
  return http.get(endpoints.lists.items(title, query))
}

/**
 * Fetch a single list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @return {Promise<Object>}
 */
requests.getListItemById = (http, title, itemId) => {
  return http.get(endpoints.lists.itemById(title, itemId))
}

/**
 * Create a new record to the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} type
 * @param {Object} data
 * @return {Promise<Array>}
 */
requests.postListItems = (http, title, type, data) => {
  return http.post(endpoints.lists.items(title), {
    __metadata: { type },
    ...data,
  })
}

/**
 * Update an existing record in the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} type
 * @param {Object} data
 * @return {Promise<Array>}
 */
requests.patchListItem = async (http, title, itemId, type, data) => {
  const patchResp = await http.patch(endpoints.lists.itemById(title, itemId), {
    __metadata: { type },
    ...data,
  })
  const updatedItem = await requests.getListItemById(http, title, itemId)
  delete patchResp.data
  updatedItem.__response = patchResp
  return updatedItem
}

/**
 * Update an existing record in the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @return {Promise<Array>}
 */
requests.deleteListItem = async (http, title, itemId) => {
  const originalItem = await requests.getListItemById(http, title, itemId)
  const deleteResp = await http.delete(endpoints.lists.itemById(title, itemId))
  delete deleteResp.data
  originalItem.__response = deleteResp
  return originalItem
}

/**
 * Fetch attachments of a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @return {Promise<Array>}
 */
requests.getListItemAttachments = (http, title, itemId) => {
  return http.get(endpoints.lists.itemAttachments(title, itemId))
}

module.exports = requests
