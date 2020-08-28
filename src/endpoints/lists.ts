import { XomApiQueryString } from '../@types'
import { baseApiUri } from './common'
import * as folders from './folders'
import stringifyQuery from '../utils/stringifyQuery'

/**
 * Return URI to get aall lists metadata
 */
export function index(query?: XomApiQueryString): string {
  return `${baseApiUri()}/Lists${stringifyQuery(query)}`
}

/**
 * Return URI to get a given list metadata
 */
export function byTitle(listTitle: string, query?: XomApiQueryString): string {
  return `${index()}/GetByTitle('${listTitle}')${stringifyQuery(query)}`
}

/**
 * Return URI to get a given list fields
 */
export function fields(listTitle: string, query?: XomApiQueryString): string {
  return `${byTitle(listTitle)}/Fields${stringifyQuery(query)}`
}

/**
 * Return URI to get a given list items
 */
export function items(listTitle: string, query?: XomApiQueryString): string {
  return `${byTitle(listTitle)}/Items${stringifyQuery(query)}`
}

/**
 * Return URI to get an specific list item
 */
export function itemById(listTitle: string, itemId: number, query?: XomApiQueryString): string {
  return items(listTitle, `(${itemId})${stringifyQuery(query)}`)
}

/**
 * Return URI to handle list items attachments
 */
export function itemAttachments(listTitle: string, itemId: number): string {
  return `${itemById(listTitle, itemId)}/AttachmentFiles`
}

/**
 * Return URI to handle list items attachments
 */
export function itemAttachmentByName(listTitle: string, itemId: number, fileName: string): string {
  return `${itemById(listTitle, itemId)}/AttachmentFiles/GetByFileName('${fileName}')`
}

/**
 * Return URI to handle upload of list items attachments
 */
export function itemAttachmentsUpload(listTitle: string, itemId: number, fileName: string): string {
  return `${itemAttachments(listTitle, itemId)}/Add(filename='${fileName}')`
}

/**
 * Return URI to handle renaming of list items attachments
 */
export function itemAttachmentsRename(oldFileUrl: string, newFileUrl: string): string {
  return `${folders.fileByUrl(oldFileUrl)}/MoveTo(newurl='${newFileUrl}',flags=1)`
}
