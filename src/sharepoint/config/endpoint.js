
/**
 * Group of functions to get SharePoint API URI endpoints
 */
module.exports = {

  /**
   * Return URI for site metadata
   *
   * @return {string}
   */
  siteInfo: () => '/_api/web',

  /**
   * Return URI for site context information
   *
   * @return {string}
   */
  contextInfo: () => '/_api/ContextInfo',

  /**
   * Return URI to get a user information
   *
   * @param {number} userId
   * @return {string}
   */
  user: (userId) => `/_api/Web/GetUserById(${userId})`,

  /**
   * Return URI to get additional user information
   *
   * @return {string}
   */
  userInfo: () => '/_vti_bin/listdata.svc/UserInformationList',

  /**
   * Return URI to get current user information
   *
   * @return {string}
   */
  currentUser: () => '/_api/web/CurrentUser',

  /**
   * Return URI to get additional current user information
   *
   * @return {string}
   */
  currentUserInfo: () => '/_api/SP.UserProfiles.PeopleManager/GetMyProperties',

  /**
   * Return URI tfor site resources/lists index
   *
   * @return {string}
   */
  resourcesIndex: () => '/_api/lists',

  /**
   * Return URI to touch a list
   *
   * @param {string} listTitle
   * @return {string}
   */
  list: (listTitle) => `/_api/web/lists/getByTitle('${listTitle}')`,

  /**
   * Return URI to list fields and their metadata
   *
   * @param {string} listTitle
   * @return {string}
   */
  listFields: (listTitle) => `/_api/web/lists/getByTitle('${listTitle}')/fields`,

  /**
   * Return URI to handle list items
   *
   * @param {string} listUri
   * @return {string}
   */
  listItems: (listUri) => `/_vti_bin/listdata.svc/${listUri}`,

  /**
   * Return URI to handle list items attachments
   *
   * @param {string} listTitle
   * @param {number} itemId
   * @return {string}
   */
  listItemsAttachment: (listTitle, itemId) => `/_api/web/lists/getByTitle('${listTitle}')/items(${itemId})/AttachmentFiles`,

  /**
   * Return URI to access resources by relative URL
   *
   * @param {string} relativeUrl
   * @return {string}
   */
  serverResource: (relativeUrl) => `/_api/web/getFileByServerRelativeUrl('${relativeUrl}')`,
}
