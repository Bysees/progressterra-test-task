import { FC, useEffect, useState } from 'react'
import { getBonusInfo } from './api'
import { IBonusInfo } from './models'
import { formatDate } from './utils/formatDate'
import { ReactComponent as FireIcon } from './assets/icons/fire.svg'
import { ReactComponent as ArrowIcon } from './assets/icons/btn_arrow.svg'
import s from './App.module.scss'

const BonusInfo = () => {
  const [info, setInfo] = useState({} as IBonusInfo)
  const [fetchStatus, setFetchStatus] = useState<'init' | 'loading' | 'success'>('init')

  useEffect(() => {
    ;(async () => {
      setFetchStatus('loading')
      const data = await getBonusInfo()
      setFetchStatus('success')
      setInfo(data)
    })()
  }, [])

  const { currentQuantity, dateBurning, forBurningQuantity } = info

  return (
    <div className={s['bonus-wrapper']}>
      {fetchStatus === 'loading' && <div>Loading...</div>}
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
