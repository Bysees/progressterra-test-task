import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const API_URL = process.env.VITE_API_URL
const TOKEN_PORT = process.env.VITE_TOKEN_PORT
const SERVICE_PORT = process.env.VITE_SERVICE_PORT
const ACCESS_TOKEN_ROUTE = '/api/v3/clients/accesstoken'

export const authController = async (req, res, next) => {
  const isAuthUrl = req.url.includes(ACCESS_TOKEN_ROUTE)

  if (!isAuthUrl) {
    return next()
  }

  const url = `${API_URL}:${TOKEN_PORT}${req.url}`

  const headers = {
    AccessKey: req.headers['accesskey'],
    'Content-type': req.headers['content-type']
  }

  const options = {
    method: req.method,
    headers,
    data: req.body
  }

  const { data } = await axios(url, options)
  
  res.json(data)
}

export const serviceController = async (req, res) => {
  const url = `${API_URL}:${SERVICE_PORT}${req.url}`

  const headers = {
    AccessKey: req.headers['accesskey'],
    'Content-type': req.headers['content-type']
  }

  const options = {
    headers
  }

  const methods = ['POST', 'PUT', 'PATCH']

  if (methods.includes(req.method)) {
    options.method = req.method

    if (req.body) {
      options.data = req.body
    }
  }

  const { data } = await axios(url, options)

  res.json(data)
}
