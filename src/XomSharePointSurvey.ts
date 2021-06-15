import { XomApiClient, XomApiResponse, XomApiQueryString } from './types'
import * as requests from './facades/requests'

/**
 * Instantiate the object with the necessary information to connect to a SharePoint survey through its REST API.
 */
class XomSharePointSurvey {

  private _title: string

  private _http: XomApiClient

  private _itemsType: Promise<string>

  constructor(surveyTitle: string, httpInstance: XomApiClient) {
    this._title = surveyTitle
    this._http = httpInstance
    this._itemsType = requests.getListItemType(this._http, this._title)
  }

  public get title(): string {
    return this._title
  }

  /**
   * Gets fields that corresponds to the questions and their choices.
   */
  public async getQuestions(): Promise<any> {
    const response = await requests.getListFields(this._http, this._title, { $filter: '(CanBeDeleted eq true)' })
    const questions = response.map((field: any) => ({
      Field: field.InternalName,
      Description: field.Description,
      Question: field.Title,
      Type: field.TypeDisplayName,
      Choices: field.Choices && field.Choices.results,
      DefaultValue: field.DefaultValue,
    }))

    Object.defineProperty(questions, '__response', {
      value: response.__response,
    })

    return questions
  }

  /**
   * Returns a list of the responses stored in the survey list.
   */
  public getResponses(params?: XomApiQueryString): Promise<XomApiResponse> {
    return requests.getListItems(this._http, this._title, params)
  }

  /**
   * Returns a single response by its ID.
   */
  public findResponse(id: number, params?: XomApiQueryString): Promise<XomApiResponse> {
    return requests.getListItemById(this._http, this._title, id, params)
  }

  /**
   * Saves a new response in the SharePoint survey list.
   */
  public async submitResponse(data: any): Promise<XomApiResponse> {
    return requests.postListItem(this._http, this._title, await this._itemsType, data)
  }

  /**
   * Updates an existing response.
   */
  public async changeResponse(id: number, data: any): Promise<XomApiResponse> {
    return requests.patchListItem(this._http, this._title, id, await this._itemsType, data)
  }

  /**
   * Deletes an existing response.
   */
  public delete(id: number): Promise<XomApiResponse> {
    return requests.deleteListItem(this._http, this._title, id)
  }
}

export default XomSharePointSurvey
