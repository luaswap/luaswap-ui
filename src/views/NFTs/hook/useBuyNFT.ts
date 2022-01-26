import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ZERO_ADDRESS } from 'config/constants/idos'
import { useNFTPoolContract } from 'hooks/useContract'
import { buyNFT } from 'utils/callHelpers'

const useBuyNFT = (contractAddress: string, payTokenAddress: string, networkNFTId: string) => {
  const { account, chainId } = useWeb3React()
  const inoContract = useNFTPoolContract(contractAddress)
  const isNativeToken = payTokenAddress === ZERO_ADDRESS

  const handleBuyNFT = useCallback(
    async (nftAddress, nftType, quantity, payToken, payAmount) => {
      const txHash = await buyNFT(
        inoContract,
        account,
        nftAddress,
        nftType,
        quantity,
        payToken,
        payAmount,
        isNativeToken,
      )
      console.info(txHash)
    },
    [account, inoContract, isNativeToken, payTokenAddress, networkNFTId, chainId],
  )

  return { onBuyNFT: handleBuyNFT }
}

export default useBuyNFT
