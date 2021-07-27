import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

import { enter } from '../utils/callHelpers'
import { getxLuaAddress } from '../utils/addressHelpers'
import { useXluaContract } from './useContract'

const useEnter = () => {
  const { chainId, account } = useWeb3React()
  const xLuaAddress = getxLuaAddress(chainId)

  const xLuaContract = useXluaContract(xLuaAddress)

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(xLuaContract, amount, account, chainId)
    },
    [account, xLuaContract, chainId],
  )

  return { onEnter: handle }
}

export default useEnter
