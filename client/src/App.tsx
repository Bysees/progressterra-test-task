import { useLayoutEffect, useState } from 'react'
import { BonusInfo } from './BonusInfo'
import { authenticate } from './api'
import { ReactComponent as ArrowIcon } from './assets/icons/info.svg'
import s from './App.module.scss'

const App = () => {
  const [fetchStatus, setFetchStatus] = useState<'init' | 'loading' | 'success'>('init')

  useLayoutEffect(() => {
    (async () => {
      setFetchStatus('loading')
      await authenticate()
      setFetchStatus('success')
    }
    )()
  }, [])

  return (
    <div>
      <header className={s.header}>
        <div className={s.container}>
          <div className={s['header-wrapper']}>
            <div className={s.logo}>ЛОГОТИП</div>
            <div className={s.info}><ArrowIcon /></div>
          </div>
        </div>
      </header>
      <main className={s.main}>
        <div className={s.container}>
          {fetchStatus === 'loading' && <div>Loading...</div>}
          {fetchStatus === 'success' && <BonusInfo />}
        </div>
      </main>
    </div>
  )
}

export { App }