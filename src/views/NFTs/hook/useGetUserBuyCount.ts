import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useNFTPoolContract } from 'hooks/useContract'
import { userBuyCount } from 'utils/callHelpers'

const useGetUserBuyCount = (contractAddress: string, nftAddress: string) => {
  const { account } = useWeb3React()
  const inoContract = useNFTPoolContract(contractAddress)
  const [userBuyCountVal, setUserButCountVal] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await userBuyCount(inoContract, account, nftAddress)
        setUserButCountVal(count || 0)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [inoContract, account, nftAddress])

  return [Number(userBuyCountVal)]
}

export default useGetUserBuyCount
