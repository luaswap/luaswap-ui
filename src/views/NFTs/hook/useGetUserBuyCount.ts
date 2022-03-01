import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useNFTPoolContract } from 'hooks/useContract'
import { userBuyCount } from 'utils/callHelpers'
import { useSelector } from 'react-redux'
import { selectUpdateNumberOfSoldNFTCount } from 'state/nfts'

const useGetUserBuyCount = (contractAddress: string, nftId: string, networkNFTId: string): [a: number, b: boolean] => {
  const { account, chainId } = useWeb3React()
  const inoContract = useNFTPoolContract(contractAddress)
  const [userBuyCountVal, setUserButCountVal] = useState(0)
  const updateNumberOfSoldNFTCount = useSelector(selectUpdateNumberOfSoldNFTCount)
  const [isLoadingGetUserBuyCount, setIsLoadingGetUserBuyCount] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingGetUserBuyCount(true)
        const count = await userBuyCount(inoContract, account, nftId)
        setUserButCountVal(count || 0)
        setIsLoadingGetUserBuyCount(false)
      } catch (error) {
        console.log(error)
        setIsLoadingGetUserBuyCount(false)
      }
    }
    if (contractAddress && nftId && account && !!networkNFTId && chainId === Number(networkNFTId)) {
      fetchData()
    }
  }, [inoContract, account, nftId, updateNumberOfSoldNFTCount, networkNFTId, chainId])

  return [Number(userBuyCountVal), isLoadingGetUserBuyCount]
}

export default useGetUserBuyCount
