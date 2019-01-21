import config from './configEnv'

const { Pool } = require('pg')

const env = process.env.NODE_ENV || 'development'

const envVariables = config[env]

const connectionString = process.env.DATABASE_URL

let pool

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({ connectionString, ssl: true })
} else {
  pool = new Pool({
    ...envVariables,
  })
}

export default pool
