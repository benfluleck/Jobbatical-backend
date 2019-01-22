import pool from '../config/pool'
import queries from './queries/queries'
import { checkPageParams } from '../helpers/checkPageParams'

/**
 * Route: GET: /api/v1/topActiveUsers
 *
 * @description Get top Active Users
 * @param {object} req request object
 * @param {Object} res response object
 * @returns {void|object} response object
 */
export const getActiveUsers = (req, res) => {
  let activeUsers = {}

  try {
    const { pageLimit, pageNumber } = checkPageParams(req, res)

    const offset = (pageNumber - 1) * pageLimit || 0

    pool.query(
      queries.topActiveUsersQuery,
      [pageLimit, offset],
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .send({ status: 'error', message: error.message })
        }

        const data = response.rows

        if (!response.rows.length) {
          return res.status(200).send({
            status: 'success',
            message: 'No Active Users available on this Page',
          })
        }

        for (let i = 0; i < data.length; i++) {
          const listingName = data[i]['listing_name']
          const userId = data[i].user_id

          const userListing = {
            id: userId,
            createdAt: data[i].created_at,
            name: data[i].user_name,
            count: data[i].number_of_applications,
            listing: [listingName],
          }

          !activeUsers[userId]
            ? (activeUsers[userId] = userListing)
            : activeUsers[userId].listing.push(listingName)
        }

        return res.status(200).send({
          status: 'success',
          message: 'Users successfully Returned',
          data: Object.values(activeUsers),
        })
      }
    )
  } catch (error) {
    return res
      .status(400)
      .send({ status: 'error', errorMessage: error.message })
  }
}
