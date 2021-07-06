import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { claimRewardIdo } from 'utils/callHelpers'

const useClaimRewardIdo = (contractAddress: string, idoIndex: number) => {
  const { account } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(contractAddress)

  const handleClaimReward = useCallback(
    async (amount: string) => {
      const txHash = await claimRewardIdo(luaIdoContract, account, amount, idoIndex)
    },
    [account, luaIdoContract, idoIndex],
  )

  return { onClaimReward: handleClaimReward }
}

export default useClaimRewardIdo
