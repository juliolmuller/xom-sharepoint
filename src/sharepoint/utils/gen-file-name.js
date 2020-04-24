
/**
 * Extract file name based on a given input object
 *
 * @param {String|HTMLElement|FileList|File} baseInput Some reference of the input type 'file':
 *          String - if it is a query selector;
 *          HTMLElement - if it is a direct reference to the input element;
 *          FileList - if it is direct reference to the 'files' attribute of the element; and
 *          File - if it is a direct reference to the file.
 *        For the three first options, as it will result in a array of files (FileList), only
 *        the first File of the collection will be selected
 * @return {String}
 */
module.exports = function genFileName(baseInput) {
  let input = baseInput
  switch (input.constructor.name) {
    case 'String':
      input = document.querySelector(input)
      /* fall through */
    case 'HTMLInputElement':
      input = input.files
      /* fall through */
    case 'FileList':
      [input] = input
      /* fall through */
    case 'File':
      return input.name
    default:
      return null
  }
}