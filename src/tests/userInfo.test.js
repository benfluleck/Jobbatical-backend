import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../index'

chai.use(chaiHttp)

describe('User Info Route', () => {
  it('should return an error if a number is not specified in the query', done => {
    chai
      .request(app)
      .get('/api/v1/users/ererer')
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
  it('should throw an error if a number is not specified in the query', done => {
    chai
      .request(app)
      .get('/api/v1/users/1')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.a('object')
        expect(res.body.message).to.equal('User Info Returned')
        expect(res.body.response.id).to.equal(1)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should throw an error if the user does not exist', done => {
    chai
      .request(app)
      .get('/api/v1/users/100000')
      .then(res => {
        expect(res.status).to.equal(404)
        expect(res.body).to.be.a('object')
        expect(res.body.message).to.equal('This user does not exist')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
