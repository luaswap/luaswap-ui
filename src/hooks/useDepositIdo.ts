import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { depositIdo } from 'utils/callHelpers'
import { ZERO_ADDRESS } from 'config/constants/idos'

const useDepositIdo = (contractAddress: string, idoIndex: number, payTokenAddress: string) => {
  const { account } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(contractAddress)
  const isNativeToken = payTokenAddress === ZERO_ADDRESS

  const handleDeposit = useCallback(
    async (amount: string) => {
      const txHash = await depositIdo(luaIdoContract, account, amount, idoIndex, isNativeToken)
      console.info(txHash)
    },
    [account, luaIdoContract, idoIndex, isNativeToken],
  )

  return { onDeposit: handleDeposit }
}

export default useDepositIdo
