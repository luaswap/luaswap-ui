import { useWeb3React } from '@web3-react/core'
import { Button, Card, Flex, SecondaryButton, Text } from 'luastarter-uikits'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import { selectSelectedNFTPool } from 'state/nfts'
import styled from 'styled-components'

const Wrapper = styled(Flex)``

const CardImage = styled(Card)`
  background: #1a1a1a;
  border-radius: 24px;
  width: 360px;
  min-width: 360px;
  height: 430px;
  margin: 24px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const ImageNFT = styled.img`
  width: 300px;
  height: 300px;
  margin: 32px 0;
`

const QuantityBlock = styled(Flex)``

const CountNumber = styled(Text)`
  margin: 0 32px;
`

const ButtonCount = styled.button`
  background: #353535;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      opacity: 0.5;
    }
  }
`

const DetailNFTBlock = styled.div`
  margin: 40px;
`

const NFTTitle = styled(Text)`
  margin-bottom: 8px;
  line-height: 48px;
`

const NFTDesc = styled(Text)`
  line-height: 24px;
`

const NFTTotalPrice = styled(Text)``

const BuyNFTBlock = styled.div`
  padding-top: 20px;
  margin-top: 50px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 40%;
    top: 0;
    border-top: 2px solid #8b8b8b;
  }
`

const ByNowNFTButton = styled(Button)`
  width: 350px;
  margin-top: 30px;
`

const TabDetailNFT = ({ activeIndex }) => {
  const [count, setCount] = useState(0)
  const NFTPoolDetail = useSelector(selectSelectedNFTPool)
  const { chainId } = useWeb3React()
  const [activeDetail, setActiveDetail] = useState<any>()

  useEffect(() => {
    setActiveDetail(NFTPoolDetail?.index['56'][activeIndex])
    setCount(0)
  }, [activeIndex, NFTPoolDetail])

  const tabId = get(NFTPoolDetail, `projectDetail[${activeDetail?.id}]`, null)
  const payTokenSymbol = get(activeDetail, 'payToken.symbol', null)

  const decreaseCount = () => {
    setCount(count - 1)
  }

  const increaseCount = () => {
    setCount(count + 1)
  }
  return (
    <Wrapper>
      <CardImage>
        <ImageNFT src={`${process.env.PUBLIC_URL}/images/Redluckyenvelop.png`} alt="nftimage" />
        <QuantityBlock justifyContent="center" alignItems="center">
          <ButtonCount onClick={decreaseCount} disabled={count < 1}>
            <Text fontSize="28px">-</Text>
          </ButtonCount>
          <CountNumber fontWeight="normal" fontSize="24px" color="#FFFFFF">
            {count}
          </CountNumber>
          <ButtonCount onClick={increaseCount}>
            <Text fontSize="28px">+</Text>
          </ButtonCount>
        </QuantityBlock>
      </CardImage>
      <DetailNFTBlock>
        <NFTTitle fontWeight="900" fontSize="32px" color="#FFFFFF">
          {activeDetail?.name}
        </NFTTitle>
        <NFTDesc fontSize="15px" color="#FFFFFF">
          {tabId}
        </NFTDesc>
        <BuyNFTBlock>
          <NFTTotalPrice fontWeight="bold" fontSize="24px" color="#FFFFFF">
            {activeDetail?.price * count} {payTokenSymbol}
          </NFTTotalPrice>
          <ByNowNFTButton disabled={count < 1}>
            <Text fontWeight="bold" fontSize="15px" color="#353535">
              Buy Now
            </Text>
          </ByNowNFTButton>
        </BuyNFTBlock>
      </DetailNFTBlock>
    </Wrapper>
  )
}

export default TabDetailNFT
