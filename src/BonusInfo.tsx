import { useEffect, useState } from 'react'
import { getBonusInfo } from './api'
import type { IBonusInfo } from './models'
import { formatDate } from './utils/formatDate'
import { ReactComponent as FireIcon } from './assets/icons/fire.svg'
import { ReactComponent as ArrowIcon } from './assets/icons/btn_arrow.svg'
import s from './App.module.scss'

const BonusInfo = () => {
  const [info, setInfo] = useState({} as IBonusInfo)
  const [fetchStatus, setFetchStatus] = useState<'init' | 'loading' | 'error' | 'success'>('init')

  useEffect(() => {
    ;(async () => {
      try {
        setFetchStatus('loading')
        const responseInfo = await getBonusInfo()
        setInfo(responseInfo)
        setFetchStatus('success')
      } catch {
        setFetchStatus('error')
      }
    })()
  }, [])

  const { currentQuantity, dateBurning, forBurningQuantity } = info

  return (
    <div className={s['bonus-wrapper']}>
      {fetchStatus === 'loading' && <div>Загрузка...</div>}
      {fetchStatus === 'error' && <div>В данный момент сервис не доступен...</div>}
      {fetchStatus === 'success' && (
        <>
          <h2 className={s.title}>{currentQuantity} бонусов</h2>
          <div className={s.tip}>
            <time dateTime={dateBurning}>{formatDate(dateBurning)} </time>
            сгорит <FireIcon className={s.fireIcon} /> {forBurningQuantity} бонусов
          </div>
          <div className={s['btn-wrapper']}>
            <button>
              <ArrowIcon />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export { BonusInfo }
