import { XomApiQueryString } from '../@types'
import { baseApiUri } from './common'
import stringifyQuery from '../utils/stringifyQuery'

/**
 * Return URI for all the libraries
 */
export function index(query?: XomApiQueryString): string {
  return `${baseApiUri()}/Folders${stringifyQuery(query)}`
}

/**
 * Return URI to access folder by relative URL
 */
export function folderByUrl(relativeUrl: string): string {
  return `${baseApiUri()}/GetFolderByServerRelativeUrl('${relativeUrl}')`
}

/**
 * Return URL to list of folders within a given folder
 */
export function foldersInFolder(relativeUrl: string, query?: XomApiQueryString): string {
  return `${folderByUrl(relativeUrl)}/Folders${stringifyQuery(query)}`
}

/**
 * Return URL to list of files within a given folder
 */
export function filesInFolder(relativeUrl: string, query?: XomApiQueryString): string {
  return `${folderByUrl(relativeUrl)}/Files${stringifyQuery(query)}`
}

/**
 * Return URL to upload a file to a folder
 */
export function newFileToFolder(relativeUrl: string, fileName: string, overwrite = true): string {
  return `${filesInFolder(relativeUrl)}/Add(overwrite=${overwrite},url='${fileName}')`
}

/**
 * Return URI to access files by relative URL
 */
export function fileByUrl(relativeUrl: string): string {
  return `${baseApiUri()}/GetFileByServerRelativeUrl('${relativeUrl}')`
}
