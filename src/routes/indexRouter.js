import { Router } from 'express'
import { getActiveUsers } from '../controllers/activeUsers'
import { getUserInfo } from '../controllers/userInfo'

export const indexRouter = Router()

indexRouter.get('/topActiveUsers', getActiveUsers)

indexRouter.get('/users/:id', getUserInfo)
