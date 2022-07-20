import 'reflect-metadata'
import express from 'express'
import prettyjson from 'prettyjson'
import { getRouteInfo, InversifyExpressServer, } from 'inversify-express-utils'

import { container, TYPES, } from './ioc'
import { IAppConfig } from './types'
// import { IAppConfig, } from './types'

// const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

const server = new InversifyExpressServer(container)
server.setConfig(app => {
  app.use(express.json())
})

server.setErrorConfig(app => {
  app.use((err, _req, res, _next) => {
    const error = {
      status: err.status || 500,
      message: err.message || 'Unknown error',
    }

    res.status(err.status || 500).json(error)
  })
})

const app = server.build()

const routeInfo = getRouteInfo(container)
const appConfig = container.get<IAppConfig>(TYPES.AppConfig)

app.listen(appConfig.Port, () => {
  console.log(`App listening in port ${appConfig.Port}`)

  if (appConfig.PrintRoutes) {
    console.log(prettyjson.render({ routes: routeInfo, }))
  }
})