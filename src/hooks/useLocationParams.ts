import { useState, useEffect } from 'react'
import { Location } from 'history'
import queryString from 'query-string'
import { useWeb3React } from '@web3-react/core'

const NETWORK_MAP = {
  'tomochain': 88,
  'eth': 1,
}

const useLocationParams = (location: Location = { pathname: '', search: '', state: '', hash: '', key: '' }) => {
  const [queryId, setQueryId] = useState(null)
  const { chainId } = useWeb3React()
  const { search } = location
  useEffect(() => {
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

  return queryId
}

export default useLocationParams
