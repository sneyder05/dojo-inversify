import 'reflect-metadata'
import express from 'express'
import prettyjson from 'prettyjson'
import { getRouteInfo, InversifyExpressServer, } from 'inversify-express-utils'

import { container, } from './ioc'

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

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

app.listen(port, () => {
  console.log(`App listening in port ${port}`)

  console.log(prettyjson.render({ routes: routeInfo, }))
})