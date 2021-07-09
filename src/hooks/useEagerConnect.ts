import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, ConnectorNames } from '@pancakeswap/uikit'
import { injected } from 'utils/web3React'
import useAuth from 'hooks/useAuth'

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    // if (connectorId) {
    //   login(connectorId)
    // }
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && connectorId) {
        login(connectorId)
      }
    })
  }, [login])
}

export const useInactiveListener = () => {
  const { active, error, activate } = useWeb3React() // specifically using useWeb3React because of what this hook does
  const { login } = useAuth()
  const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = () => {
        // eat errors
        login(connectorId)
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          login(connectorId)
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, activate, login, connectorId])
}

export default useEagerConnect
