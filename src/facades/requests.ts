import { XomApiQueryString, XomApiResponse } from '../@types'
import { XomApiClient } from '../@types'
import * as endpoints from '../endpoints'
import rewrapResponse from '../utils/rewrapResponse'
import expandPictureURL from '../utils/expandPictureURL'

interface Blah {
  name: string;
  code: number,
  admin?: boolean
}

/**
 * Fetch site root API
 */
export function getSite(http: XomApiClient): Promise<XomApiResponse> {
  const uri = endpoints.site.info()

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch site context API for the request digest
 */
export async function getRequestDigest(http: XomApiClient): Promise<string> {
  const uri = endpoints.site.contextInfo()
  const response = await http
    .post(uri, null, { digest: false })
    .then(rewrapResponse)

  return response.FormDigestValue || response.GetContextWebInformation.FormDigestValue
}

/**
 * Fetch for site parent metadata
 */
export function getSiteParent(http: XomApiClient): Promise<XomApiResponse> {
  const uri = endpoints.site.parentSite()

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch list of content in site Recycle Bin
 */
export function getSiteRecycleBin(http: XomApiClient): Promise<XomApiResponse> {
  const uri = endpoints.site.recycleBin()

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch for site Regional Settings
 */
export function getSiteRegionalSettings(http: XomApiClient): Promise<XomApiResponse> {
  const uri = endpoints.site.regionalSettings()

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch for basic current user information
 */
export function getSiteCurrentUser(http: XomApiClient): Promise<XomApiResponse> {
  const uri = endpoints.users.current()
  return http
    .get(uri)
    .then(rewrapResponse)
    .then(expandPictureURL)
}

/**
 * Fetch list metadata for site users
 */
export function getSiteUsersList(http: XomApiClient): Promise<XomApiResponse> {
  const uri = endpoints.users.listMetadata()

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch list fields metadata for site users
 */
export function getSiteUsersListFields(
  http: XomApiClient,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.users.listFields(query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch list items for site users
 */
export async function getSiteUsersListItems(
  http: XomApiClient,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.users.listItems(query)
  const users = await http
    .get(uri)
    .then(rewrapResponse)
  users.forEach(expandPictureURL)

  return users
}

/**
 * Fetch a single list item with user information
 */
export function getSiteUserById(http: XomApiClient, id: number): Promise<XomApiResponse> {
  const uri = endpoints.users.byId(id)

  return http
    .get(uri)
    .then(rewrapResponse)
    .then(expandPictureURL)
}

/**
 * Fetch list of all site lists
 */
export function getLists(http: XomApiClient, query?: XomApiQueryString): Promise<XomApiResponse> {
  const uri = endpoints.lists.index(query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Create a new list in the site
 */
export function createList(http: XomApiClient, listTitle: string): Promise<XomApiResponse> {
  const uri = endpoints.lists.index()
  const metadata = {
    __metadata: { type: 'SP.List' },
    BaseTemplate: 100,
    Title: listTitle,
  }

  return http
    .post(uri, metadata)
    .then(rewrapResponse)
}

/**
 * Delete an existing list in the site
 */
export function deleteList(http: XomApiClient, listTitle: string): Promise<XomApiResponse> {
  const uri = endpoints.lists.byTitle(listTitle)

  return http
    .delete(uri)
    .then(rewrapResponse)
}

/**
 * Fetch list metadata
 */
export function getListByTitle(
  http: XomApiClient,
  listTitle: string,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.byTitle(listTitle, query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch list metadata
 */
export async function getListItemType(http: XomApiClient, listTitle: string): Promise<string> {
  const response = await getListByTitle(http, listTitle, {
    $select: 'ListItemEntityTypeFullName',
  })

  return response.ListItemEntityTypeFullName
}

/**
 * Fetch list fields metadata
 */
export function getListFields(
  http: XomApiClient,
  listTitle: string,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.fields(listTitle, query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch list items
 */
export function getListItems(
  http: XomApiClient,
  listTitle: string,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.items(listTitle, query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch a single list item
 */
export function getListItemById(
  http: XomApiClient,
  listTitle: string,
  itemId: number,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.itemById(listTitle, itemId, query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Create a new record to the list
 */
export function postListItem(
  http: XomApiClient,
  listTitle: string,
  type: string,
  data: any,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.items(listTitle)
  const metadata = {
    __metadata: { type },
    ...data,
  }

  return http
    .post(uri, metadata)
    .then(rewrapResponse)
}

/**
 * Update an existing record in the list
 */
export async function patchListItem(
  http: XomApiClient,
  listTitle: string,
  itemId: number,
  type: string,
  data: any,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.itemById(listTitle, itemId)
  const metadata = {
    __metadata: { type },
    ...data,
  }
  const { __response: patchResponse } = await http
    .patch(uri, metadata)
    .then(rewrapResponse)
  const updatedItem = await getListItemById(http, listTitle, itemId)
  updatedItem.__response = patchResponse

  return updatedItem
}

/**
 * Update an existing record in the list
 */
export async function deleteListItem(
  http: XomApiClient,
  listTitle: string,
  itemId: number,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.itemById(listTitle, itemId)
  const originalItem = await getListItemById(http, listTitle, itemId)
  const { __response: deleteResponse } = await http
    .delete(uri)
    .then(rewrapResponse)
  originalItem.__response = deleteResponse

  return originalItem
}

/**
 * Fetch attachments of a given list item
 */
export function getListItemAttachments(
  http: XomApiClient,
  listTitle: string,
  itemId: number,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.itemAttachments(listTitle, itemId)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Upload an attachment to a given list item
 */
export function uploadListItemAttachment(
  http: XomApiClient,
  listTitle: string,
  itemId: number,
  fileName: string,
  fileBuffer: ArrayBuffer,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.itemAttachmentsUpload(listTitle, itemId, fileName)

  return http
    .post(uri, fileBuffer)
    .then(rewrapResponse)
}

/**
 * Rename an existing attachment from a given list item
 */
export async function renameListItemAttachment(
  http: XomApiClient,
  listTitle: string,
  itemId: number,
  currentFileName: string,
  newFileName: string,
): Promise<XomApiResponse> {
  const attachments = await getListItemAttachments(http, listTitle, itemId)
  const oldFileUrl = attachments.find((att: any) => att.FileName === currentFileName).ServerRelativeUrl
  const newFileUrl = oldFileUrl.replace(currentFileName, newFileName)
  const uri = endpoints.lists.itemAttachmentsRename(oldFileUrl, newFileUrl)

  return http
    .patch(uri)
    .then(rewrapResponse)
}

/**
 * Delete an attachment of a given list item
 */
export function deleteListItemAttachment(
  http: XomApiClient,
  listTitle: string,
  itemId: number,
  fileName: string,
): Promise<XomApiResponse> {
  const uri = endpoints.lists.itemAttachmentByName(listTitle, itemId, fileName)

  return http
    .delete(uri)
    .then(rewrapResponse)
}

/**
 * Fetch list of all site folders/libraries
 */
export function getFolders(http: XomApiClient, query?: XomApiQueryString): Promise<XomApiResponse> {
  const uri = endpoints.folders.index(query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch the content with a given folder/library based on its relative URL
 */
export function getFolderByUrl(http: XomApiClient, relativeUrl: string): Promise<XomApiResponse> {
  const uri = endpoints.folders.folderByUrl(relativeUrl)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch the existing folders within a given folder based on its relative URL
 */
export function getFoldersInFolder(
  http: XomApiClient,
  relativeUrl: string,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.folders.foldersInFolder(relativeUrl, query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Creates a new folder given library or folder based on its relative URL
 */
export function createFolder(
  http: XomApiClient,
  relativeUrl: string,
  folderName: string,
): Promise<XomApiResponse> {
  const uri = endpoints.folders.index()
  const metadata = {
    ServerRelativeUrl: `${relativeUrl}/${folderName}`,
    __metadata: {
      type: 'SP.Folder',
    },
  }

  return http
    .post(uri, metadata)
    .then(rewrapResponse)
}

/**
 * Fetch the existing folders within a given folder based on its relative URL
 */
export function getFilesInFolder(
  http: XomApiClient,
  relativeUrl: string,
  query?: XomApiQueryString,
): Promise<XomApiResponse> {
  const uri = endpoints.folders.filesInFolder(relativeUrl, query)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch the content with a given file within a library based on its relative URL
 */
export function getFileByUrl(http: XomApiClient, relativeUrl: string): Promise<XomApiResponse> {
  const uri = endpoints.folders.fileByUrl(relativeUrl)

  return http
    .get(uri)
    .then(rewrapResponse)
}

/**
 * Fetch the existing folders within a given folder based on its relative URL
 */
export function uploadFileToFolder(
  http: XomApiClient,
  relativeUrl: string,
  fileName: string,
  fileBuffer: ArrayBuffer,
): Promise<XomApiResponse> {
  const uri = endpoints.folders.newFileToFolder(relativeUrl, fileName)

  return http
    .post(uri, fileBuffer)
    .then(rewrapResponse)
}
