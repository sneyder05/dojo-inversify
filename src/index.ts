import express from 'express'

import appRoutes from './routes'

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

// attachControllers(app, [ GetUserByIdController, ])
app.use(appRoutes)

// app.get('/users/:id', (_, res) => {
//   res.status(200).json({ done: 1, })
// })

app.listen(port, () => console.log(`App listening in port ${port}`))