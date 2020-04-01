const endpoint = require('../config/endpoint')
const httpFactory = require('../http/xomHttpFactory')
const XomSharePointList = require('./XomSharePointList')
const XomSharePointSurvey = require('./XomSharePointSurvey')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * site through its REST API
 *
 * @constructor
 * @param {String} [baseSiteUrl] Base URL for the SharePoint site to connect to.
 *                               If none URL is provided, the instance will assume
 *                               the current site/subsite
 */
module.exports = function XomSharePointSite(baseSiteUrl) {

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
  const _http = httpFactory(baseSiteUrl)

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
   * Extract useful parts of account/login name
   *
   * @param {String} account Account/login name to be trimmed
   * @return {String}
   */
  const trimAccount = (account) => {
    return String(account)
      .replace(/(.*)[|](.*)/, '$2')
      .replace(/\\/, '_')
  }

  /**
   * Add essential properties to the user object
   *
   * @param {Object} user User object literal
   */
  const addUserProperties = (user) => {
    user.Id = user.Id || user.Id0
    user.Account = user.LoginName || user.AccountName || user.Account
    user.AccountName = trimAccount(user.Account)
    user.UserId = user.AccountName.replace(/(.*)[_](.*)/, '$2')
    user.Name = user.Name || user.DisplayName
    user.PersonalUrl = `https://mysite.na.xom.com/personal//${user.AccountName}`
    user.PictureUrl = `http://lyncpictures/service/api/image/${user.AccountName}`
    return user
  }

  /**
   * Get the SharePoint site metadata
   *
   * @return {Promise}
   */
  this.getInfo = async () => {
    const url = endpoint.siteInfo()
    _lastHttpResponse = await _http.get(url)
    return _lastHttpResponse.data
  }

  /**
   * Queries the SharePoint API to get user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {Number} [id] ID of the user you want the information for
   * @return {Promise}
   */
  this.getUserInfo = async (id) => {
    if (!id) {
      return this.getMyInfo()
    }
    const response = await _http.get(`${(endpoint.userInfo())}?$top=1`)
    const idField = response.data[0].Id ? 'Id' : 'Id0'
    _lastHttpResponse = await Promise.all([
      _http.get(endpoint.user(id)),
      _http.get(`${endpoint.userInfo()}?$filter=(${idField} eq ${id})`),
    ])
    return addUserProperties({
      ..._lastHttpResponse[0].data,
      ..._lastHttpResponse[1].data,
    })
  }

  /**
   * Queries the SharePoint API to get current user information
   *
   * @deprecated
   * @return {Promise}
   */
  this.getMyInfo = async () => {
    _lastHttpResponse = await Promise.all([
      _http.get(endpoint.currentUser()),
      _http.get(endpoint.currentUserInfo()),
    ])
    return addUserProperties({
      ..._lastHttpResponse[0].data,
      ..._lastHttpResponse[1].data,
    })
  }

  /**
   * Queries SharePoint API searching for user name
   *
   * @param {String} name Partial name of the user
   * @return {Promise}
   */
  this.searchUser = async (name) => {
    const url = `${endpoint.userInfo()}?$filter=substringof('${name}',Name)`
    _lastHttpResponse = await _http.get(url)
    return _lastHttpResponse.data
  }

  /**
   * Return an array with all the resources stored in the site (lists)
   *
   * @return {Promise}
   */
  this.getResources = async () => {
    const url = endpoint.resourcesIndex()
    _lastHttpResponse = await _http.get(url)
    return _lastHttpResponse.data
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
   * Return a reference to connect to a SharePoint survey
   *
   * @param {String} surveyTitle SharePoint survey title
   * @return {XomSharePointList}
   */
  this.getSurvey = (surveyTitle) => {
    return new XomSharePointSurvey(surveyTitle, _http)
  }
}
