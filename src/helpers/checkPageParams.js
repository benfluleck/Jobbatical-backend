export const checkPageParams = (req, res) => {
  const { query } = req

  try {
    if (query.hasOwnProperty('page')) {
      if (!Number(query.page)) {
        throw Error('Please Enter a valid page Number')
      }
    }
    const { page: pageNumber } = query

    const limit = process.env.DEFAULT_LIMIT || null

    console.log(limit, '>>> limit')

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
