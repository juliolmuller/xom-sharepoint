import { XomApiClient, XomApiResponse, XomApiQueryString } from './@types';
/**
 * Instantiate the object with the necessary information to connect to a SharePoint survey through its REST API.
 */
declare class XomSharePointSurvey {
    private _title;
    private _http;
    private _itemsType;
    constructor(surveyTitle: string, httpInstance: XomApiClient);
    get title(): string;
    /**
     * Gets fields that corresponds to the questions and their choices.
     */
    getQuestions(): Promise<any>;
    /**
     * Returns a list of the responses stored in the survey list.
     */
    getResponses(params?: XomApiQueryString): Promise<XomApiResponse>;
    /**
     * Returns a single response by its ID.
     */
    findResponse(id: number, params?: XomApiQueryString): Promise<XomApiResponse>;
    /**
     * Saves a new response in the SharePoint survey list.
     */
    submitResponse(data: any): Promise<XomApiResponse>;
    /**
     * Updates an existing response.
     */
    changeResponse(id: number, data: any): Promise<XomApiResponse>;
    /**
     * Deletes an existing response.
     */
    delete(id: number): Promise<XomApiResponse>;
}
export default XomSharePointSurvey;
