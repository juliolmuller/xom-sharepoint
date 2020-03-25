const axios = require('axios').default
const endpoint = require('./config/endpoint')
const XomSharePointList = require('./XomSharePointList')
const XomSharePointSurvey = require('./XomSharePointSurvey')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * team site through its REST API
 *
 * @constructor
 * @param {string} baseSiteUrl Base URL of the SharePoint site to connect to
 */
module.exports = function XomSharePoint(baseSiteUrl) {

  /**
   * Ensure pointer to propper 'this'
   *
   * @private
   * @final
   * @var {this}
   */
  const _this = this

  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  const _http = axios.create()

  // Default HTTP client configurations
  _http.defaults.withCredentials = true
  _http.defaults.baseURL = baseSiteUrl
  _http.defaults.headers.common = {
    'Accept': 'application/json;odata=verbose',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json;odata=verbose',
  }

  /**
   * Define property to get & set 'baseUrl' value
   *
   * @property {string} baseUrl
   */
  Object.defineProperty(_this, 'baseUrl', {
    get() {
      return _http.defaults.baseURL
    },
    set(baseUrl) {
      _http.defaults.baseURL = baseUrl
    },
  })

  /**
   * Extract useful parts of account/login name
   *
   * @param {string} account Account/login name to be trimmed
   * @return {string}
   */
  const trimAccount = (account) => {
    return String(account)
        .replace(/(.*)[\|](.*)/, '$2')
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
  }

  /**
   * Get the SharePoint site metadata
   *
   * @return {Promise}
   */
  _this.getInfo = () => {
    return new Promise((resolve, reject) => {
      _http
          .get(endpoint.siteInfo())
          .then(response => resolve(response.data.d))
          .catch(reject)
    })
  }

  /**
   * Queries the SharePoint API to grab user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {number} [id] ID of the user you want the information for
   * @return {Promise}
   */
  _this.getUserInfo = (id) => {
    if (!id) {
      return _this.getMyInfo()
    }
    return new Promise((resolve, reject) => {
      _http
          .get(`${(endpoint.userInfo())}?$top=1`)
          .then(response => {
            const idField = response.data.d[0].Id ? 'Id' : 'Id0'
            const requests = [
              _http.get(endpoint.user(id)),
              _http.get(`${endpoint.userInfo()}?$filter=(${idField} eq ${id})`),
            ]
            Promise.all(requests)
                .then(responses => {
                  const mergedAttr = {
                    ...responses[0].data.d,
                    ...responses[1].data.d.results[0],
                  }
                  addUserProperties(mergedAttr)
                  resolve(mergedAttr)
                })
                .catch(error => reject(error))
          })
          .catch(reject)
    })
  }

  _this.getMyInfo = () => {
    const requests = [
      _http.get(endpoint.currentUser()),
      _http.get(endpoint.currentUserInfo()),
    ]
    return new Promise((resolve, reject) => {
      Promise.all(requests)
          .then(responses => {
            const mergedAttr = {
              ...responses[0].data.d,
              ...responses[1].data.d,
            }
            addUserProperties(mergedAttr)
            resolve(mergedAttr)
          })
          .catch(reject)
    })
  }

  /**
   * Queries SharePoint API searching for user name
   *
   * @param {string} name Partial name of the user
   * @return {Promise}
   */
  _this.searchUser = (name) => {
    return new Promise((resolve, reject) => {
      _http
          .get(`${endpoint.userInfo()}?$filter=substringof('${name}',Name)`)
          .then(response => resolve(response.data.d.results))
          .catch(reject)
    })
  }

  /**
   * Return an array with all the resources stored in the site (lists)
   *
   * @return {Promise}
   */
  _this.getResources = () => {
    return new Promise((resolve, reject) => {
      _http
          .get(endpoint.resourcesIndex())
          .then(response => resolve(response.data.d.results || response.data.d))
          .catch(reject)
    })
  }

  /**
   * Return a reference to connect to a SharePoint list
   *
   * @param {string} listTitle SharePoint list title
   * @return {XomSharePointList}
   */
  _this.getList = (listTitle) => {
    return new XomSharePointList(listTitle, _http)
  }

  /**
   * Return a reference to connect to a SharePoint survey
   *
   * @param {string} surveyTitle SharePoint survey title
   * @return {XomSharePointList}
   */
  _this.getSurvey = (surveyTitle) => {
    return new XomSharePointSurvey(surveyTitle, _http)
  }
}
