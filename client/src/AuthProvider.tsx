import { FC, ReactNode, createContext, useLayoutEffect, useState } from 'react'
import { authenticate } from './api'

export const AuthContext = createContext<boolean>(false)

interface Props {
  children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)

  useLayoutEffect(() => {
    const doAuth = async () => {
      try {
        const authResult = await authenticate()
        setIsAuth(authResult)
      } catch {
        setIsAuth(false)
      }
    }

    doAuth()
  }, [])

  return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>
}

export { AuthProvider }
