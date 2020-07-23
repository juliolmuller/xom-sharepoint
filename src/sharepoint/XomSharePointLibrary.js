const genFileBuffer = require('@lacussoft/to-arraybuffer')
const requests = require('./facades/requests')

/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * file library through its REST API
 *
 * @constructor
 * @param {String} folderAddress Library title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */
module.exports = function XomSharePointLibrary(folderAddress, httpInstance) {

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
  this.getSubfolders = (params = '') => {
    return requests.getFoldersInFolder(_http, this.relativeUrl, params)
  }

  /**
   * Create a folder within this folder
   *
   * @param {String} folderName
   * @return {Promise<Object>}
   */
  this.createFolder = (folderName) => {
    return requests.createFolder(_http, this.relativeUrl, folderName)
  }

  /**
   * Return a list of the files within this folder
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */
  this.getFiles = (params = '') => {
    return requests.getFilesInFolder(_http, this.relativeUrl, params)
  }

  /**
   * Upload a file into the folder
   *
   * @param {String} fileName
   * @param {String|HTMLInputElement|FileList|File|Blob|ArrayBuffer} fileReference
   *          ArrayBuffer - raw data ready to be sent;
   *          Blob - if it is a file reference created on the fly;
   *          String - if it is a query selector;
   *          HTMLInputElement - if it is a direct reference to the HTML element of type "file";
   *          FileList - if it is a direct reference to the "files" attribute of the element;
   *          File - if it is a direct reference to the file
   * @return {Promise<Object>}
   */
  this.upload = async (fileName, fileReference) => {
    const fileBuffer = await genFileBuffer(fileReference)
    const result = await requests.uploadFileToFolder(_http, this.relativeUrl, fileName, fileBuffer)
    _filesType = _filesType || result.__metadata.type
    return result
  }
}
