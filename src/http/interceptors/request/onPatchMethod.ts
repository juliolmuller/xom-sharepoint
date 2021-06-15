import patchHeaders from '../../config//patchHeaders'

import type { XomApiRequestConfig, XomApiInterceptor } from '../../../types'

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
