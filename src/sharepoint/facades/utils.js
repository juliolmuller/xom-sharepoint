
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
    if (userObject.Picture === null) {
      userObject.Picture = { Small: null, Medium: null, Large: null }
    } else {
      const url = encodeURI(userObject.Picture.Url)
      const targetExpression = new RegExp(`${SMALL_PICTURE_CODE}|${MEDIUM_PICTURE_CODE}|${LARGE_PICTURE_CODE}`, 'i')

      userObject.Picture = {
        Small: url.replace(targetExpression, SMALL_PICTURE_CODE),
        Medium: url.replace(targetExpression, MEDIUM_PICTURE_CODE),
        Large: url.replace(targetExpression, LARGE_PICTURE_CODE),
      }
    }
  }

  return userObject
}

/**
 * Provide the query to find searched term with user properties
 *
 * @param {String} search
 */
utils.userSearchQuery = (search) => {
  const title = `substringof('${search}',Title)`
  const email = `substringof('${search}',EMail)`
  const lastName = `substringof('${search}',LastName)`
  const firstName = `substringof('${search}',FirstName)`
  const account = `substringof('${search}',AccountName)`

  return { $filter: `${title} or ${email} or ${lastName} or ${firstName} or ${account}` }
}

module.exports = utils
