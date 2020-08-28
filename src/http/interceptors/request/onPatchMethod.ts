import { XomApiRequestConfig, XomApiInterceptor } from '../../../@types'
import patchHeaders from '../../config//patchHeaders'

const onPatchMethod: XomApiInterceptor<XomApiRequestConfig> = [
  (config: XomApiRequestConfig): XomApiRequestConfig => {
    const method = config.method as string

    if (method.match(/patch/i)) {
      config.method = 'post'
      config.headers = {
        ...config.headers,
        ...patchHeaders,
      }
    }

    return config
  },
]

export default onPatchMethod
