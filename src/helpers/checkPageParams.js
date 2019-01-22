import { isNumber } from './checkNumber'

export const checkPageParams = (req, res) => {
  const { query } = req

  try {
    if (query.hasOwnProperty('page')) {
      isNumber(query.page)
    }
    const { limit, page: pageNumber } = query

    const pageLimit = limit || null

    if (pageNumber && !pageLimit) {
      throw Error('Please Enter a default page limit')
    }

    return {
      pageLimit,
      pageNumber,
    }
  } catch (error) {
    throw error
  }
}
