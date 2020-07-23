const genFileBuffer = require('@lacussoft/to-arraybuffer')
const requests = require('./facades/requests')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} listTitle List title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */
module.exports = function XomSharePointList(listTitle, httpInstance) {

  /**
   * Store the SharePoint list title
   *
   * @private
   * @var {String}
   */
  let _title = listTitle

  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  const _http = httpInstance

  /**
   * Eagerly fetches list metadata to get list items type
   *
   * @private
   * @final
   * @var {Promise<String>}
   */
  const _itemsType = requests.getListItemType(_http, _title)

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
      _title = String(title)
    },
  })

  /**
   * Retrun the list fields metadata
   *
   * @param {Boolean} [customOnly]
   * @return {Promise<Object>}
   */
  this.fields = (customOnly) => {
    const query = customOnly ? '?$filter=(CanBeDeleted eq true)' : ''
    return requests.getListFields(_http, _title, query)
  }

  /**
   * Return a list of the items stored in the list. If no additional parameter
   * is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */
  this.get = (params) => requests.getListItems(_http, _title, params)

  /**
   * Retrun a single list item with the given ID
   *
   * @param {Number} id
   * @param {String} [params]
   * @return {Promise<Object>}
   */
  this.find = (id, params) => requests.getListItemById(_http, _title, id, params)

  /**
   * Save a new record in the SharePoint list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */
  this.create = async (data) => requests.postListItem(_http, _title, await _itemsType, data)

  /**
   * Update data of an existing record in the SharePoint list
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */
  this.update = async (id, data) => requests.patchListItem(_http, _title, id, await _itemsType, data)

  /**
   * Delete an existing record from the SharePoint list
   *
   * @param {Number} id
   * @return {Promise<Object>}
   */
  this.delete = (id) => requests.deleteListItem(_http, _title, id)

  /**
   * Return a list of the attached files in the list item
   *
   * @param {Number} itemId
   * @return {Promise<Array>}
   */
  this.getAttachmentsFrom = (itemId) => requests.getListItemAttachments(_http, _title, itemId)

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
   * @return {Promise<Object>}
   */
  this.attachTo = async (itemId, fileInput, attchmentName) => {
    const fileBuffer = await genFileBuffer(fileInput)
    return requests.uploadListItemAttachment(_http, _title, itemId, attchmentName, fileBuffer)
  }

  /**
   * Rename a given file attachment
   *
   * @param {Number} itemId
   * @param {String} oldFileName
   * @param {String} newName
   * @return {Promise<Object>}
   */
  // eslint-disable-next-line max-len
  this.renameAttachment = (itemId, oldFileName, newName) => requests.renameListItemAttachment(_http, _title, itemId, oldFileName, newName)

  /**
   * Remove a given file attachment from the list item
   *
   * @param {Number} itemId
   * @param {String} fileName
   * @return {Promise<Object>}
   */
  this.removeAttachment = (itemId, fileName) => requests.deleteListItemAttachment(_http, _title, itemId, fileName)
}
