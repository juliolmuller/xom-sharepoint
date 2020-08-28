import { XomApiClient, XomApiRequestConfig, XomApiInterceptor } from '../../../@types'

function addRequestDigest(httpInstance: XomApiClient): XomApiInterceptor<XomApiRequestConfig> {
  return [
    async (config: XomApiRequestConfig) => {
      const method = config.method as string
      const { digest } = config

      if (digest !== false && method.match(/post/i)) {
        config.headers = {
          ...config.headers,
          'X-RequestDigest': await httpInstance.defaults.requestDigest,
        }
      }

      return config
    },
  ]
}

export default addRequestDigest
