const endpoint = require('../config/endpoint')
const httpFactory = require('../http/xomHttpFactory')
const genFileBuffer = require('../utils/genFileBuffer')
const toPascalCase = require('../utils/toPascalCase')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {string} listTitle List title/name to connect to
 * @param {Axios} axiosInstance The Axios instance to beused to perform HTTP
 * '                            requests
 */
module.exports = function XomSharePointList(listTitle, axiosInstance) {

  /**
   * Store the SharePoint list title
   *
   * @private
   * @var {string}
   */
  let _title = listTitle

  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  const _http = axiosInstance || httpFactory()

  /**
   * Define property to get & set 'title' value
   *
   * @property {string} title
   */
  Object.defineProperty(this, 'title', {
    get() {
      return _title
    },
    set(listTitle) {
      _title = listTitle
    },
  })

  /**
   * Define property to get 'name' value
   *
   * @property {string} name
   */
  Object.defineProperty(this, 'name', {
    get() {
      return toPascalCase(_title)
    },
  })

  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise}
   */
  this.getAll = (params) => {
    return _http.get(endpoint.listItems(this.name) + (params || ''))
  }

  /**
   * Perform a GET request to API to obtain a single record based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @return {Promise}
   */
  this.getItem = (id) => {
    return _http.get(`${endpoint.listItems(this.name)}(${id})`)
  }

  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise}
   */
  this.createItem = (data) => {
    return _http.post(endpoint.listItems(this.name), data)
  }

  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise}
   */
  this.updateItem = (id, data) => {
    return _http.put(`${endpoint.listItems(this.name)}(${id})`, data)
  }

  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */
  this.deleteItem = (id) => {
    return _http.delete(`${endpoint.listItems(this.name)}(${id})`)
  }

  /**
   * Get the Request Digest for the context
   *
   * @return {Promise}
   */
  this.getRequestDigest = () => {
    return _http
      .post(endpoint.contextInfo(), {})
      .then(({ data }) => data.FormDigestValue || data.GetContextWebInformation.FormDigestValue)
  }

  /**
   * Perform a GET request to API return a list of the files attached to a list item
   *
   * @param {number} itemId Identification number for the record to be changed
   * @return {Promise}
   */
  this.getAttachments = (itemId) => {
    return _http.get(endpoint.listItemsAttachment(this.title, itemId))
  }

  /**
   * Upload a file attachment to a list item
   *
   * @param {number} itemId
   * @param {string|HTMLElement|FileList|File} fileInput Some reference of the input type 'file':
   *          String - if it is a query selector;
   *          HTMLElement - if it is a direct reference to the input element;
   *          FileList - if it is direct reference to the 'files' attribute of the element; and
   *          File - if it is a direct reference to the file.
   *        For the three first options, as it will result in a array of files (FileList), only
   *        the first File of the collection will be selected. If you want to get the byte buffer
   *        of other files, provide a File instance explicitaly
   * @param {string} [fileName] Define a different name to be set to the uploaded file
   * @return {Promise}
   */
  this.uploadAttachment = (itemId, fileInput, fileName) => {
    return Promise.all([
      genFileBuffer(fileInput),
      this.getRequestDigest(),
    ])
      .then(([fileBuffer, requestDigest]) => {
        fileName = fileName || (() => {
          switch (fileInput.constructor.name) {
            case 'String':
              fileInput = document.querySelector(fileInput)
              /* fall through */
            case 'HTMLInputElement':
              fileInput = fileInput.files
              /* fall through */
            case 'FileList':
              [fileInput] = fileInput
              /* fall through */
            case 'File':
              return fileInput.name
            default:
              return null
          }
        })()
        return _http.post(`${endpoint.listItemsAttachment(this.title, itemId)}/add(filename='${fileName}')`, fileBuffer, {
          digest: requestDigest,
        })
      })
  }

  /**
   * Perform a POST request to rename a given list item attachment
   *
   * @param {number} itemId Identification number for the record to be changed
   * @param {string} oldFileName Existing file name
   * @param {string} newFileName Name to be set to selected file
   * @return {Promise}
   */
  this.renameAttachment = (itemId, oldFileName, newFileName) => {
    return Promise.all([
      this.getAttachments(itemId),
      this.getRequestDigest(),
    ])
      .then(([attachments, requestDigest]) => {
        const targetFile = attachments.data.filter((att) => att.FileName === oldFileName)[0]
        const newUrl = targetFile.ServerRelativeUrl.replace(oldFileName, newFileName)
        return _http.put(`${endpoint.serverResource(targetFile.ServerRelativeUrl)}/moveto(newurl='${newUrl}', flags=1)`, {}, {
          digest: requestDigest,
        })
      })
  }

  /**
   * Perform a POST request to delete a given list item attachment
   *
   * @param {number} itemId Identification number for the record to be changed
   * @param {string} fileName Existing file name
   * @return {Promise}
   */
  this.deleteAttachment = (itemId, fileName) => {
    return this.getRequestDigest()
      .then((requestDigest) => {
        return _http.delete(`${endpoint.listItemsAttachment(this.title, itemId)}/getByFileName('${fileName}')`, {
          digest: requestDigest,
        })
      })
  }
}
