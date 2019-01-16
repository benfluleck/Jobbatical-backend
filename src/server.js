import express from 'express'

const app = express()

app.all('*', (req, res) => {
  res.status(200).send('Welcome to the Root route')
})

export default app
