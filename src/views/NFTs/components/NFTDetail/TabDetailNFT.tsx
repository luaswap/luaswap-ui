import { useWeb3React } from '@web3-react/core'
import { Button, Card, Flex, SecondaryButton, Text } from 'luastarter-uikits'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import { selectSelectedNFTPool } from 'state/nfts'
import styled from 'styled-components'
import useNFTPoolStatus from 'views/NFTs/hook/useNFTPoolStatus'
import { chain } from 'lodash'
import { supportIdoNetwork } from 'config/constants/idos'

const Wrapper = styled(Flex)`
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`

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
  position: relative;

  @media (max-width: 1400px) {
    width: 50%;
    min-width: unset;
  }
  @media (max-width: 991px) {
    width: 80%;
  }
`

const SoldOutBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(103, 103, 103, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageNFT = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  margin: 32px 0;
`

const QuantityBlock = styled(Flex)`
  margin-bottom: 32px;
`

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
  @media (max-width: 1400px) {
    width: 50%;
  }
  @media (max-width: 991px) {
    width: 80%;
  }
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

  @media (max-width: 1400px) {
    width: 100%;
  }
`

const TabDetailNFT = ({ activeIndex }) => {
  const [count, setCount] = useState(1)
  const NFTPoolDetail = useSelector(selectSelectedNFTPool)
  const { account, chainId } = useWeb3React()
  const [activeDetail, setActiveDetail] = useState(null)
  const [poolStatus] = useNFTPoolStatus(NFTPoolDetail)

  const indexFlatData = get(NFTPoolDetail, 'indexFlat.data', [])
  const networkNFTId = get(NFTPoolDetail, 'indexFlat.networkId', '')

  const isOpenNFTPool = useMemo(() => {
    return poolStatus === 'open'
  }, [poolStatus, NFTPoolDetail])

  const isMatchNetworkId = useMemo(() => {
    if (account) {
      return Number(chainId) === Number(networkNFTId)
    }
    return false
  }, [account, networkNFTId, chainId])

  useEffect(() => {
    setActiveDetail(indexFlatData[activeIndex])
    setCount(1)
  }, [activeIndex, indexFlatData])

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
        <ImageNFT src={activeDetail?.img} alt="nftimage" />
        <QuantityBlock justifyContent="center" alignItems="center">
          <ButtonCount onClick={decreaseCount} disabled={!isMatchNetworkId || !isOpenNFTPool || count < 2}>
            <Text fontSize="28px">-</Text>
          </ButtonCount>
          <CountNumber fontWeight="normal" fontSize="24px" color="#FFFFFF">
            {count}
          </CountNumber>
          <ButtonCount onClick={increaseCount} disabled={!isMatchNetworkId || !isOpenNFTPool}>
            <Text fontSize="28px">+</Text>
          </ButtonCount>
        </QuantityBlock>
        {false && (
          <SoldOutBack>
            <img src={`${process.env.PUBLIC_URL}/images/sold-out.png`} alt="" />
          </SoldOutBack>
        )}
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
          {!isMatchNetworkId && (
            <Text>You need to connect wallet and select {supportIdoNetwork[networkNFTId]} network.</Text>
          )}
          <ByNowNFTButton disabled={!isMatchNetworkId || !isOpenNFTPool || count < 1}>
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
