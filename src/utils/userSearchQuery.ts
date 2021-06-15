import type { XomApiQueryParams } from '../types'

/**
 * Provide the query to find searched term with user properties
 */
function userSearchQuery(search: string): XomApiQueryParams {
  const title = `substringof('${search}',Title)`
  const email = `substringof('${search}',EMail)`
  const lastName = `substringof('${search}',LastName)`
  const firstName = `substringof('${search}',FirstName)`
  const account = `substringof('${search}',AccountName)`

  return { $filter: `${title} or ${email} or ${lastName} or ${firstName} or ${account}` }
}

export default userSearchQuery
