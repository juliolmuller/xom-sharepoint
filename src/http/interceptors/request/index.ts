import { XomApiRequestConfig, XomApiInterceptorTuple } from '../../../@types'
import addRequestDigest from './addRequestDigest'
import onDeleteMethod from './onDeleteMethod'
import onPatchMethod from './onPatchMethod'

const requestInterceptors: XomApiInterceptorTuple<XomApiRequestConfig>[] = [
  addRequestDigest,
  onDeleteMethod,
  onPatchMethod,
]

export default requestInterceptors
