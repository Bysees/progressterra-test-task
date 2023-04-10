export interface IBonusInfo {
  typeBonusName: string | null
  currentQuantity: number
  forBurningQuantity: number
  dateBurning: string
}

export interface ResultOperation {
  status: number
  message: string | null
  messageDev: string | null
  codeResult: number
  duration: number
  idLog: string
}
