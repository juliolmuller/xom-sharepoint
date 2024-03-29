import addRequestDigest from './addRequestDigest'
import onDeleteMethod from './onDeleteMethod'
import onPatchMethod from './onPatchMethod'

import type { XomApiRequestConfig, XomApiInterceptorTuple } from '../../../types'

const requestInterceptors: XomApiInterceptorTuple<XomApiRequestConfig>[] = [
  addRequestDigest,
  onDeleteMethod,
  onPatchMethod,
]

export default requestInterceptors
