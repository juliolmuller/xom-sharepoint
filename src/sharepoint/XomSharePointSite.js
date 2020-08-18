import utils from './facades/utils'
import requests from './facades/requests'
import httpFactory from './http/http-factory'
import XomSharePointList from './XomSharePointList'
import XomSharePointSurvey from './XomSharePointSurvey'
import XomSharePointLibrary from './XomSharePointLibrary'

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * site through its REST API
 *
 * @constructor
 * @param {String} [baseSiteUrl] Base URL for the SharePoint site to connect to.
 *                               If none URL is provided, the instance will assume
 *                               the current site/subsite
 */
function XomSharePointSite(baseSiteUrl) {

  /**
   * Base custom instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  const _http = httpFactory(baseSiteUrl)

  /**
   * Eagerly store current user data (as Promise)
   *
   * @private
   * @final
   * @var {Promise<Object>}
   */
  const _currUser = requests.getSiteCurrentUser(_http)
    .then(({ Id }) => requests.getSiteUserById(_http, Id))

  /**
   * Define property to get & set 'baseUrl' value
   *
   * @property {String} baseUrl
   */
  Object.defineProperty(this, 'baseUrl', {
    get() {
      return _http.defaults.baseURL
    },
    set(baseUrl) {
      _http.defaults.baseURL = baseUrl
    },
  })

  /**
   * Get the SharePoint site metadata
   *
   * @return {Promise}
   */
  this.getInfo = () => {
    return requests.getSite(_http)
  }

  /**
   * Queries the SharePoint API to get user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {Number} [id] ID of the user you want the information for
   * @return {Promise}
   */
  this.getUserInfo = (id) => {
    if (id) {
      return requests.getSiteUserById(_http, id)
    }
    return _currUser
  }

  /**
   * Queries SharePoint API searching for user name
   *
   * @param {String} search Partial name/userID of the user
   * @return {Promise}
   */
  this.searchUser = (search) => {
    return requests.getSiteUsersListItems(_http, utils.userSearchQuery(search))
  }

  /**
   * Return a reference to connect to a SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {XomSharePointList}
   */
  this.getList = (listTitle) => {
    return new XomSharePointList(listTitle, _http)
  }

  /**
   * Create a new SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {Promise}
   */
  this.createList = (listTitle) => {
    return requests.createList(_http, listTitle)
  }

  /**
   * Delete an existing SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {Promise}
   */

  this.deleteList = (listTitle) => {
    return requests.deleteList(_http, listTitle)
  }

  /**
   * Return a reference to connect to a SharePoint survey
   *
   * @param {String} surveyTitle SharePoint survey title
   * @return {XomSharePointSurvey}
   */
  this.getSurvey = (surveyTitle) => {
    return new XomSharePointSurvey(surveyTitle, _http)
  }

  /**
   * Return a reference to connect to a SharePoint file library
   *
   * @param {String} folderAddress SharePoint library/folder title
   * @return {XomSharePointLibrary}
   */
  this.getLibrary = (folderAddress) => {
    return new XomSharePointLibrary(folderAddress, _http)
  }
}

export default XomSharePointSite
