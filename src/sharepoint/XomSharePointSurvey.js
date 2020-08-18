import requests from './facades/requests'

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} surveyTitle Survey title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */
function XomSharePointSurvey(surveyTitle, httpInstance) {

  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {String}
   */
  let _title = surveyTitle

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
   * Get fields that corresponds to the questions and their choices
   *
   * @return {Promise<Array>}
   */
  this.getQuestions = async () => {
    const response = await requests.getListFields(_http, _title, { $filter: '(CanBeDeleted eq true)' })
    const questions = response.map((field) => ({
      Field: field.InternalName,
      Description: field.Description,
      Question: field.Title,
      Type: field.TypeDisplayName,
      Choices: field.Choices && field.Choices.results,
      DefaultValue: field.DefaultValue,
    }))
    Object.defineProperty(questions, '__response', { value: response.__response })
    return questions
  }

  /**
   * Return a list of the responses stored in the survey list. If no additional
   * parameter is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */
  this.getResponses = (params) => requests.getListItems(_http, _title, params)

  /**
   * Retrun a single response by its ID
   *
   * @param {Number} id
   * @param {String} [params]
   * @return {Promise<Object>}
   */
  this.findResponse = (id, params) => requests.getListItemById(_http, _title, id, params)

  /**
   * Save a new response in the SharePoint survey list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */
  this.submitResponse = async (data) => requests.postListItem(_http, _title, await _itemsType, data)

  /**
   * Update the response of an existing record
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */
  this.changeResponse = async (id, data) => requests.patchListItem(_http, _title, id, await _itemsType, data)

  /**
   * Delete an existing response
   *
   * @param {Number} id
   * @return {Promise<Object>}
   */
  this.delete = (id) => requests.deleteListItem(_http, _title, id)
}

export default XomSharePointSurvey
