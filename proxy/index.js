import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { authController, serviceController } from './controllers.js'
import { __dirname } from './utils.js'

dotenv.config()
const app = express()
const PORT = process.env.VITE_PROXY_PORT
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

if (isProduction) {
  const distPath = path.join(__dirname, '..', 'dist')

  try {
    app.use(express.static(distPath))
  } catch {
    throw Error('You should build the project before start')
  }
}

if (isDevelopment) {
  app.use(cors())
}

app.use(express.json())
app.use('/', authController)
app.use('/', serviceController)

app.listen(PORT, () => {
  if (isProduction) {
    console.log(`Proxy server start in production mode on port ${PORT}!`)
  } else {
    console.log(`Proxy server start in development mode on port ${PORT}!`)
  }
})
