import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

import { getxLuaAddress } from 'utils/addressHelpers'
import { useXluaContract } from 'hooks/useContract'
import { leave } from 'utils/callHelpers'

const useLeave = () => {
  const { chainId, account } = useWeb3React()
  const xLuaAdress = getxLuaAddress(chainId)
  const xLuaContract = useXluaContract(xLuaAdress)

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(xLuaContract, amount, account, chainId)
      console.log(txHash)
    },
    [account, xLuaContract, chainId],
  )

  return { onLeave: handle }
}

export default useLeave
