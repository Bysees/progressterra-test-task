import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
const app = express()

const API_URL = 'http://84.201.188.117'
const TOKEN_PORT = 5021
const SERVICE_PORT = 5003

const ACCESS_TOKEN_ROUTE = '/api/v3/clients/accesstoken'

app.use(express.json())
app.use(cors())

app.use('/', async (req, res, next) => {
  const isAuthUrl = req.url.includes(ACCESS_TOKEN_ROUTE)

  if (!isAuthUrl) {
    return next()
  }

  const url = `${API_URL}:${TOKEN_PORT}${req.url}`

  const headers = {
    'AccessKey': req.headers['accesskey'],
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
})

app.use('/', async (req, res) => {
  const url = `${API_URL}:${SERVICE_PORT}${req.url}`

  const headers = {
    'AccessKey': req.headers['accesskey'],
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
})

app.listen(3010, () => console.log('Proxy server listening on port 3010!'))