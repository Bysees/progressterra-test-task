import express from 'express'
import cors from 'cors'
import path from 'path'
import { authController, serviceController } from './controllers.js'
import { __dirname } from './utils.js'

const app = express()
const PORT = 3010
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

if(isProduction) {
  const distPath = path.join(__dirname, '..', 'client', 'dist')

  try {
    app.use(express.static(distPath))
  } catch {
    throw Error('You should build the project before start')
  }
}

if(isDevelopment) {
  app.use(cors())
}

app.use(express.json())
app.use('/', authController)
app.use('/', serviceController)


app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}!`))