const axios = require('axios')

/**
 * Instantiate an object to consume SharePoint REST API. As parameters,
 * consider the folloing full URL example you are targeting:
 * "https://ishareteam2.na.xom.com/sites/cfscuritiba/Lists/MyList/"
 *
 * @class
 * @constructor
 * @param {string} siteUrl Base URL of the SharePoint site which the list
 *        belongs to. At the example, the site URL is
 *        "https://ishareteam2.na.xom.com/sites/cfscuritiba"
 * @param {string} listName Name of the list you are targeting. At the
 *        example, the list name is "MyList"
 */
module.exports = function(siteUrl, listName = null) {

  const _this = this
  const _axios = axios.create()
  let _siteUrl = siteUrl
  let _listName = listName

  _axios.defaults.withCredentials = true
  _axios.defaults.headers.common = {
    'Accept': 'application/json;odata=verbose',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json;odata=verbose'
  }

  /**
   * Define property to get & set 'siteUrl' value
   *
   * @return {string}
   */
  Object.defineProperty(_this, 'siteUrl', {
    get() {
      return _siteUrl
    },
    set(siteUrl) {
      _siteUrl = siteUrl
    }
  })

  /**
   * Define property to get & set 'listName' value
   *
   * @return {string}
   */
  Object.defineProperty(_this, 'listName', {
    get() {
      return _listName
    },
    set(listName) {
      _listName = listName
    }
  })

  /**
   * Define property to get 'baseUrl' value
   *
   * @return {string}
   */
  Object.defineProperty(_this, 'baseUrl', {
    get() {
      return `${_siteUrl}/_vti_bin/listdata.svc/${_listName}`
    }
  })

  /**
   * Define property to get 'baseAttachmentUrl' value
   *
   * @return {string}
   */
  Object.defineProperty(_this, 'baseAttachmentUrl', {
    get() {
      return `${_siteUrl}/_api/web/lists/getbytitle(${_listName})`
    }
  })

  /**
   * Queries the SharePoint API to grab user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {number} id Id of the user you want the information for
   * @return {Promise}
   */
  _this.getUserInfo = (id = null) => {
    if (id !== null) {
      const data1 = _axios.get(`${_siteUrl}/_api/Web/GetUserById(${id})`)
      const data2 = _axios.get(`${_siteUrl}/_vti_bin/listdata.svc/UserInformationList?$filter=(Id0 eq ${id})`)
      return new Promise((resolve, reject) => {
        Promise.all([data1, data2])
            .then(responses => resolve({ ...responses[0].data.d, ...responses[1].data.d.results[0] }))
            .catch(error => reject(error))
      })
    }
    const data1 = _axios.get(`${_siteUrl}/_api/web/CurrentUser`)
    const data2 = _axios.get(`${_siteUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`)
    return new Promise((resolve, reject) => {
      Promise.all([data1, data2])
          .then(responses => resolve({ ...responses[0].data.d, ...responses[1].data.d }))
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
      _axios
          .get(`${_siteUrl}/_vti_bin/listdata.svc/UserInformationList?$filter=substringof(${name},Name)`)
          .then(response => resolve(response.data.d.results))
          .catch(error => reject(error))
    })
  }

  /**
   * Performs a GET request to the API, in order to obtain a records set from
   * the SharePoint list
   *
   * @param {string} params Appends additional parameters to the request, like
   *        filters or sorting
   * @return {Promise}
   */
  _this.get = (params) => {
    return new Promise((resolve, reject) => {
      _axios
          .get(_this.baseUrl + (params || ''))
          .then(response => resolve(response.data.d.results))
          .catch(error => reject(error))
    })
  }

  /**
   * Performs a GET request to the API, in order to obtain a single record
   * based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @param {string} params Appends additional parameters to the request, like
   *        filters or sorting
   * @return {Promise}
   */
  _this.getOne = (id, params) => {
    return new Promise((resolve, reject) => {
      _axios
          .get(`${_this.baseUrl}(${id})${params || ''}`)
          .then(response => resolve(response.data.d.results))
          .catch(error => reject(error))
    })
  }

  /**
   * Performs a POST request to the API, in order to insert a new record in
   * SharePoint list
   *
   * @param {object} data The object (using JSON notation) to be saved (fields
   *        names case must match with the list's)
   * @return {Promise}
   */
  _this.post = (data) => {
    return new Promise((resolve, reject) => {
      _axios
          .post(_this.baseUrl, data)
          .then(response => resolve(response.data.d.results))
          .catch(error => reject(error))
    })
  }
  /**
   * Performs a MERGE request to the API, in order to update the informed
   * fields of an existing record in SharePoint list
   *
   * @param {number} id Identification number for the record to be modified
   * @param {object} data The object (using JSON notation) to be changed (fields
   *         names case must match with the list's)
   * @return {Promise}
   */
  _this.merge = (id, data) => {
    return _axios.post(`${_this.baseUrl}(${id})`, data, {
      headers: {
        ..._axios.defaults.headers.common,
        'X-Http-Method': 'MERGE',
        'If-Match': '*'
      }
    })
  }

  /**
   * This is actualy an alternative to the 'merge' method, no difference, only
   * a matter of name
   *
   * @param {number} id Identification number for the record to be modified
   * @param {object} data The object (using JSON notation) to be changed (fields
   *        names case must match with the list's)
   * @return {Promise}
   */
  _this.put = (id, data) => {
    return _this.merge(id, data)
  }

  /**
   * This is actualy an alternative to the 'merge' method, no difference, only
   * a matter of name
   *
   * @param {number} id Identification number for the record to be modified
   * @param {object} data The object (using JSON notation) to be changed (fields
   *        names case must match with the list's)
   * @return {Promise}
   */
  _this.patch = (id, data) => {
    return _this.merge(id, data)
  }

  /**
   * Performs a POST (with 'DELETE' header) request to the API, in order to
   * delete an existing record in SharePoint list
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */
  _this.delete = (id) => {
    return _axios.post(`${_this.baseUrl}(${id})`, {}, {
      headers: {
        ..._axios.defaults.headers.common,
        'X-Http-Method': 'DELETE',
        'If-Match': '*'
      }
    })
  }
}