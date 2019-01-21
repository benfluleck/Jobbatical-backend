import { Router } from 'express'
import { getActiveUsers } from '../controllers/activeUsers'

export const indexRouter = Router()

indexRouter.get('/topActiveUsers', getActiveUsers)

indexRouter.get('/users')
