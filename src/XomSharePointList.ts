import { XomApiClient, XomApiResponse, XomApiQueryString } from './@types'
import genFileBuffer from '@lacussoft/to-arraybuffer'
import * as requests from './facades/requests'

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

  public get title(): string {
    return this._title
  }

  /**
   * Returns the list fields metadata;
   */
  public fields(params?: XomApiQueryString): Promise<XomApiResponse> {
    return requests.getListFields(this._http, this._title, params)
  }

  /**
   * Returns a list of the items stored in the list.
   */
  public get(params?: XomApiQueryString): Promise<XomApiResponse> {
    return requests.getListItems(this._http, this._title, params)
  }

  /**
   * Returns a single list item with the given ID.
   */
  public find(id: number, params?: XomApiQueryString): Promise<XomApiResponse> {
    return requests.getListItemById(this._http, this._title, id, params)
  }

  /**
   * Saves a new record in the SharePoint list.
   */
  public async post(data: any): Promise<XomApiResponse> {
    return requests.postListItem(this._http, this._title, await this._itemsType, data)
  }

  /**
   * Updates an existing record in the SharePoint list.
   */
  public async update(id: number, data: any): Promise<XomApiResponse> {
    return requests.patchListItem(this._http, this._title, id, await this._itemsType, data)
  }

  /**
   * Creates or updates a record based on an existing ID.
   */
  public save(data: any): Promise<XomApiResponse> {
    const { Id: id, ...rest } = data

    return id
      ? this.update(id, rest)
      : this.post(rest)
  }

  /**
   * Deletes an existing record from the SharePoint list.
   */
  public delete(id: number): Promise<XomApiResponse> {
    return requests.deleteListItem(this._http, this._title, id)
  }

  /**
   * Return a list of the attached files in the list item.
   */
  public getAttachmentsFrom(itemId: number): Promise<XomApiResponse> {
    return requests.getListItemAttachments(this._http, this._title, itemId)
  }

  /**
   * Uploads a file attachment to a list item.
   */
  public async attachTo(
    itemId: number,
    fileName: string,
    fileReference: string | HTMLInputElement | FileList | File | ArrayBuffer | Blob,
  ): Promise<XomApiResponse> {
    const fileBuffer = await genFileBuffer(fileReference)

    return requests.uploadListItemAttachment(this._http, this._title, itemId, fileName, fileBuffer)
  }

  /**
   * Renames a given file attachment.
   */
  public renameAttachment(itemId: number, currentName: string, newName: string): Promise<XomApiResponse> {
    return requests.renameListItemAttachment(this._http, this._title, itemId, currentName, newName)
  }

  /**
   * Removes a given file attachment from the list item.
   */
  public removeAttachment(itemId: number, fileName: string): Promise<XomApiResponse> {
    return requests.deleteListItemAttachment(this._http, this._title, itemId, fileName)
  }
}

export default XomSharePointList
