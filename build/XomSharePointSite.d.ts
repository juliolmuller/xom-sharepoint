import { XomApiClient, XomApiResponse } from './@types';
import XomSharePointList from './XomSharePointList';
import XomSharePointSurvey from './XomSharePointSurvey';
import XomSharePointFolder from './XomSharePointFolder';
/**
 * Instantiate the object with the necessary information to connect to a SharePoint site through its REST API.
 */
declare class XomSharePointSite {
    private _http;
    private _currUser;
    constructor(baseSiteUrl: string);
    get http(): XomApiClient;
    get baseUrl(): string | undefined;
    /**
     * Gets the SharePoint site metadata.
     */
    getInfo(): Promise<XomApiResponse>;
    /**
     * Queries the SharePoint API to get user information. Inform nothing to get
     * current user information or pass an specific user ID.
     */
    getUserInfo(id?: number): Promise<XomApiResponse>;
    /**
     * Queries SharePoint API searching for user name.
     */
    searchUser(search: string): Promise<XomApiResponse>;
    /**
     * Returns a reference to connect to a SharePoint list.
     */
    getList(listTitle: string): XomSharePointList;
    /**
     * Creates a new SharePoint list.
     */
    createList(listTitle: string): Promise<XomApiResponse>;
    /**
     * Deletes an existing SharePoint list.
     */
    deleteList(listTitle: string): Promise<XomApiResponse>;
    /**
     * Returns a reference to connect to a SharePoint survey.
     */
    getSurvey(surveyTitle: string): XomSharePointSurvey;
    /**
     * Returns a reference to connect to a SharePoint file library.
     */
    getFolder(folderAddress: string): XomSharePointFolder;
}
export default XomSharePointSite;
