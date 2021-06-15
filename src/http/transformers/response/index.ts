import axios from 'axios'
import parseDates from './parseDate'
import exposeDeepData from './exposeDeepData'

import type { AxiosTransformer } from 'axios'

const defaultTransformers = axios.defaults.transformResponse as AxiosTransformer[]

const responseTransformers: AxiosTransformer[] = [
  ...defaultTransformers,
  exposeDeepData,
  parseDates,
]

export default responseTransformers
