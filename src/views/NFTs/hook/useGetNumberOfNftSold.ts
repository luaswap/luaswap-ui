import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { getWeb3BasedOnChainId } from 'utils/web3'
import { getNFTPoolContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { selectUpdateNumberOfSoldNFTCount } from 'state/nfts'

const useGetNumberOfNftSold = (packNFT) => {
  const { account, chainId } = useWeb3React()
  const [totalNFTSold, setTotalNFTSold] = useState(0)
  const updateNumberOfSoldNFTCount = useSelector(selectUpdateNumberOfSoldNFTCount)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listActionGetNumberSoldNFT = []
        const web3 = getWeb3BasedOnChainId(Number(packNFT.networkId))
        packNFT.data.forEach((nft) => {
          const nftPoolContractAddress = nft.addressInoContract

          const nftPoolContract = getNFTPoolContract(web3, nftPoolContractAddress)
          const methodGetNumberOfNftSold = nftPoolContract.methods.numberOfNftSold(
            nft.addressNftContract,
            nft.nftId,
          ).call
          listActionGetNumberSoldNFT.push(methodGetNumberOfNftSold)
        })
        const dataList = await makeBatchRequest(listActionGetNumberSoldNFT, web3)
        setTotalNFTSold(
          dataList.reduce((totalA, totalB) => {
            return Number(totalA) + Number(totalB)
          }, 0),
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [account, chainId, updateNumberOfSoldNFTCount])
  return [totalNFTSold]
}

export default useGetNumberOfNftSold
