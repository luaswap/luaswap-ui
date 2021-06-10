import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Location } from 'history'
import queryString from 'query-string'
import { useWeb3React } from '@web3-react/core'

const NETWORK_MAP = {
  tomochain: 88,
  eth: 1,
}

const CHAIN_MAP = {
  88: 'tomochain',
  1: 'eth',
}

const useLocationParams = (location: Location = { pathname: '', search: '', state: '', hash: '', key: '' }) => {
  const [queryId, setQueryId] = useState(null)
  const [isSameNetwork, setIsSameNetwork] = useState(false)
  const { chainId } = useWeb3React()
  const history = useHistory()
  const { search } = location

  const updateLocation = useCallback(() => {
    const {
      location: { pathname },
    } = history
    const networkName = isSameNetwork ? CHAIN_MAP[chainId] : CHAIN_MAP[queryId]
    history.push({
      pathname,
      ...(networkName && { search: `?network=${networkName}` }),
    })
  }, [history, queryId, isSameNetwork, chainId])

  useEffect(() => {
    if (chainId === queryId) {
      setIsSameNetwork(true)
    }
  }, [chainId, queryId])

  useEffect(() => {
    console.log(search, 'does change ?')
    if (search) {
      const { network } = queryString.parse(search)
      const queryChainId = NETWORK_MAP[String(network).toLowerCase()]
      if (queryChainId) {
        setQueryId(queryChainId)
      } else {
        setQueryId(chainId)
      }
    } else {
      setQueryId(chainId)
    }
  }, [search, chainId])

  return [queryId, updateLocation]
}

export default useLocationParams
