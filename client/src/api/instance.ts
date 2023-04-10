import axios, { CreateAxiosDefaults } from 'axios'

const PROXY_URL = import.meta.env['VITE_PROXY_URL']
const ACCESS_KEY = import.meta.env['VITE_ACCESS_KEY']

const axiosConfig: CreateAxiosDefaults = {
  baseURL: PROXY_URL,
  headers: {
    AccessKey: ACCESS_KEY,
    'Content-type': 'application/json'
  }
}

export const http = axios.create(axiosConfig)
export const httpAuth = axios.create(axiosConfig)

httpAuth.interceptors.request.use((config) => {
  const ACCESS_TOKEN = localStorage.getItem('token')

  if (!ACCESS_TOKEN) {
    const controller = new AbortController()
    config.signal = controller.signal
    controller.abort(`Should provide Access Token`)
  }

  config.url = `${config.url}${ACCESS_TOKEN}`

  return config
})
