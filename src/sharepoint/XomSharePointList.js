const toPascalCase = require('./utils/toPascalCase')
const XomSharePoint = require('./XomSharePoint')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {string} listName Base URL of the SharePoint site to connect to
 * @param {Axios} axiosInstance The Axios instance to beused to perform HTTP
 * '                            requests
 */
module.exports = function XomSharePointList(listName, axiosInstance) {

  /**
   * Ensure pointer to propper 'this'
   *
   * @private
   * @final
   * @var {this}
   */
  const _this = this

  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {string}
   */
  let _listName = listName

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
      return _http.defaults.apiUri
    },
    set(siteUrl) {
      _http.defaults.apiUri = siteUrl
    },
  })

  /**
   * Define property to get & set 'listName' value
   *
   * @property {string} listName
   */
  Object.defineProperty(_this, 'listName', {
    get() {
      return toPascalCase(_listName)
    },
    set(listName) {
      _listName = listName
    },
  })

  /**
   * Define property to get 'apiUri' value
   *
   * @property {string} apiUri
   */
  Object.defineProperty(_this, 'apiUri', {
    get() {
      return `${XomSharePoint.API_URI_LIST}/${_this.listName}`
    },
  })

  /**
   * Define property to get 'apiUriAttachment' value
   *
   * @property {string} apiUriAttachment
   */
  Object.defineProperty(_this, 'apiUriAttachment', {
    get() {
      return `${XomSharePoint.API_URI_LIST_ATTACH}(${_this.listName})`
    },
  })

  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise}
   */
  _this.get = (params) => {
    return new Promise((resolve, reject) => {
      _http
          .get(_this.apiUri + params)
          .then(response => resolve(response.data.d.results || response.data.d))
          .catch(error => reject(error))
    })
  }

  /**
   * Perform a GET request to API to obtain a single record based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @return {Promise}
   */
  _this.getOne = (id) => {
    return new Promise((resolve, reject) => {
      _http
          .get(_this.apiUri + `(${id})`)
          .then(response => resolve(response.data.d))
          .catch(error => reject(error))
    })
  }

  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise}
   */
  _this.post = (data) => {
    return new Promise((resolve, reject) => {
      _http
          .post(_this.apiUri, data)
          .then(response => resolve(response.data.d.results))
          .catch(error => reject(error))
    })
  }

  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise}
   */
  _this.update = (id, data) => {
    return _http.post(_this.apiUri + `(${id})`, data, {
      headers: {
        ..._http.defaults.headers.common,
        'X-Http-Method': 'MERGE',
        'If-Match': '*',
      },
    })
  }

  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */
  _this.delete = (id) => {
    return _http.post(_this.apiUri + `(${id})`, {}, {
      headers: {
        ..._http.defaults.headers.common,
        'X-Http-Method': 'DELETE',
        'If-Match': '*',
      },
    })
  }
}
