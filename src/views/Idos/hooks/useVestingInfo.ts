import { useLuaVestingContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useState, useEffect } from 'react'
import useWeb3 from 'hooks/useWeb3'
import { useWeb3React } from '@web3-react/core'

export interface UserVestingInfoType {
  amount: string
  claimAtsTime: string
  claimedAmount: string
}

const DEFAULT_USERINFO = {
  amount: null,
  claimAtsTime: null,
  claimedAmount: null,
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
  claimAt: any[]
  claimPercentage: any[]
  userVestingInfo: UserVestingInfoType
} => {
  const { account } = useWeb3React()
  const [data, setData] = useState({
    claimAt: [],
    claimPercentage: [],
    userVestingInfo: DEFAULT_USERINFO,
  })
  const web3 = useWeb3()
  const vestingContract = useLuaVestingContract(vestingAddress)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const claimPercentsCall = []
        const claimAtsCall = []
        const length = await vestingContract.methods.getVestingLength().call()
        for (let i = 0; i < Number(length); i++) {
          const claimAt = vestingContract.methods.claimAts(i).call
          const claimPercent = vestingContract.methods.claimPercents(i).call
          claimAtsCall.push(claimAt)
          claimPercentsCall.push(claimPercent)
        }
        const claimPercentsResult = await makeBatchRequest(claimPercentsCall, web3)
        const claimAtsResult = await makeBatchRequest(claimAtsCall, web3)
        const userVestingInfo = await vestingContract.methods.info(account).call()
        const formatedVestingInfo = formatVestingUserInfo(userVestingInfo)

        setData({
          claimAt: claimAtsResult,
          claimPercentage: claimPercentsResult,
          userVestingInfo: formatedVestingInfo,
        })
      } catch (error) {
        console.log(error, 'fail to fetch vesting info')
      }
    }

    if (vestingContract && account) {
      fetchData()
    }
  }, [vestingContract, web3, account])

  return data
}

export default useVestingInfo
