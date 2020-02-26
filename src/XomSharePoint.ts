import axios from 'axios'

/**
 * Intantiator of HTTP client to interact with SharePoint lists
 *
 * @class
 */
export default class XomSharePoint {

  private _http = axios.create()
  private _siteUrl: string
  private _listName: string

  /**
   * Instantiate an object to consume SharePoint REST API. As parameters,
   * consider the folloing full URL example you are targeting:
   * "https://ishareteam2.na.xom.com/sites/cfscuritiba/Lists/MyList/"
   *
   * @param {string} siteUrl Base URL of the SharePoint site which the list
   *        belongs to. At the example, the site URL is
   *        "https://ishareteam2.na.xom.com/sites/cfscuritiba"
   * @param {string} listName Name of the list you are targeting. At the
  *          example, the list name is "MyList"
   */
  constructor(siteUrl: string, listName: string = '') {
    this._siteUrl = siteUrl
    this._listName = listName
    this._http.defaults.withCredentials = true
    this._http.defaults.headers.common = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/jsonodata=verbose',
      'Accept': 'application/json odata=verbose',
    }
  }

  /**
   * Get 'siteUrl' property value
   *
   * @return {string}
   */
  get siteUrl() {
    return this._siteUrl
  }

  /**
   * Set 'siteUrl' property value
   *
   * @param {string} siteUrl
   */
  set siteUrl(siteUrl: string) {
    this._siteUrl = siteUrl
  }

  /**
   * Get 'listName' property value
   *
   * @return {string}
   */
  get listName() {
    return this._listName
  }

  /**
   * Set 'listName' property value
   *
   * @param {string} listName
   */
  set listName(listName) {
    this._listName = listName
  }

  /**
   * Get 'baseUrl' property value
   *
   * @return {string}
   */
  get baseUrl() {
    return `${this._siteUrl}/_vti_bin/listdata.svc/${this._listName}`
  }

  /**
   * Get 'baseAttachmentUrl' property value
   *
   * @return {string}
   */
  get baseAttachmentUrl() {
    return `${this._siteUrl}/_api/web/lists/getbytitle(${this._listName})`
  }

  /**
   * Queries the SharePoint API to grab user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {number} id Id of the user you want the information for
   * @return {Promise}
   */
  getUserInfo(id?: number) {
    if (id) {
      const data1 = this._http.get(`${this._siteUrl}/_api/Web/GetUserById(${id})`)
      const data2 = this._http.get(`${this._siteUrl}/_vti_bin/listdata.svc/UserInformationList?$filter=(Id0 eq ${id})`)
      return new Promise((resolve, reject) => {
        Promise.all([data1, data2])
            .then(responses => resolve({ ...responses[0].data.d, ...responses[1].data.d.results[0] }))
            .catch(error => reject(error))
      })
    }
    const data1 = this._http.get(`${this._siteUrl}/_api/web/CurrentUser`)
    const data2 = this._http.get(`${this._siteUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`)
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
  searchUser(name: string) {
    return new Promise((resolve, reject) => {
      this._http
          .get(`${this._siteUrl}/_vti_bin/listdata.svc/UserInformationList?$filter=substringof(${name},Name)`)
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
  get(params?: string) {
    return new Promise((resolve, reject) => {
      this._http
          .get(this.baseUrl + (params || ''))
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
  getOne(id: number, params?: string) {
    return new Promise((resolve, reject) => {
      this._http
          .get(`${this.baseUrl}(${id})${params || ''}`)
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
  async post(data: object) {
    return new Promise((resolve, reject) => {
      this._http
          .post(this.baseUrl, data)
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
  merge(id: number, data: object) {
    return this._http.post(`${this.baseUrl}(${id})`, data, {
      headers: {
        ...this._http.defaults.headers.common,
        'X-HTTP-Method': 'MERGE',
        'IF-MATCH': '*',
      },
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
  put(id: number, data: object) {
    return this.merge(id, data)
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
  patch(id: number, data: object) {
    return this.merge(id, data)
  }

  /**
   * Performs a POST (with 'DELETE' header) request to the API, in order to
   * delete an existing record in SharePoint list
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */
  delete(id: number) {
    return this._http.post( `${this.baseUrl}(${id})`, {}, {
      headers: {
        ...this._http.defaults.headers.common,
        'X-HTTP-Method': 'DELETE',
        'IF-MATCH': '*',
      },
    })
  }
}
