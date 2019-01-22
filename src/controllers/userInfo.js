import pool from '../config/pool'
import queries from './queries/queries'
import { isNumber } from '../helpers/checkNumber'

/**
 * Route: GET: /api/v1/users/:id
 *
 * @description Get User Info
 * @param {object} req request object
 * @param {Object} res response object
 * @returns {void|object} response object
 */
export const getUserInfo = (req, res) => {
  const {
    params: { id },
  } = req

  try {
    isNumber(id)

    pool.query(queries.getUserInfo, [id], (error, response) => {
      if (error) { return res.status(500).send({ status: 'error', message: error.message }) }

      if (!response.rows.length) {
        return res.status(404).send({
          status: 'error',
          message: 'This user does not exist',
        })
      }

      const data = response.rows

      const userInfo = {}

      for (let i = 0; i < data.length; i++) {
        const company = {
          id: data[i].company_id,
          createdAt: data[i].companies_created_at,
          name: data[i].company_name,
          isContact: data[i].iscontact,
        }
        const listing = {
          id: data[i].listing_id,
          createdAt: data[i].created_at,
          name: data[i].listing_name,
          description: data[i].listing_description,
        }
        const application = {
          id: data[i].application_id,
          createdAt: data[i].app_created_at,
          listing: {
            id: data[i].applistings_id,
            name: data[i].applistnames,
            description: data[i].applistdescription,
          },
          coverLetter: data[i].cover_letter,
        }
        const user = {
          id: data[i].user_id,
          name: data[i].user_name,
          companies: new Set(),
          createdListings: new Set(),
          applications: new Set(),
        }
        if (!userInfo[data[i].user_id]) {
          userInfo[data[i].user_id] = user
        }
        userInfo[data[i].user_id].companies.add(company)
        userInfo[data[i].user_id].applications.add(application)
        userInfo[data[i].user_id].createdListings.add(listing)
      }

      let currentUser = userInfo[id]
      currentUser = {
        ...currentUser,
        companies: [...currentUser.companies],
        applications: [...currentUser.applications],
        createdListings: [...currentUser.createdListings],
      }

      res
        .status(200)
        .send({
          status: 'success',
          message: 'User Info Returned',
          response: currentUser,
        })
    })
  } catch (error) {
    return res
      .status(400)
      .send({ status: 'error', errorMessage: error.message })
  }
}
