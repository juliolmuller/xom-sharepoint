import { ParsedUrlQueryInput } from 'querystring'
import * as Axios from 'axios'

export type XomApiInterceptorFulfilled<T> = (value: T) => T | Promise<T>

export type XomApiInterceptorRejected = (error: any) => any

export type XomApiInterceptor<T> = [XomApiInterceptorFulfilled<T>, XomApiInterceptorRejected?]

export type XomApiInterceptorTuple<T> =
  ((SharePointApi) => XomApiInterceptor<T>)
  | XomApiInterceptor<T>

export interface XomApiQueryParams extends ParsedUrlQueryInput {
  $skiptoken?: string
  $select?: string
  $orderby?: string
  $top?: string
  $skip?: string
  $filter?: string
  $expand?: string
}

export type XomApiQueryString = XomApiQueryParams | string

export interface XomApiRequestConfig extends Axios.AxiosRequestConfig {
  interceptors?: {
    request: Axios.InterceptorManager<XomApiRequestConfig>
    response: Axios.InterceptorManager<AxiosResponse>
  }
  requestDigest?: Promise<string>
  digest?: boolean
}

export type XomApiResponse = {
  __response: Axios.AxiosResponse
  [key: string]: any
}

export interface XomApiClient extends Axios.AxiosInstance {
  defaults: XomApiRequestConfig
  get<T = any, R = AxiosResponse<T>>(url: string, config?: XomApiRequestConfig): Promise<R>
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: XomApiRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: XomApiRequestConfig): Promise<R>
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: XomApiRequestConfig): Promise<R>;
}
