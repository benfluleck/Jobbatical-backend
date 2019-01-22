import { isNumber } from './checkNumber'

export const checkPageParams = (req, res) => {
  const { query } = req

  try {
    if (query.hasOwnProperty('page')) {
      isNumber(query.page)
    }
    const { page: pageNumber } = query

    const limit = process.env.DEFAULT_LIMIT || null

    if (pageNumber && !limit) {
      throw Error('Please Enter a default page limit')
    }
    return {
      limit,
      pageNumber,
    }
  } catch (error) {
    throw error
  }
}
