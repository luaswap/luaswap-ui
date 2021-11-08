import { useLuaVestingContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useState, useEffect, useCallback } from 'react'
import useWeb3 from 'hooks/useWeb3'
import { useWeb3React } from '@web3-react/core'

export interface UserVestingInfoType {
  amount: string
  claimAtsTime: string
  claimedAmount: string
}

export interface VestingInfo {
  userVestingInfo: UserVestingInfoType
}

const DEFAULT_USERINFO = {
  amount: '0',
  claimAtsTime: null,
  claimedAmount: '0',
}

const formatVestingUserInfo = (userInfo: UserVestingInfoType = DEFAULT_USERINFO) => {
  return {
    amount: userInfo.amount,
    claimAtsTime: userInfo.claimAtsTime,
    claimedAmount: userInfo.claimedAmount,
  }
}

const useVestingInfo = (
  vestingAddress: string,
): {
  vestingData: VestingInfo
  estimateClaim: (time: any) => Promise<any>
  refetchDataFromContract: () => any
  isLoadingVestingInfo: boolean
} => {
  const { account } = useWeb3React()
  // Force the hook to refetch
  const [refetching, setRefetching] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    userVestingInfo: DEFAULT_USERINFO,
  })
  const web3 = useWeb3()
  const vestingContract = useLuaVestingContract(vestingAddress)

  const refetchDataFromContract = useCallback(() => {
    setRefetching(refetching + 1)
  }, [refetching])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userVestingInfo = await vestingContract.methods.info(account).call()
        const formatedVestingInfo = formatVestingUserInfo(userVestingInfo)
        setData({
          userVestingInfo: formatedVestingInfo,
        })
        setIsLoading(false)
      } catch (error) {
        console.log(error, 'fail to fetch vesting info')
      }
    }

    if (vestingAddress && vestingContract && account) {
      fetchData()
    }
  }, [vestingContract, web3, account, refetching])

  const estimateClaim = useCallback(
    async (time) => {
      try {
        if (vestingContract) {
          const estimatedClaim = await vestingContract.methods.estimateClaim(account, time).call()
          return estimatedClaim
        }
        return () => {}
      } catch (error) {
        console.log(error, 'fail to fetch estimate claim')
        return () => {}
      }
    },
    [vestingContract, account],
  )

  return {
    vestingData: data,
    estimateClaim,
    refetchDataFromContract,
    isLoadingVestingInfo: isLoading,
  }
}

export default useVestingInfo
