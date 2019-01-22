import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../index'

chai.use(chaiHttp)

describe('Active Users Route', () => {
  it('should return an error if a number is not specified in the query', done => {
    chai
      .request(app)
      .get('/api/v1/topActiveUsers')
      .query({ page: 'efefe' })
      .then(res => {
        expect(res.status).to.equal(400)
        expect(res.body).to.be.a('object')
        expect(res.body.errorMessage).to.equal(
          'Please Enter a valid page Number'
        )
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should return a successful message when getting active users', done => {
    chai
      .request(app)
      .get('/api/v1/topActiveUsers')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.a('object')
        expect(res.body.message).to.equal('Users successfully Returned')
        expect(res.body.data).to.be.a('array')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should return an error if default limit is not specified', done => {
    chai
      .request(app)
      .get('/api/v1/topActiveUsers')
      .query({ page: 1 })
      .then(res => {
        expect(res.status).to.equal(400)
        expect(res.body).to.be.a('object')
        expect(res.body.errorMessage).to.equal(
          'Please Enter a default page limit'
        )
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should return a message if a page out of range is specified', done => {
    chai
      .request(app)
      .get('/api/v1/topActiveUsers')
      .query({ page: 10000, limit: 1 })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.a('object')
        expect(res.body.message).to.equal(
          'No Active Users available on this Page'
        )
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
