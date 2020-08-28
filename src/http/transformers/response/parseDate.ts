import { AxiosTransformer } from 'axios'

function lookForDates(obj: Record<string, unknown>) {
  const SP_DATE_STR_LENGTH = 20

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string'
        && (obj[key] as string).length === SP_DATE_STR_LENGTH
        && Date.parse(obj[key] as string)
    ) {
      obj[key] = new Date(obj[key] as string)
    }
  })
}

function parseDates(data: any): AxiosTransformer {
  try {
    if (data instanceof Array) {
      data.forEach(lookForDates)
    } else {
      lookForDates(data)
    }
  } catch (e) { /* do nothing */ }

  return data
}

export default parseDates
