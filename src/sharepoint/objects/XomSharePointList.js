const endpoint = require('../config/endpoint')
const genFileBuffer = require('../utils/genFileBuffer')
const genFileName = require('../utils/genFileName')
const httpFactory = require('../http/xomHttpFactory')
const toPascalCase = require('../utils/toPascalCase')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} listTitle List title to connect to
 * @param {Axios} [httpInstance] Customized Axios instance to perform HTTP requests
 * @param {Promise} [reqDigest] Request promised to the hashed request digest
 */
module.exports = function XomSharePointList(listTitle, httpInstance, reqDigest) {

  /**
   * Store the SharePoint list title
   *
   * @private
   * @var {String}
   */
  let _title = listTitle

  /**
   * Store the full response of the previous request
   *
   * @private
   * @var {Object}
   */
  let _lastHttpResponse = null

  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  const _http = httpInstance || httpFactory()

  /**
   * Store the hashed request digest
   *
   * @private
   * @var {String}
   */
  const _requestDigest = reqDigest || _http
    .post(endpoint.contextInfo(), {})
    .then(({ data }) => data.FormDigestValue || data.GetContextWebInformation.FormDigestValue)

  /**
   * Define property to get & set 'title' value
   *
   * @property {String} title
   */
  Object.defineProperty(this, 'title', {
    get() {
      return _title
    },
    set(title) {
      _title = title
    },
  })

  /**
   * Define property to get 'name' value
   *
   * @property {String} name
   */
  Object.defineProperty(this, 'name', {
    get() {
      return toPascalCase(_title)
    },
  })

  /**
   * Define property to get & set 'lastHttpResponse' value
   *
   * @property {Object} lastHttpResponse
   */
  Object.defineProperty(this, 'lastHttpResponse', {
    get() {
      return _lastHttpResponse
    },
  })

  /**
   * Return a list of the items stored in the list. If no additional parameter
   * is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise}
   */
  this.get = async (params) => {
    const url = endpoint.listItems(this.name) + (params || '')
    _lastHttpResponse = await _http.get(url)
    return _lastHttpResponse.data
  }

  /**
   * Retrun a single list item with the given ID
   *
   * @param {Number} id
   * @return {Promise}
   */
  this.find = async (id) => {
    const url = `${endpoint.listItems(this.name)}(${id})`
    _lastHttpResponse = await _http.get(url)
    return _lastHttpResponse.data
  }

  /**
   * Save a new record in the SharePoint list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise}
   */
  this.create = async (data) => {
    const url = endpoint.listItems(this.name)
    _lastHttpResponse = await _http.post(url, data)
    return _lastHttpResponse.data
  }

  /**
   * Update data of an existing record in the SharePoint list
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise}
   */
  this.update = async (id, data) => {
    const url = `${endpoint.listItems(this.name)}(${id})`
    _lastHttpResponse = await _http.put(url, data)
    return _lastHttpResponse.data
  }

  /**
   * Delete an existing record from the SharePoint list
   *
   * @param {Number} id
   * @return {Promise}
   */
  this.delete = async (id) => {
    const url = `${endpoint.listItems(this.name)}(${id})`
    _lastHttpResponse = await _http.delete(url)
    return _lastHttpResponse.data
  }

  /**
   * Return a list of the attached files in the list item
   *
   * @param {Number} itemId
   * @return {Promise}
   */
  this.getAttachments = async (itemId) => {
    const url = endpoint.listItemsAttachment(this.title, itemId)
    _lastHttpResponse = await _http.get(url)
    return _lastHttpResponse.data
  }

  /**
   * Upload a file attachment to a list item
   *
   * @param {Number} itemId
   * @param {String|HTMLElement|FileList|File} fileInput Some reference of the input type 'file':
   *          String - if it is a query selector;
   *          HTMLElement - if it is a direct reference to the input element;
   *          FileList - if it is direct reference to the 'files' attribute of the element; and
   *          File - if it is a direct reference to the file.
   *        For the three first options, as it will result in a array of files (FileList), only
   *        the first File of the collection will be selected. If you want to get the byte buffer
   *        of other files, provide a File instance explicitaly
   * @param {String} [attchmentName] Define a custom name to the attached file
   * @return {Promise}
   */
  this.attach = async (itemId, fileInput, attchmentName) => {
    attchmentName = attchmentName || genFileName(fileInput)
    const requestDigest = await _requestDigest
    const fileBuffer = await genFileBuffer(fileInput)
    const url = `${endpoint.listItemsAttachment(this.title, itemId)}/add(filename='${attchmentName}')`
    _lastHttpResponse = await _http.post(url, fileBuffer, { requestDigest })
    return _lastHttpResponse.data
  }

  /**
   * Rename a given file attachment
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @param {String} newName
   * @return {Promise}
   */
  this.rename = async (itemId, attachmentName, newName) => {
    const requestDigest = await _requestDigest
    const attachments = await this.getAttachments(itemId)
    const targetFile = attachments.filter((att) => att.FileName === attachmentName)[0]
    const newUrl = targetFile.ServerRelativeUrl.replace(attachmentName, newName)
    const url = `${endpoint.serverResource(targetFile.ServerRelativeUrl)}/moveTo(newurl='${newUrl}', flags=1)`
    _lastHttpResponse = await _http.put(url, {}, { requestDigest })
    return _lastHttpResponse.data
  }

  /**
   * Remove a given file attachment from the list item
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @return {Promise}
   */
  this.remove = async (itemId, attachmentName) => {
    const requestDigest = await _requestDigest
    const url = `${endpoint.listItemsAttachment(this.title, itemId)}/getByFileName('${attachmentName}')`
    _lastHttpResponse = await _http.delete(url, { requestDigest })
    return _lastHttpResponse.data
  }
}
