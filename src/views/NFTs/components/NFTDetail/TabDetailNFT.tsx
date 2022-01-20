import { Button, Card, Flex, SecondaryButton, Text } from 'luastarter-uikits'
import React, { useState } from 'react'
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

const TabDetailNFT = () => {
  const [count, setCount] = useState(0)

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
          Zodiac Treasure
        </NFTTitle>
        <NFTDesc fontSize="15px" color="#FFFFFF">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which dont look even slightly believable. If you are going
          to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of
          text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making
          this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a
          handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
          Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </NFTDesc>
        <BuyNFTBlock>
          <NFTTotalPrice fontWeight="bold" fontSize="24px" color="#FFFFFF">
            298 BUSD
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
