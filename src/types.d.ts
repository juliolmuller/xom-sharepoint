import type * as Axios from 'axios'

export declare type XomApiQueryParam =
  | '$skiptoken'
  | '$orderby'
  | '$select'
  | '$filter'
  | '$expand'
  | '$skip'
  | '$top'

export declare type XomApiQueryString = Range<XomApiQueryParam, string>

export declare type XomApiInterceptorFulfilled<T> = (value: T) => T | Promise<T>

export declare type XomApiInterceptorRejected = (error: any) => any

export declare type XomApiInterceptor<T> = [XomApiInterceptorFulfilled<T>, XomApiInterceptorRejected?]

export declare type XomApiInterceptorTuple<T> = ((SharePointApi) => XomApiInterceptor<T>) | XomApiInterceptor<T>

export declare type XomApiQueryString = XomApiQueryString | string

export declare interface XomApiRequestConfig extends Axios.AxiosRequestConfig {
  interceptors?: {
    request: Axios.AxiosInterceptorManager<XomApiRequestConfig>
    response: Axios.AxiosInterceptorManager<Axios.AxiosResponse>
  }
  requestDigest?: Promise<string>
  digest?: boolean
}

export declare interface XomApiResponse {
  __response: Axios.AxiosResponse
  [key: string]: any
}

export declare interface XomApiClient extends Axios.AxiosInstance {
  defaults: XomApiRequestConfig
  get<T = any, R = Axios.AxiosResponse<T>>(url: string, config?: XomApiRequestConfig): Promise<R>
  delete<T = any, R = Axios.AxiosResponse<T>>(url: string, config?: XomApiRequestConfig): Promise<R>
  post<T = any, R = Axios.AxiosResponse<T>>(url: string, data?: any, config?: XomApiRequestConfig): Promise<R>
  patch<T = any, R = Axios.AxiosResponse<T>>(url: string, data?: any, config?: XomApiRequestConfig): Promise<R>
}
