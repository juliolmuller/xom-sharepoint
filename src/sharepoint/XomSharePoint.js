const axios = require('axios').default
const XomSharePointList = require('./XomSharePointList')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * team site through its REST API
 *
 * @constructor
 * @param {string} siteUrl Base URL of the SharePoint site to connect to
 */
function XomSharePoint(siteUrl) {

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
  _http.defaults.baseURL = siteUrl
  _http.defaults.headers.common = {
    'Accept': 'application/json;odata=verbose',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json;odata=verbose',
  }

  /**
   * Define property to get & set 'siteUrl' value
   *
   * @property {string} siteUrl
   */
  Object.defineProperty(_this, 'siteUrl', {
    get() {
      return _http.defaults.baseURL
    },
    set(siteUrl) {
      _http.defaults.baseURL = siteUrl
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
          .get(`${XomSharePoint.API_USER_INFO}?$top=1`)
          .then(response => {
            const idField = response.data.d[0].Id ? 'Id' : 'Id0'
            const requests = [
              _http.get(`${XomSharePoint.API_USER}(${id})`),
              _http.get(`${XomSharePoint.API_USER_INFO}?$filter=(${idField} eq ${id})`),
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
          .catch(error => reject(error))
    })
  }

  _this.getMyInfo = () => {
    const requests = [
      _http.get(XomSharePoint.API_USER_SELF),
      _http.get(XomSharePoint.API_USER_SELF_INFO),
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
          .catch(error => reject(error))
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
          .get(`${XomSharePoint.API_USER_INFO}?$filter=substringof('${name}',Name)`)
          .then(response => resolve(response.data.d.results))
          .catch(error => reject(error))
    })
  }

  /**
   * Return a reference to connect to a SharePoint list
   *
   * @param {string} listName SharePoint list name
   * @return {XomSharePointList}
   */
  _this.getList = (listName) => {
    return new XomSharePointList(listName, _http)
  }
}

/**
 * Return the API URI to get user information
 *
 * @const {string}
 */
XomSharePoint.API_USER = '/_api/Web/GetUserById'

/**
 * Return the API URI to get additional user information
 *
 * @const {string}
 */
XomSharePoint.API_USER_INFO = '/_vti_bin/listdata.svc/UserInformationList'

/**
 * Return the API URI to get current user information
 *
 * @const {string}
 */
XomSharePoint.API_USER_SELF = '/_api/web/CurrentUser'

/**
 * Return the API URI to get additional current user information
 *
 * @const {string}
 */
XomSharePoint.API_USER_SELF_INFO = '/_api/SP.UserProfiles.PeopleManager/GetMyProperties'

/**
 * Return the API URI to fetch SharePoint lists
 *
 * @const {string}
 */
XomSharePoint.API_URI_LIST = '/_vti_bin/listdata.svc'

/**
 * Return the API URI to fetch SharePoint lists attachments
 *
 * @const {string}
 */
XomSharePoint.API_URI_LIST_ATTACH = '/_api/web/lists/getbytitle'

module.exports = XomSharePoint
