import { XomApiClient, XomApiResponse, XomApiQueryString } from './@types';
/**
 * Instantiate the object with the necessary information to connect to a SharePoint file library through its REST API.
 */
declare class XomSharePointLibrary {
    private _address;
    private _http;
    private _filesType;
    constructor(folderAddress: string, httpInstance: XomApiClient);
    get relativeUrl(): string;
    /**
     * Returns a list of the folders within the folder.
     */
    listSubfolders(params?: XomApiQueryString): Promise<XomApiResponse>;
    /**
     * Creates a folder within this folder.
     */
    createSubfolder(folderName: string): Promise<XomApiResponse>;
    /**
     * Returns a list of the files within this folder.
     */
    listFiles(params?: XomApiQueryString): Promise<XomApiResponse>;
    /**
     * Uploads a file into the folder.
     */
    uploadFile(fileName: string, fileReference: string | HTMLInputElement | FileList | File | ArrayBuffer | Blob): Promise<XomApiResponse>;
}
export default XomSharePointLibrary;
