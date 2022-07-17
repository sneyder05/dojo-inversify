import express from 'express'
import { attachControllers, } from '@decorators/express'

import GetUserByIdController from './controller/getById'

const router = express.Router()

attachControllers(router, [
  GetUserByIdController,
])

export default router