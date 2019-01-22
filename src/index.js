import dotenv from 'dotenv'
import app from './server'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV || 'development'

const port = process.env.PORT || 3000

app.listen(port, () => {
  return console.log(
    `Welcome to the hold the door application, listening on ${port}`
  )
})
