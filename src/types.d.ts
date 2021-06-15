import type { ParsedUrlQueryInput } from 'querystring'
import type * as Axios from 'axios'

export declare type XomApiInterceptorFulfilled<T> = (value: T) => T | Promise<T>

export declare type XomApiInterceptorRejected = (error: any) => any

export declare type XomApiInterceptor<T> = [XomApiInterceptorFulfilled<T>, XomApiInterceptorRejected?]

export declare type XomApiInterceptorTuple<T> = ((SharePointApi) => XomApiInterceptor<T>) | XomApiInterceptor<T>

export declare type XomApiQueryParams = ParsedUrlQueryInput & {
  $skiptoken?: string
  $orderby?: string
  $select?: string
  $filter?: string
  $expand?: string
  $skip?: string
  $top?: string
}

export declare type XomApiQueryString = XomApiQueryParams | string

export declare type XomApiRequestConfig = Axios.AxiosRequestConfig & {
  interceptors?: {
    request: Axios.InterceptorManager<XomApiRequestConfig>
    response: Axios.InterceptorManager<AxiosResponse>
  }
  requestDigest?: Promise<string>
  digest?: boolean
}

export declare type XomApiResponse = {
  __response: Axios.AxiosResponse
  [key: string]: any
}

export declare type XomApiClient = Axios.AxiosInstance & {
  defaults: XomApiRequestConfig
  get<T = any, R = AxiosResponse<T>>(url: string, config?: XomApiRequestConfig): Promise<R>
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: XomApiRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: XomApiRequestConfig): Promise<R>
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: XomApiRequestConfig): Promise<R>;
}
