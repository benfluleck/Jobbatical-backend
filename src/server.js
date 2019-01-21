import express from 'express'
import { indexRouter } from './routes/indexRouter'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome To Hold the Door App</h1>
    <p>For any more info please visit <a href='https://github.com/benfluleck/hold-the-door'>my Github page</a></P>
    <h4>Thanks  &#x1F600;</h4>`)
})

app.use('/api/v1', indexRouter)

app.use((req, res, next) => {
  const error = new Error('Route Not Found')

  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
  next()
})

export default app
