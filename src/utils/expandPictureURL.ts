
const SMALL_PICTURE_CODE = '_SThumb'
const MEDIUM_PICTURE_CODE = '_MThumb'
const LARGE_PICTURE_CODE = '_LThumb'

/**
 * Properly expands picture size URL options for given object property.
 */
function expandPictureURL(userObject: any): any {
  if (userObject) {
    const url = userObject.Picture?.Url // encodeURI(userObject.Picture.Url)
    const targetExpression = new RegExp(`${SMALL_PICTURE_CODE}|${MEDIUM_PICTURE_CODE}|${LARGE_PICTURE_CODE}`, 'i')

    userObject.Picture = {
      Small: url?.replace(targetExpression, SMALL_PICTURE_CODE) || null,
      Medium: url?.replace(targetExpression, MEDIUM_PICTURE_CODE) || null,
      Large: url?.replace(targetExpression, LARGE_PICTURE_CODE) || null,
    }
  }

  return userObject
}

export default expandPictureURL
