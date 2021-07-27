import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'
import { approve } from 'utils/callHelpers'
import { getxLuaAddress } from 'utils/addressHelpers'
import { useLuaContract, useXluaContract } from './useContract'

const useApproveStaking = () => {
  const { chainId, account } = useWeb3React()

  const xLuaAddress = getxLuaAddress(chainId)

  const luaContract = useLuaContract(chainId)
  const xLuaContract = useXluaContract(xLuaAddress)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(luaContract, xLuaContract, account, chainId)
      return tx
    } catch (e) {
      return false
    }
  }, [account, luaContract, xLuaContract, chainId])

  return { onApprove: handleApprove }
}

export default useApproveStaking
