import genFileBuffer from 'file2arraybuffer'
import * as requests from './facades/requests'

import type { XomApiClient, XomApiResponse, XomApiQueryString } from './types'

/**
 * Instantiate the object with the necessary information to connect to a SharePoint file library through its REST API.
 */
class XomSharePointLibrary {

  private _address: string

  private _http: XomApiClient

  private _filesType: string

  constructor(folderAddress: string, httpInstance: XomApiClient) {
    this._address = folderAddress
    this._http = httpInstance
    this._filesType = ''
  }

  public get relativeUrl() {
    const baseUrl = new URL(this._http.defaults.baseURL as string)

    return `${baseUrl.pathname}/${this._address}`
  }

  /**
   * Returns a list of the folders within the folder.
   */
  public listSubfolders(params?: XomApiQueryString) {
    return requests.getFoldersInFolder(this._http, this.relativeUrl, params)
  }

  /**
   * Creates a folder within this folder.
   */
  public createSubfolder(folderName: string) {
    return requests.createFolder(this._http, this.relativeUrl, folderName)
  }

  /**
   * Returns a list of the files within this folder.
   */
  public listFiles(params?: XomApiQueryString) {
    return requests.getFilesInFolder(this._http, this.relativeUrl, params)
  }

  /**
   * Uploads a file into the folder.
   */
  public uploadFile(fileName: string, fileArrayBuffer: ArrayBuffer): Promise<XomApiResponse>
  public uploadFile(fileName: string, blobInstance: Blob): Promise<XomApiResponse>
  public uploadFile(fileName: string, querySelector: string): Promise<XomApiResponse>
  public uploadFile(fileName: string, fileInputElement: HTMLInputElement): Promise<XomApiResponse>
  public uploadFile(fileName: string, fileInputContent: FileList): Promise<XomApiResponse>
  public uploadFile(fileName: string, fileInstance: File): Promise<XomApiResponse>
  public async uploadFile(fileName: string, fileReference: any) {
    const fileBuffer = await genFileBuffer(fileReference)
    const result = await requests.uploadFileToFolder(this._http, this.relativeUrl, fileName, fileBuffer)

    this._filesType = this._filesType || result.__metadata.type

    return result
  }
}

export default XomSharePointLibrary
