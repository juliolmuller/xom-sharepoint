import { AxiosTransformer } from 'axios'

function exposeDeepData(data: any): AxiosTransformer {
  if (data?.d) {
    const { d } = data

    /* eslint-disable-next-line no-param-reassign */
    data = d.results || d

    Object.defineProperty(data, '__next', {
      value: d.__next || null,
      writable: true,
    })
  }

  return data
}

export default exposeDeepData
