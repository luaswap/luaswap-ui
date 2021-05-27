import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId) {
      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding

      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
