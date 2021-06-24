import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { depositIdo } from 'utils/callHelpers'

const useDepositIdo = () => {
  const { account, chainId } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(chainId)

  const handleDeposit = useCallback(
    async (amount: string) => {
      const txHash = await depositIdo(luaIdoContract, account, amount)
      console.info(txHash)
    },
    [account, luaIdoContract],
  )

  return { onDeposit: handleDeposit }
}

export default useDepositIdo