import { getNumberOfNftSold } from 'utils/callHelpers'
import { useWeb3React } from '@web3-react/core'
import { useNFTPoolContract } from 'hooks/useContract'
import { useCallback, useEffect, useState } from 'react'
import { getWeb3BasedOnChainId } from 'utils/web3'
import { getNFTPoolContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'

const useGetNumberOfNftSold = (packNFT) => {
  const { account, chainId } = useWeb3React()
  //   const nftPoolContract = useNFTPoolContract(contractAddress)
  const [totalNFTSold, setTotalNFTSold] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      console.log(packNFT)
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

        console.log(listActionGetNumberSoldNFT)

        const dataList = await makeBatchRequest(listActionGetNumberSoldNFT, web3)

        console.log(dataList)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [account, chainId])
  return []
}

export default useGetNumberOfNftSold
