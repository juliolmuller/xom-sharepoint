import axios from 'axios'

import type { AxiosTransformer } from 'axios'

const defaultTransformers = axios.defaults.transformRequest as AxiosTransformer[]

const requestTransformers: AxiosTransformer[] = [
  ...defaultTransformers,
]

export default requestTransformers
