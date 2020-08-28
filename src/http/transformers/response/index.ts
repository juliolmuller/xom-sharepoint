import axios, { AxiosTransformer } from 'axios'
import exposeDeepData from './exposeDeepData'
import parseDates from './parseDate'

const defaultTransformers = axios.defaults.transformResponse as AxiosTransformer[]

const responseTransformers: AxiosTransformer[] = [
  ...defaultTransformers,
  exposeDeepData,
  parseDates,
]

export default responseTransformers
