const endpoint = require('./config/endpoint')
const genFileBuffer = require('./utils/genFileBuffer')
const toPascalCase = require('./utils/toPascalCase')

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
   * Ensure pointer to propper 'this'
   *
   * @private
   * @final
   * @var {this}
   */
  const _this = this

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
  const _http = axiosInstance

  /**
   * Define property to get & set 'siteUrl' value
   *
   * @property {string} siteUrl
   */
  Object.defineProperty(_this, 'siteUrl', {
    get() {
      return _http.defaults.baseURL
    },
    set(baseUrl) {
      _http.defaults.baseURL = baseUrl
    },
  })

  /**
   * Define property to get & set 'title' value
   *
   * @property {string} title
   */
  Object.defineProperty(_this, 'title', {
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
  Object.defineProperty(_this, 'name', {
    get() {
      return toPascalCase(_title)
    },
  })

  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise<Object[]>}
   */
  _this.getAll = (params) => {
    return new Promise((resolve, reject) => {
      _http
          .get(endpoint.listItems(_this.name) + (params || ''))
          .then(response => resolve(response.data.d.results || response.data.d))
          .catch(reject)
    })
  }

  /**
   * Perform a GET request to API to obtain a single record based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @return {Promise<Object>}
   */
  _this.getItem = (id) => {
    return new Promise((resolve, reject) => {
      _http
          .get(`${endpoint.listItems(_this.name)}(${id})`)
          .then(response => resolve(response.data.d))
          .catch(reject)
    })
  }

  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise<Object>}
   */
  _this.createItem = (data) => {
    return new Promise((resolve, reject) => {
      _http
          .post(endpoint.listItems(_this.name), data)
          .then(response => resolve(response.data.d))
          .catch(reject)
    })
  }

  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise<Object>}
   */
  _this.updateItem = (id, data) => {
    return new Promise((resolve, reject) => {
      _http
          .post(endpoint.listItems(_this.name) + `(${id})`, data, {
            headers: {
              ..._http.defaults.headers.common,
              'X-Http-Method': 'MERGE',
              'If-Match': '*',
            },
          })
          .then(() => {
            _this
                .getItem(id)
                .then(resolve)
                .catch(reject)
          })
          .catch(reject)
    })
  }

  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise<Object>}
   */
  _this.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
      _this
          .getItem(id)
          .then((item) => {
            _http
                .post(endpoint.listItems(_this.name) + `(${id})`, {}, {
                  headers: {
                    ..._http.defaults.headers.common,
                    'X-Http-Method': 'DELETE',
                    'If-Match': '*',
                  },
                })
                .then(() => resolve(item))
                .catch(reject)
          })
          .catch(reject)
    })
  }

  /**
   * Get the Request Digest for the context
   *
   * @return {Promise<String>}
   */
  _this.getRequestDigest = () => {
    return new Promise((resolve, reject) => {
      _http
          .post(endpoint.contextInfo(), {})
          .then(({ data }) => resolve(data.FormDigestValue || data.d.GetContextWebInformation.FormDigestValue))
          .catch(reject)
    })
  }

  /**
   * Perform a GET request to API return a list of the files attached to a list item
   *
   * @param {number} itemId Identification number for the record to be changed
   * @return {Promise<Object[]>}
   */
  _this.getAttachments = (itemId) => {
    return new Promise((resolve, reject) => {
      _http
          .get(endpoint.listItemsAttachment(_this.title, itemId))
          .then(response => resolve(response.data.d.results))
          .catch(reject)
    })
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
   * @return {Promise<Object>}
   */
  _this.uploadAttachment = (itemId, fileInput, fileName) => {
    return new Promise((resolve, reject) => {
      const requests = [
        genFileBuffer(fileInput),
        _this.getRequestDigest(),
      ]
      Promise.all(requests)
          .then(([fileBuffer, requestDigest]) => {
            fileName = fileName || (() => {
              switch (fileInput.constructor.name) {
                case 'String':
                  fileInput = document.querySelector(fileInput)
                case 'HTMLInputElement':
                  fileInput = fileInput.files
                case 'FileList':
                  fileInput = fileInput[0]
                case 'File':
                  return fileInput.name
              }
            })()
            _http
                .post(`${endpoint.listItemsAttachment(this.listName, itemId)}/add(filename='${fileName}')`, fileBuffer, {
                  headers: {
                    ..._http.defaults.headers.common,
                    'X-RequestDigest': requestDigest,
                  },
                })
                .then(response => resolve(response.data.d))
                .catch(reject)
          })
          .catch(reject)
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
  _this.renameAttachment = (itemId, oldFileName, newFileName) => {
    return new Promise((resolve, reject) => {
      const requests = [
        _this.getAttachments(itemId),
        _this.getRequestDigest(),
      ]
      Promise.all(requests)
          .then(([attachments, requestDigest]) => {
            const targetFile = attachments.filter(att => att.FileName === oldFileName)[0]
            const newUrl = targetFile.ServerRelativeUrl.replace(oldFileName, newFileName)
            _http
                .post(`${endpoint.serverResource(targetFile.ServerRelativeUrl)}/moveto(newurl='${newUrl}', flags=1)`, {}, {
                  headers: {
                    ..._http.defaults.headers.common,
                    'X-RequestDigest': requestDigest,
                    'X-Http-Method': 'PUT',
                    'If-Match': '*',
                  },
                })
                .then(resolve)
                .catch(reject)
          })
          .catch(reject)
    })
  }

  /**
   * Perform a POST request to delete a given list item attachment
   *
   * @param {number} itemId Identification number for the record to be changed
   * @param {string} fileName Existing file name
   * @return {Promise}
   */
  _this.deleteAttachment = (itemId, fileName) => {
    return new Promise((resolve, reject) => {
      _this.getRequestDigest()
          .then(requestDigest => {
            _http
                .post(`${endpoint.listItemsAttachment(this.listName, itemId)}/getByFileName('${fileName}')`, {}, {
                  headers: {
                    ..._http.defaults.headers.common,
                    'X-RequestDigest': requestDigest,
                    'X-Http-Method': 'DELETE',
                    'If-Match': '*',
                  },
                })
                .then(resolve)
                .catch(reject)
          })
          .catch(reject)
    })
  }
}
