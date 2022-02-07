import React from 'react'
import { Text } from 'luastarter-uikits'
import styled from 'styled-components'
import useGetNumberOfNftItemSold from 'views/NFTs/hook/useGetNumberOfNftItemSold'

const TabName = styled.div``

const TabNameNFT = ({ nft }) => {
  const [totalNFTItemSold] = useGetNumberOfNftItemSold(nft)
  return (
    <TabName>
      <Text fontWeight="bold" fontSize="20px" color="#FFFFFF">
        {nft.name}
      </Text>
      <Text fontWeight="normal" fontSize="14px" color="#FFFFFF">
        {nft.totalSale - totalNFTItemSold} available
      </Text>
    </TabName>
  )
}

export default TabNameNFT
