import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaVestingContract } from 'hooks/useContract'
import { claimVesting } from 'utils/callHelpers'

const useClaimVesting = (contractAddress: string) => {
  const { account } = useWeb3React()
  const vestingContract = useLuaVestingContract(contractAddress)
  const handleClaimVesting = useCallback(async () => {
    const txHash = await claimVesting(vestingContract, account)
  }, [account, vestingContract])

  return { onClaimVesting: handleClaimVesting }
}

export default useClaimVesting
