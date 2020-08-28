import { XomApiRequestConfig, XomApiInterceptor } from '../../../@types'
import deleteHeaders from '../../config/deleteHeaders'

const onDeleteMethod: XomApiInterceptor<XomApiRequestConfig> = [
  (config: XomApiRequestConfig): XomApiRequestConfig => {
    const method = config.method as string

    if (method.match(/delete/i)) {
      config.method = 'post'
      config.headers = {
        ...config.headers,
        ...deleteHeaders,
      }
    }

    return config
  },
]

export default onDeleteMethod
