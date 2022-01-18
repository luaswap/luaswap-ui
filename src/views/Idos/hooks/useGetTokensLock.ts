import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { getTokensLock } from 'state/stake'

const useGetTokensLock = () => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()

  const handleGetTokensLock = useCallback(async () => {
    await dispatch(getTokensLock(account, chainId))
  }, [account, chainId, dispatch])

  return { onGetTokensLock: handleGetTokensLock }
}

export default useGetTokensLock
