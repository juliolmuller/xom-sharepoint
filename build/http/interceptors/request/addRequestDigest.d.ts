import { XomApiClient, XomApiRequestConfig, XomApiInterceptor } from '../../../@types';
declare function addRequestDigest(httpInstance: XomApiClient): XomApiInterceptor<XomApiRequestConfig>;
export default addRequestDigest;
