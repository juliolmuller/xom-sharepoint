
/**
 * Group of functions to get SharePoint API URI endpoints
 *
 * @const {Object}
 */
const endpoints = {
  site: {},
  users: {},
  lists: {},
  libs: {},
}

/**
 * Return the base API URI
 *
 * @return {String}
 */
endpoints.baseApiUri = () => '/_api/web'

/**
 * Return URI for site metadata
 *
 * @return {String}
 */
endpoints.site.info = () => endpoints.baseApiUri()

/**
 * Return URI for site metadata
 *
 * @return {String}
 */
endpoints.site.resources = () => endpoints.baseApiUri()

/**
 * Return URI for site context information
 *
 * @return {String}
 */
endpoints.site.contextInfo = () => '/_api/ContextInfo'

/**
 * Return URI for site's parent info
 *
 * @return {String}
 */
endpoints.site.parentSite = () => `${endpoints.baseApiUri()}/ParentWeb`

/**
 * Return URI for site's recycle bin
 *
 * @return {String}
 */
endpoints.site.recycleBin = () => `${endpoints.baseApiUri()}/RecycleBin`

/**
 * Return URI for site regional settings
 *
 * @return {String}
 */
endpoints.site.regionalSettings = () => `${endpoints.baseApiUri()}/RegionalSettings`

/**
 * Return URI to get basic information for current user
 *
 * @return {String}
 */
endpoints.users.current = () => `${endpoints.baseApiUri()}/CurrentUser`

/**
 * Return URI to get users list metadata
 *
 * @return {String}
 */
endpoints.users.listMetadata = () => `${endpoints.baseApiUri()}/SiteUserInfoList`

/**
 * Return URI to get users list fields
 *
 * @param {String} [query]
 * @return {String}
 */
endpoints.users.listFields = (query = '') => `${endpoints.users.listMetadata()}/Fields${query}`

/**
 * Return URI to get users records
 *
 * @param {String} [query]
 * @return {String}
 */
endpoints.users.listItems = (query = '') => `${endpoints.users.listMetadata()}/Items${query}`

/**
 * Return URI to get a given user information
 *
 * @param {Number} id
 * @return {String}
 */
endpoints.users.byId = (id) => `${endpoints.users.listMetadata()}/Items(${id})`

/**
 * Return URI to get aall lists metadata
 *
 * @param {String} [query]
 * @return {String}
 */
endpoints.lists.index = (query = '') => `${endpoints.baseApiUri()}/Lists${query}`

/**
 * Return URI to get a given list metadata
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */
endpoints.lists.byTitle = (title, query = '') => `${endpoints.lists.index()}/GetByTitle('${title}')${query}`

/**
 * Return URI to get a given list fields
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */
endpoints.lists.fields = (title, query = '') => `${endpoints.lists.byTitle(title)}/Fields${query}`

/**
 * Return URI to get a given list items
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */
endpoints.lists.items = (title, query = '') => `${endpoints.lists.byTitle(title)}/Items${query}`

/**
 * Return URI to get an specific list item
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} [query]
 * @return {String}
 */
endpoints.lists.itemById = (title, itemId, query = '') => endpoints.lists.items(title, `(${itemId})${query}`)

/**
 * Return URI to handle list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @return {String}
 */
endpoints.lists.itemAttachments = (title, itemId) => `${endpoints.lists.itemById(title, itemId)}/AttachmentFiles`

/**
 * Return URI to handle list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */
endpoints.lists.itemAttachmentByName = (title, itemId, fileName) => `${endpoints.lists.itemById(title, itemId)}/AttachmentFiles/GetByFileName('${fileName}')`

/**
 * Return URI to handle upload of list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */
endpoints.lists.itemAttachmentsUpload = (title, itemId, fileName) => `${endpoints.lists.itemAttachments(title, itemId)}/Add(filename='${fileName}')`

/**
 * Return URI to handle renaming of list items attachments
 *
 * @param {String} oldFileUrl
 * @param {String} newFileUrl
 * @return {String}
 */
endpoints.lists.itemAttachmentsRename = (oldFileUrl, newFileUrl) => `${endpoints.libs.fileByUrl(oldFileUrl)}/MoveTo(newurl='${newFileUrl}',flags=1)`

/**
 * Return URI for all the libraries
 *
 * @param {String} [query]
 * @return {String}
 */
endpoints.libs.index = (query = '') => `${endpoints.baseApiUri()}/Folders${query}`

/**
 * Return URI to access folder by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */
endpoints.libs.folderByUrl = (relativeUrl) => `${endpoints.baseApiUri()}/GetFolderByServerRelativeUrl('${relativeUrl}}')`

/**
 * Return URI to access files by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */
endpoints.libs.fileByUrl = (relativeUrl) => `${endpoints.baseApiUri()}/GetFileByServerRelativeUrl('${relativeUrl}')`

module.exports = endpoints
