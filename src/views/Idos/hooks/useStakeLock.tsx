import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoLockContract } from 'hooks/useContract'
import { stakeLock, unStakeLock } from 'utils/callHelpers'
import { ZERO_ADDRESS } from 'config/constants/idos'

const useStakeLock = (contractAddress: string, payTokenAddress: string) => {
  const { account } = useWeb3React()
  const luaIdoLockContract = useLuaIdoLockContract(contractAddress)
  const isNativeToken = payTokenAddress === ZERO_ADDRESS

  const handleStakeLock = useCallback(
    async (amount: string) => {
      const txHash = await stakeLock(luaIdoLockContract, account, amount, isNativeToken, payTokenAddress)
      console.info(txHash)
    },
    [account, luaIdoLockContract, isNativeToken, payTokenAddress],
  )

  const handleUnStakeLock = useCallback(
    async (index: number, amount: string) => {
      const txHash = await unStakeLock(luaIdoLockContract, account, amount, index)
      console.info(txHash)
    },
    [account, luaIdoLockContract],
  )

  return { onStakeLock: handleStakeLock, onUnStakeLock: handleUnStakeLock }
}

export default useStakeLock
