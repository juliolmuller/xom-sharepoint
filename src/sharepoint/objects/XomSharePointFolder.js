const genFileBuffer = require('@lacussoft/to-arraybuffer')
const requests = require('../facades/requests')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * file library through its REST API
 *
 * @constructor
 * @param {String} folderAddress Library title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */
module.exports = function XomSharePointFolder(folderAddress, httpInstance) {

  /**
   * Store the SharePoint folder relative URL
   *
   * @private
   * @var {String}
   */
  let _address = folderAddress

  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  const _http = httpInstance

  /**
   * Store files type
   *
   * @private
   * @final
   * @var {String}
   */
  let _filesType

  /**
   * Define property to get 'relativeUrl' value
   *
   * @property {String} relativeUrl
   */
  Object.defineProperty(this, 'relativeUrl', {
    get() {
      const baseUrl = new URL(_http.defaults.baseURL)
      return `${baseUrl.pathname}/${_address}`
    },
    set(address) {
      _address = String(address)
    },
  })

  /**
   * Return a list of the folders within this folder
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */
  this.getSubfolders = (params = '') => requests.getFoldersInFolder(_http, this.relativeUrl, params)

  /**
   * Create a folder within this folder
   *
   * @param {String} folderName
   * @return {Promise<Object>}
   */
  this.createFolder = (folderName) => requests.createFolder(_http, this.relativeUrl, folderName)

  /**
   * Return a list of the files within this folder
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */
  this.getFiles = (params = '') => requests.getFilesInFolder(_http, this.relativeUrl, params)

  /**
   * Upload a file into the folder
   *
   * @param {String|HTMLElement|FileList|File} fileInput Some reference of the input type 'file':
   *          String - if it is a query selector;
   *          HTMLElement - if it is a direct reference to the input element;
   *          FileList - if it is direct reference to the 'files' attribute of the element; and
   *          File - if it is a direct reference to the file.
   *        For the three first options, as it will result in a array of files (FileList), only
   *        the first File of the collection will be selected. If you want to get the byte buffer
   *        of other files, provide a File instance explicitaly
   * @param {String} [customFileName] Define a custom name to the attached file
   * @return {Promise<Object>}
   */
  this.upload = async (fileInput, customFileName) => {
    const fileName = customFileName || genFileName(fileInput)
    const fileBuffer = await genFileBuffer(fileInput)
    const result = await requests.uploadFileToFolder(_http, this.relativeUrl, fileName, fileBuffer)
    _filesType = _filesType || result.__metadata.type
    return result
  }
}
