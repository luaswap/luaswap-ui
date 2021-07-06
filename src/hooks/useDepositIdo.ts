import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { depositIdo } from 'utils/callHelpers'

const useDepositIdo = (contractAddress: string, idoIndex: number) => {
  const { account } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(contractAddress)
  const handleDeposit = useCallback(
    async (amount: string) => {
      const txHash = await depositIdo(luaIdoContract, account, amount, idoIndex)
      console.info(txHash)
    },
    [account, luaIdoContract, idoIndex],
  )

  return { onDeposit: handleDeposit }
}

export default useDepositIdo
