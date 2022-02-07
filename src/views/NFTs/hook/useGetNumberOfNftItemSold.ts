import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { selectUpdateNumberOfSoldNFTCount } from 'state/nfts'
import { getNumberOfNftSold } from 'utils/callHelpers'
import { useNFTPoolContract } from 'hooks/useContract'

const useGetNumberOfNftItemSold = (nft) => {
  const { account, chainId } = useWeb3React()
  const [totalNFTItemSold, setTotalNFTItemSold] = useState(0)
  const updateNumberOfSoldNFTCount = useSelector(selectUpdateNumberOfSoldNFTCount)
  const inoContract = useNFTPoolContract(nft.addressInoContract)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemDataSold = await getNumberOfNftSold(inoContract, nft.addressNftContract, nft.nftId)
        setTotalNFTItemSold(itemDataSold)
      } catch (error) {
        console.log(error)
      }
    }
    if (nft.nftId) {
      fetchData()
    }
  }, [account, chainId, updateNumberOfSoldNFTCount, nft.nftId])

  return [totalNFTItemSold]
}

export default useGetNumberOfNftItemSold
