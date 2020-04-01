const endpoint = require('../config/endpoint')
const httpFactory = require('../http/xomHttpFactory')
const toPascalCase = require('../utils/toPascalCase')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} surveyTitle Survey title to connect to
 * @param {Axios} [httpInstance] Customized Axios instance to perform HTTP requests
 */
module.exports = function XomSharePointSurvey(surveyTitle, httpInstance) {

  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {String}
   */
  let _title = surveyTitle

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
   * Define property to get & set 'title' value
   *
   * @property {String} title
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
   * Get fields that corresponds to the questions and their choices
   *
   * @return {Promise}
   */
  this.getQuestions = async () => {
    const url = `${endpoint.listFields(this.title)}?$filter=(CanBeDeleted eq true)`
    _lastHttpResponse = await _http.get(url)
    return _lastHttpResponse.data.map((field) => {
      return {
        Field: `${toPascalCase(field.Title)}Value`,
        Question: field.Title,
        Type: field.TypeDisplayName,
        Choices: field.Choices && field.Choices.results,
      }
    })
  }

  /**
   * Return a list of the responses stored in the survey list. If no additional
   * parameter is provided, all records are returned. For your reference, check out
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
   * Retrun a single response by its ID
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
   * Return the responses created by a given user
   *
   * @param {Number} userId
   * @return {Promise}
   */
  this.findByUser = (userId) => {
    return this.get(`?$filter=(CreatedById eq ${userId})`)
  }

  /**
   * Save a new response in the SharePoint survey list
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
   * Update the response of an existing record
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
   * Delete an existing response
   *
   * @param {Number} id
   * @return {Promise}
   */
  this.delete = async (id) => {
    const url = `${endpoint.listItems(this.name)}(${id})`
    _lastHttpResponse = await _http.delete(url)
    return _lastHttpResponse.data
  }
}
