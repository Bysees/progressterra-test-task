import { useContext } from 'react'
import { BonusInfo } from './BonusInfo'
import { ReactComponent as ArrowIcon } from './assets/icons/info.svg'
import s from './App.module.scss'
import { AuthContext } from './AuthProvider'

const App = () => {
  const isAuth = useContext(AuthContext)

  return (
    <div>
      <header className={s.header}>
        <div className={s.container}>
          <div className={s['header-wrapper']}>
            <div className={s.logo}>ЛОГОТИП</div>
            <div className={s.info}>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </header>
      <main className={s.main}>
        <div className={s.container}>{isAuth && <BonusInfo />}</div>
      </main>
    </div>
  )
}

export { App }
