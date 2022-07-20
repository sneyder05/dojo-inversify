import path from 'path'

import dotenv from 'dotenv'

import { provideSingleton, TYPES, } from '../ioc'
import { IAppConfig, } from '../types'

const deployEnv = process.env.DEPLOY_ENV ?? 'local'

dotenv.config({ path: path.resolve(__dirname, '../', 'env', `${deployEnv}.env`), })

@provideSingleton(TYPES.AppConfig)
export default class AppConfig implements IAppConfig {
  public readonly Port = parseInt(process.env.PORT ?? '3000')
  public readonly PrintRoutes = process.env.PRINT_ROUTES === 'true'
}