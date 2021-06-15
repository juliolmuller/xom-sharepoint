import type { AxiosResponse } from 'axios'
import type { XomApiInterceptorTuple } from '../../../types'

const responseInterceptors: XomApiInterceptorTuple<AxiosResponse>[] = [
  // custom functions
]

export default responseInterceptors
