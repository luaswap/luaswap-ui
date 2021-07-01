import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { claimRewardIdo } from 'utils/callHelpers'

const useClaimRewardIdo = () => {
  const { account, chainId } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(chainId)

  const handleClaimReward = useCallback(
    async (amount: string) => {
      const txHash = await claimRewardIdo(luaIdoContract, account, amount)
    },
    [account, luaIdoContract],
  )

  return { onClaimReward: handleClaimReward }
}

export default useClaimRewardIdo
