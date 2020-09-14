import { XomApiQueryString, XomApiResponse } from '../@types';
import { XomApiClient } from '../@types';
/**
 * Fetch site root API
 */
export declare function getSite(http: XomApiClient): Promise<XomApiResponse>;
/**
 * Fetch site context API for the request digest
 */
export declare function getRequestDigest(http: XomApiClient): Promise<string>;
/**
 * Fetch for site parent metadata
 */
export declare function getSiteParent(http: XomApiClient): Promise<XomApiResponse>;
/**
 * Fetch list of content in site Recycle Bin
 */
export declare function getSiteRecycleBin(http: XomApiClient): Promise<XomApiResponse>;
/**
 * Fetch for site Regional Settings
 */
export declare function getSiteRegionalSettings(http: XomApiClient): Promise<XomApiResponse>;
/**
 * Fetch for basic current user information
 */
export declare function getSiteCurrentUser(http: XomApiClient): Promise<XomApiResponse>;
/**
 * Fetch list metadata for site users
 */
export declare function getSiteUsersList(http: XomApiClient): Promise<XomApiResponse>;
/**
 * Fetch list fields metadata for site users
 */
export declare function getSiteUsersListFields(http: XomApiClient, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Fetch list items for site users
 */
export declare function getSiteUsersListItems(http: XomApiClient, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Fetch a single list item with user information
 */
export declare function getSiteUserById(http: XomApiClient, id: number): Promise<XomApiResponse>;
/**
 * Fetch list of all site lists
 */
export declare function getLists(http: XomApiClient, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Create a new list in the site
 */
export declare function createList(http: XomApiClient, listTitle: string): Promise<XomApiResponse>;
/**
 * Delete an existing list in the site
 */
export declare function deleteList(http: XomApiClient, listTitle: string): Promise<XomApiResponse>;
/**
 * Fetch list metadata
 */
export declare function getListByTitle(http: XomApiClient, listTitle: string, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Fetch list metadata
 */
export declare function getListItemType(http: XomApiClient, listTitle: string): Promise<string>;
/**
 * Fetch list fields metadata
 */
export declare function getListFields(http: XomApiClient, listTitle: string, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Fetch list items
 */
export declare function getListItems(http: XomApiClient, listTitle: string, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Fetch a single list item
 */
export declare function getListItemById(http: XomApiClient, listTitle: string, itemId: number, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Create a new record to the list
 */
export declare function postListItem(http: XomApiClient, listTitle: string, type: string, data: any): Promise<XomApiResponse>;
/**
 * Update an existing record in the list
 */
export declare function patchListItem(http: XomApiClient, listTitle: string, itemId: number, type: string, data: any): Promise<XomApiResponse>;
/**
 * Update an existing record in the list
 */
export declare function deleteListItem(http: XomApiClient, listTitle: string, itemId: number): Promise<XomApiResponse>;
/**
 * Fetch attachments of a given list item
 */
export declare function getListItemAttachments(http: XomApiClient, listTitle: string, itemId: number): Promise<XomApiResponse>;
/**
 * Upload an attachment to a given list item
 */
export declare function uploadListItemAttachment(http: XomApiClient, listTitle: string, itemId: number, fileName: string, fileBuffer: ArrayBuffer): Promise<XomApiResponse>;
/**
 * Rename an existing attachment from a given list item
 */
export declare function renameListItemAttachment(http: XomApiClient, listTitle: string, itemId: number, currentFileName: string, newFileName: string): Promise<XomApiResponse>;
/**
 * Delete an attachment of a given list item
 */
export declare function deleteListItemAttachment(http: XomApiClient, listTitle: string, itemId: number, fileName: string): Promise<XomApiResponse>;
/**
 * Fetch list of all site folders/libraries
 */
export declare function getFolders(http: XomApiClient, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Fetch the content with a given folder/library based on its relative URL
 */
export declare function getFolderByUrl(http: XomApiClient, relativeUrl: string): Promise<XomApiResponse>;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */
export declare function getFoldersInFolder(http: XomApiClient, relativeUrl: string, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Creates a new folder given library or folder based on its relative URL
 */
export declare function createFolder(http: XomApiClient, relativeUrl: string, folderName: string): Promise<XomApiResponse>;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */
export declare function getFilesInFolder(http: XomApiClient, relativeUrl: string, query?: XomApiQueryString): Promise<XomApiResponse>;
/**
 * Fetch the content with a given file within a library based on its relative URL
 */
export declare function getFileByUrl(http: XomApiClient, relativeUrl: string): Promise<XomApiResponse>;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */
export declare function uploadFileToFolder(http: XomApiClient, relativeUrl: string, fileName: string, fileBuffer: ArrayBuffer): Promise<XomApiResponse>;
