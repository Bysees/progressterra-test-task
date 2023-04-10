import fetch from 'node-fetch'
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
    body: JSON.stringify(req.body)
  }

  const response = await fetch(url, options)
  const result = await response.json()

  res.json(result)
}

export const serviceController = async (req, res, next) => {
  const url = `${API_URL}:${SERVICE_PORT}${req.url}`

  const headers = {
    AccessKey: req.headers['accesskey'],
    'Content-type': req.headers['content-type']
  }

  const options = {
    headers
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    options.method = req.method

    if (req.body) {
      options.body = JSON.stringify(req.body)
    }
  }

  const response = await fetch(url, options)
  const result = await response.json()

  res.json(result)
}
