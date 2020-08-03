
/**
 * Define all utilities methods
 *
 * @var {Object<Function>}
 */
const utils = {}

/**
 * Properly expands picture size URL options for given object property
 *
 * @param {Object} userObject User object expected
 * @return {void}
 */
utils.expandPictureURL = (userObject) => {
  const SMALL_PICTURE_CODE = '_SThumb'
  const MEDIUM_PICTURE_CODE = '_MThumb'
  const LARGE_PICTURE_CODE = '_LThumb'

  if (userObject && typeof userObject.Picture !== 'undefined') {
    const url = encodeURI(userObject.Picture.Url)
    const targetExpression = new RegExp(`${SMALL_PICTURE_CODE}|${MEDIUM_PICTURE_CODE}|${LARGE_PICTURE_CODE}`, 'i')

    userObject.Picture = {
      Small: url.replace(targetExpression, SMALL_PICTURE_CODE),
      Medium: url.replace(targetExpression, MEDIUM_PICTURE_CODE),
      Large: url.replace(targetExpression, LARGE_PICTURE_CODE),
    }
  }

  return userObject
}

module.exports = utils
