import { XomApiQueryString } from '../@types';
/**
 * Return URI to get basic information for current user
 */
export declare function current(): string;
/**
 * Return URI to get users list metadata
 */
export declare function listMetadata(): string;
/**
 * Return URI to get users list fields
 */
export declare function listFields(query?: XomApiQueryString): string;
/**
 * Return URI to get users records
 */
export declare function listItems(query?: XomApiQueryString): string;
/**
 * Return URI to get a given user information
 */
export declare function byId(id: number): string;
