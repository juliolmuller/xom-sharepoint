import { XomApiClient, XomApiResponse, XomApiQueryString } from './@types';
/**
 * Instantiate the object with the necessary information to connect to a SharePoint list through its REST API.
 */
declare class XomSharePointList {
    private _title;
    private _http;
    private _itemsType;
    constructor(listTitle: string, httpInstance: XomApiClient);
    get title(): string;
    /**
     * Returns the list fields metadata;
     */
    getFields(params?: XomApiQueryString): Promise<XomApiResponse>;
    /**
     * Returns a list of the items stored in the list.
     */
    getItems(params?: XomApiQueryString): Promise<XomApiResponse>;
    /**
     * Returns a single list item with the given ID.
     */
    findItem(itemId: number, params?: XomApiQueryString): Promise<XomApiResponse>;
    /**
     * Creates or updates a record based on an existing ID.
     */
    saveItem(data: any): Promise<XomApiResponse>;
    saveItem(itemId: number, data: any): Promise<XomApiResponse>;
    /**
     * Saves a new record in the SharePoint list.
     */
    createItem(data: any): Promise<XomApiResponse>;
    /**
     * Updates an existing record in the SharePoint list.
     */
    updateItem(item: any): Promise<XomApiResponse>;
    updateItem(itemId: number, data: any): Promise<XomApiResponse>;
    /**
     * Deletes an existing record from the SharePoint list.
     */
    deleteItem(item: any): Promise<XomApiResponse>;
    deleteItem(itemId: number): Promise<XomApiResponse>;
    /**
     * Return a list of the attached files in the list item.
     */
    getAttachments(item: any): Promise<XomApiResponse>;
    getAttachments(itemId: number): Promise<XomApiResponse>;
    /**
     * Uploads a file attachment to a list item.
     */
    addAttachment(item: any, fileName: string, fileReference: string | HTMLInputElement | FileList | File | ArrayBuffer | Blob): Promise<XomApiResponse>;
    addAttachment(itemId: number, fileName: string, fileReference: string | HTMLInputElement | FileList | File | ArrayBuffer | Blob): Promise<XomApiResponse>;
    /**
     * Renames a given file attachment.
     */
    renameAttachment(item: any, currentName: string, newName: string): Promise<XomApiResponse>;
    renameAttachment(itemId: number, currentName: string, newName: string): Promise<XomApiResponse>;
    /**
     * Removes a given file attachment from the list item.
     */
    deleteAttachment(item: any, fileName: string): Promise<XomApiResponse>;
    deleteAttachment(itemId: number, fileName: string): Promise<XomApiResponse>;
}
export default XomSharePointList;
