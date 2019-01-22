import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../index'

chai.use(chaiHttp)

describe('Miscellaneous Routes', () => {
  it('should return 404 roor for Routes not Found', done => {
    chai
      .request(app)
      .get('/api/v1/somethingelse')
      .then(res => {
        expect(res.status).to.equal(404)
        expect(res.body.error.message).to.equal('Route Not Found')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should return welcome message when navigating to the index route', done => {
    chai
      .request(app)
      .get('/')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.text).to.equal(
          `<h1>Welcome To Hold the Door App</h1>\n    <p>For any more info please visit <a href='https://github.com/benfluleck/hold-the-door'>my Github page</a></P>\n    <h4>Thanks  &#x1F600;</h4>`
        )
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
