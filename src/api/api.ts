import type { IBonusInfo, ResultOperation } from '../models'
import { http, httpAuth } from './instance'

const CLIENT_ID = import.meta.env['VITE_CLIENT_ID']
const DEVICE_ID = import.meta.env['VITE_DEVICE_ID']

const ACCESS_TOKEN_ROUTE = 'api/v3/clients/accesstoken/'
const BONUS_INFO_ROUTE = 'api/v3/ibonus/generalinfo/'

type AuthenticateResponse = {
  accessToken: string | null
  result: ResultOperation
}

export const authenticate = async () => {
  const body = {
    idClient: CLIENT_ID,
    accessToken: '',
    paramName: 'device',
    paramValue: DEVICE_ID,
    latitude: 0,
    longitude: 0,
    sourceQuery: 0
  }

  const response = await http.post<AuthenticateResponse>(ACCESS_TOKEN_ROUTE, body)
  const { accessToken, result } = response.data

  if (result.status !== 0) {
    throw new Error(result.message!)
  }

  if (!accessToken) {
    throw new Error(`The server didn't provide Access Token`)
  }

  return accessToken
}

type GetBonusInfoResponse = {
  data: IBonusInfo
  resultOperation: ResultOperation
}

export const getBonusInfo = async () => {
  const response = await httpAuth.get<GetBonusInfoResponse>(BONUS_INFO_ROUTE)
  const { data, resultOperation } = response.data

  if (resultOperation.status !== 0) {
    throw new Error(resultOperation.message!)
  }

  return data
}
