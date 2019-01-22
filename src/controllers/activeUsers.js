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
    const { limit, pageNumber } = checkPageParams(req, res)

    const offset = (pageNumber - 1) * limit || 0

    pool.query(
      queries.topActiveUsersQuery,
      [limit, offset],
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
            message: 'No Active Users available',
          })
        }

        for (let i = 0; i < data.length; i++) {
          const userListing = {
            id: data[i].user_id,
            createdAt: data[i].created_at,
            name: data[i].user_name,
            count: data[i].number_of_applications,
            listing: [],
          }

          const listingName = data[i]['listing_name']
          !activeUsers[data[i].user_id]
            ? (activeUsers[data[i].user_id] = userListing)
            : activeUsers[data[i].user_id].listing.push(listingName)
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
