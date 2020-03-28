const endpoint = require('./config/endpoint')
const toPascalCase = require('./utils/toPascalCase')

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
  let _title = surveyTitle

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

  _this.getQuestions = () => {
    return new Promise((resolve, reject) => {
      _http
          .get(`${endpoint.listFields(_this.title)}?$filter=(CanBeDeleted eq true)`)
          .then(response => {
            const questions = []
            response.data.d.results.forEach((field) => {
              questions.push({
                Field: toPascalCase(field.Title) + 'Value',
                Question: field.Title,
                Type: field.TypeDisplayName,
                Choices: field.Choices && field.Choices.results,
              })
              resolve(questions)
            })
          })
          .catch(reject)
    })
  }

  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise<Object[]>}
   */
  _this.getResponses = (params) => {
    return new Promise((resolve, reject) => {
      _http
          .get(endpoint.listItems(_this.name) + (params || ''))
          .then(response => resolve(response.data.d.results || response.data.d))
          .catch(reject)
    })
  }

  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {number} userId User ID to filter responses
   * @return {Promise<Object[]>}
   */
  _this.getResponsesByUser = (userId) => {
    return _this.getResponses(`?$filter=(CreatedById eq ${userId})`)
  }

  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise<Object>}
   */
  _this.createResponse = (data) => {
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
  _this.updateResponse = (id, data) => {
    return _http.post(endpoint.listItems(_this.name) + `(${id})`, data, {
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
   * @return {Promise<Object>}
   */
  _this.deleteResponse = (id) => {
    return _http.post(endpoint.listItems(_this.name) + `(${id})`, {}, {
      headers: {
        ..._http.defaults.headers.common,
        'X-Http-Method': 'DELETE',
        'If-Match': '*',
      },
    })
  }
}
