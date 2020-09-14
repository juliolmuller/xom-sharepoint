import { XomApiQueryString } from '../@types';
/**
 * Return URI to get aall lists metadata
 */
export declare function index(query?: XomApiQueryString): string;
/**
 * Return URI to get a given list metadata
 */
export declare function byTitle(listTitle: string, query?: XomApiQueryString): string;
/**
 * Return URI to get a given list fields
 */
export declare function fields(listTitle: string, query?: XomApiQueryString): string;
/**
 * Return URI to get a given list items
 */
export declare function items(listTitle: string, query?: XomApiQueryString): string;
/**
 * Return URI to get an specific list item
 */
export declare function itemById(listTitle: string, itemId: number, query?: XomApiQueryString): string;
/**
 * Return URI to handle list items attachments
 */
export declare function itemAttachments(listTitle: string, itemId: number): string;
/**
 * Return URI to handle list items attachments
 */
export declare function itemAttachmentByName(listTitle: string, itemId: number, fileName: string): string;
/**
 * Return URI to handle upload of list items attachments
 */
export declare function itemAttachmentsUpload(listTitle: string, itemId: number, fileName: string): string;
/**
 * Return URI to handle renaming of list items attachments
 */
export declare function itemAttachmentsRename(oldFileUrl: string, newFileUrl: string): string;
