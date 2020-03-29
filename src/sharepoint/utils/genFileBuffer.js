/* eslint-disable operator-linebreak */

/**
 * Generate a byte buffer from a HTML file input
 *
 * @param {string|HTMLElement|FileList|File} input Some reference of the input type 'file':
 *          String - if it is a query selector;
 *          HTMLElement - if it is a direct reference to the input element;
 *          FileList - if it is direct reference to the 'files' attribute of the element; and
 *          File - if it is a direct reference to the file.
 *        For the three first options, as it will result in a array of files (FileList), only
 *        the first File of the collection will be selected. If you want to get the byte buffer
 *        of other files, provide a File instance explicitaly
 * @return {Promise<ArrayBuffer>}
 */
module.exports = function genFileBuffer(input) {
  const reader = new FileReader()
  const file = (() => {
    switch (input.constructor.name) {
      case 'String':
        input = document.querySelector(input)
        /* fall through */
      case 'HTMLInputElement':
        input = input.files
        /* fall through */
      case 'FileList':
        input = input[0]
        /* fall through */
      case 'File':
        return input
      default:
        throw new TypeError('Type must be an instance of HTMLInputElement, FileList, File or String (input selector)')
    }
  })()

  return new Promise((resolve, reject) => {
    reader.onloadend = ev => resolve(ev.target.result)
    reader.onerror = ev => reject(ev.target.error)
    reader.readAsArrayBuffer(file)
  })
}
