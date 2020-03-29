const endpoint = require('../config/endpoint')
const httpFactory = require('../http/xomHttpFactory')
const toPascalCase = require('../utils/toPascalCase')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {string} surveyTitle Survey title to connect to
 * @param {Axios} axiosInstance The Axios instance to beused to perform HTTP
 * '                            requests
 */
module.exports = function XomSharePointSurvey(surveyTitle, axiosInstance) {

  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {string}
   */
  let _title = surveyTitle

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
   * Get fields that corresponds to the questions and their choices
   *
   * @return {Promise}
   */
  this.getQuestions = () => {
    return _http
      .get(`${endpoint.listFields(this.title)}?$filter=(CanBeDeleted eq true)`)
      .then((response) => {
        const questions = []
        response.data.forEach((field) => {
          questions.push({
            Field: `${toPascalCase(field.Title)}Value`,
            Question: field.Title,
            Type: field.TypeDisplayName,
            Choices: field.Choices && field.Choices.results,
          })
        })
        response.data = questions
        return response
      })
  }

  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise}
   */
  this.getResponses = (params) => {
    return _http.get(endpoint.listItems(this.name) + (params || ''))
  }

  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {number} userId User ID to filter responses
   * @return {Promise}
   */
  this.getResponsesByUser = (userId) => {
    return this.getResponses(`?$filter=(CreatedById eq ${userId})`)
  }

  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise}
   */
  this.createResponse = (data) => {
    return _http.post(endpoint.listItems(this.name), data)
  }

  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise}
   */
  this.updateResponse = (id, data) => {
    return _http.put(`${endpoint.listItems(this.name)}(${id})`, data)
  }

  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */
  this.deleteResponse = (id) => {
    return _http.delete(`${endpoint.listItems(this.name)}(${id})`)
  }
}
