import genFileBuffer from '@lacussoft/to-arraybuffer'
import * as exceptions from './facades/exceptions'
import * as requests from './facades/requests'

import type { XomApiClient, XomApiResponse, XomApiQueryString } from './types'

/**
 * Instantiate the object with the necessary information to connect to a SharePoint list through its REST API.
 */
class XomSharePointList {

  private _title: string

  private _http: XomApiClient

  private _itemsType: Promise<string>

  constructor(listTitle: string, httpInstance: XomApiClient) {
    this._title = listTitle
    this._http = httpInstance
    this._itemsType = requests.getListItemType(this._http, this._title)
  }

  public get title() {
    return this._title
  }

  /**
   * Returns the list fields metadata;
   */
  public getFields(params?: XomApiQueryString) {
    return requests.getListFields(this._http, this._title, params)
  }

  /**
   * Returns a list of the items stored in the list.
   */
  public getItems(params?: XomApiQueryString) {
    return requests.getListItems(this._http, this._title, params)
  }

  /**
   * Returns a single list item with the given ID.
   */
  public findItem(itemId: number, params?: XomApiQueryString) {
    return requests.getListItemById(this._http, this._title, itemId, params)
  }

  /**
   * Creates or updates a record based on an existing ID.
   */
  public saveItem(data: any): Promise<XomApiResponse>
  public saveItem(itemId: number, data: any): Promise<XomApiResponse>
  public saveItem(param1: any, param2?: any) {
    const { Id: id, ...rest } = param2 || param1

    return id
      ? this.updateItem(id, rest)
      : this.createItem(rest)
  }

  /**
   * Saves a new record in the SharePoint list.
   */
  public async createItem(data: any) {
    return requests.postListItem(this._http, this._title, await this._itemsType, data)
  }

  /**
   * Updates an existing record in the SharePoint list.
   */
  public updateItem(item: any): Promise<XomApiResponse>
  public updateItem(itemId: number, data: any): Promise<XomApiResponse>
  public async updateItem(param1: any, param2?: any) {
    const { Id: id = param1, ...rest } = param2 || param1

    if (isNaN(id)) {
      throw exceptions.missingItemId()
    }

    return requests.patchListItem(this._http, this._title, id, await this._itemsType, rest)
  }

  /**
   * Deletes an existing record from the SharePoint list.
   */
  public deleteItem(item: any): Promise<XomApiResponse>
  public deleteItem(itemId: number): Promise<XomApiResponse>
  public deleteItem(param1: any) {
    const { Id: id = param1 } = param1

    if (isNaN(id)) {
      throw exceptions.missingItemId()
    }

    return requests.deleteListItem(this._http, this._title, id)
  }

  /**
   * Return a list of the attached files in the list item.
   */
  public getAttachments(item: any): Promise<XomApiResponse>
  public getAttachments(itemId: number): Promise<XomApiResponse>
  public getAttachments(param1: any) {
    const { Id: id = param1 } = param1

    if (isNaN(id)) {
      throw exceptions.missingItemId()
    }

    return requests.getListItemAttachments(this._http, this._title, id)
  }

  /**
   * Uploads a file attachment to a list item.
   */
  public addAttachment(
    item: any,
    fileName: string,
    fileReference: string | HTMLInputElement | FileList | File | ArrayBuffer | Blob,
  ): Promise<XomApiResponse>
  public async addAttachment(
    itemId: number,
    fileName: string,
    fileReference: string | HTMLInputElement | FileList | File | ArrayBuffer | Blob,
  ): Promise<XomApiResponse>
  public async addAttachment(
    param1: any,
    fileName: string,
    fileReference: string | HTMLInputElement | FileList | File | ArrayBuffer | Blob,
  ) {
    const fileBuffer = await genFileBuffer(fileReference)
    const { Id: id = param1 } = param1

    if (isNaN(id)) {
      throw exceptions.missingItemId()
    }

    return requests.uploadListItemAttachment(this._http, this._title, id, fileName, fileBuffer)
  }

  /**
   * Renames a given file attachment.
   */
  public renameAttachment(item: any, currentName: string, newName: string): Promise<XomApiResponse>
  public renameAttachment(itemId: number, currentName: string, newName: string): Promise<XomApiResponse>
  public renameAttachment(param1: any, currentName: string, newName: string) {
    const { Id: id = param1 } = param1

    if (isNaN(id)) {
      throw exceptions.missingItemId()
    }

    return requests.renameListItemAttachment(this._http, this._title, id, currentName, newName)
  }

  /**
   * Removes a given file attachment from the list item.
   */
  public deleteAttachment(item: any, fileName: string): Promise<XomApiResponse>
  public deleteAttachment(itemId: number, fileName: string): Promise<XomApiResponse>
  public deleteAttachment(param1: any, fileName: string) {
    const { Id: id = param1 } = param1

    if (isNaN(id)) {
      throw exceptions.missingItemId()
    }

    return requests.deleteListItemAttachment(this._http, this._title, id, fileName)
  }
}

export default XomSharePointList
