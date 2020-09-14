import { AxiosResponse } from 'axios';
import { XomApiResponse } from '../@types';
/**
 * Taxes an AxiosResponse and rewrap it as a XomApiRawResponse object.
 */
declare function rewrapResponse(response: AxiosResponse): XomApiResponse;
export default rewrapResponse;
