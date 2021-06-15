import httpFactory from './http/httpFactory'
import * as requests from './facades/requests'
import XomSharePointList from './XomSharePointList'
import XomSharePointSurvey from './XomSharePointSurvey'
import XomSharePointFolder from './XomSharePointFolder'
import userSearchQuery from './utils/userSearchQuery'

import type { XomApiClient, XomApiResponse } from './types'

/**
 * Instantiate the object with the necessary information to connect to a SharePoint site through its REST API.
 */
class XomSharePointSite {

  private _http: XomApiClient

  private _currUser: Promise<XomApiResponse>

  public constructor(baseSiteUrl: string) {
    this._http = httpFactory(baseSiteUrl)
    this._currUser = requests
      .getSiteCurrentUser(this._http)
      .then(({ Id: id }) => requests.getSiteUserById(this._http, id))
  }

  public get http() {
    return this._http
  }

  public get baseUrl() {
    return this._http.defaults.baseURL
  }

  /**
   * Gets the SharePoint site metadata.
   */
  public getInfo() {
    return requests.getSite(this._http)
  }

  /**
   * Queries the SharePoint API to get user information. Inform nothing to get
   * current user information or pass an specific user ID.
   */
  public getUserInfo(id?: number) {
    return id
      ? requests.getSiteUserById(this._http, id)
      : this._currUser
  }

  /**
   * Queries SharePoint API searching for user name.
   */
  public searchUser(search: string) {
    return requests.getSiteUsersListItems(this._http, userSearchQuery(search))
  }

  /**
   * Returns a reference to connect to a SharePoint list.
   */
  public getList(listTitle: string) {
    return new XomSharePointList(listTitle, this._http)
  }

  /**
   * Creates a new SharePoint list.
   */
  public createList(listTitle: string) {
    return requests.createList(this._http, listTitle)
  }

  /**
   * Deletes an existing SharePoint list.
   */

  public deleteList(listTitle: string) {
    return requests.deleteList(this._http, listTitle)
  }

  /**
   * Returns a reference to connect to a SharePoint survey.
   */
  public getSurvey(surveyTitle: string) {
    return new XomSharePointSurvey(surveyTitle, this._http)
  }

  /**
   * Returns a reference to connect to a SharePoint file library.
   */
  public getFolder(folderAddress: string) {
    return new XomSharePointFolder(folderAddress, this._http)
  }
}

export default XomSharePointSite
