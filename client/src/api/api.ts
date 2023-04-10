import type { IBonusInfo, ResultOperation } from '../models'

const PROXY_URL = import.meta.env['VITE_PROXY_URL']
const ACCESS_KEY = import.meta.env['VITE_ACCESS_KEY']
const CLIENT_ID = import.meta.env['VITE_CLIENT_ID']
const DEVICE_ID = import.meta.env['VITE_DEVICE_ID']

const ACCESS_TOKEN_ROUTE = 'api/v3/clients/accesstoken/'
const BONUS_INFO_ROUTE = 'api/v3/ibonus/generalinfo/'

type AuthenticateResponse = {
  accessToken: string | null
  result: ResultOperation
}

export const authenticate = async () => {
  const url = `${PROXY_URL}${ACCESS_TOKEN_ROUTE}`

  const body = {
    idClient: CLIENT_ID,
    accessToken: '',
    paramName: 'device',
    paramValue: DEVICE_ID,
    latitude: 0,
    longitude: 0,
    sourceQuery: 0
  }

  const headers = {
    AccessKey: ACCESS_KEY,
    'Content-type': 'application/json'
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers
  })

  const { accessToken, result } = (await response.json()) as AuthenticateResponse

  if (result.status !== 0) {
    throw new Error(result.message!)
  }

  if (!accessToken) {
    return false
  }

  localStorage.setItem('token', accessToken)
  return true
}

type GetBonusInfoResponse = {
  data: IBonusInfo
  resultOperation: ResultOperation
}

export const getBonusInfo = async () => {
  const ACCESS_TOKEN = localStorage.getItem('token')

  const url = `${PROXY_URL}${BONUS_INFO_ROUTE}${ACCESS_TOKEN}`

  const headers = {
    AccessKey: ACCESS_KEY,
    'Content-type': 'application/json'
  }

  const response = await fetch(url, {
    method: 'GET',
    headers
  })

  const { data, resultOperation } = (await response.json()) as GetBonusInfoResponse
  
  if (resultOperation.status !== 0) {
    throw new Error(resultOperation.message!)
  }

  return data
}
