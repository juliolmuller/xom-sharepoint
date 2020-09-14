import { XomApiClient } from '../@types';
/**
 * Register the interceptors in the XomApiClient instance.
 */
declare function registerInterceptor(http: XomApiClient, at: 'request' | 'response'): (events: any) => void;
export default registerInterceptor;
