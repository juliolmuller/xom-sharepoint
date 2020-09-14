import { XomApiQueryString } from '../@types';
/**
 * Return URI for all the libraries
 */
export declare function index(query?: XomApiQueryString): string;
/**
 * Return URI to access folder by relative URL
 */
export declare function folderByUrl(relativeUrl: string): string;
/**
 * Return URL to list of folders within a given folder
 */
export declare function foldersInFolder(relativeUrl: string, query?: XomApiQueryString): string;
/**
 * Return URL to list of files within a given folder
 */
export declare function filesInFolder(relativeUrl: string, query?: XomApiQueryString): string;
/**
 * Return URL to upload a file to a folder
 */
export declare function newFileToFolder(relativeUrl: string, fileName: string, overwrite?: boolean): string;
/**
 * Return URI to access files by relative URL
 */
export declare function fileByUrl(relativeUrl: string): string;
