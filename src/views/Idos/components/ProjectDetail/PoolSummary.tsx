import React from 'react'
import {
  Card,
  CardBody,
  Flex,
  Link,
  Text,
  TwitterIcon,
  MediumIcon,
  WorldIcon,
  TelegramIcon,
} from 'common-uikitstrungdao'
import styled from 'styled-components'

const IconWrapper = styled.a`
  color: #212121;
  margin: 0 3px;
  display: flex !important;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background};
`
const PoolInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #e9e9e9;
  overflow: hidden;
  margin-right: 10px;
`

const PoolSummary = () => {
  return (
    <Card
      style={{
        width: '70%',
        marginRight: '20px',
      }}
    >
      <CardBody
        style={{
          height: '350px',
        }}
      >
        <Flex mb="15px" alignItems="center">
          <ImageContainer>
            <img src="https://i.ibb.co/YtdXYjg/cross.jpg" alt="img" style={{ width: '100%', height: '100%' }} />
          </ImageContainer>
          <PoolInfoBlock>
            <Text fontSize="24px" bold>
              Solana
            </Text>
            <Flex marginBottom="5px" alignItems="center">
              <IconWrapper href="google.com" target="__blank">
                <TelegramIcon />
              </IconWrapper>
              <IconWrapper>
                <TwitterIcon />
              </IconWrapper>
              <IconWrapper>
                <MediumIcon />
              </IconWrapper>
              <IconWrapper>
                <WorldIcon />
              </IconWrapper>
            </Flex>
          </PoolInfoBlock>
        </Flex>
        <Text>
          Next-generation dynamic AMM DEX that extends its defi functionality, becoming a permissionless one-stop
          cross-chain asset market.
        </Text>
        <Link href="google.com" mb="15px">
          Learn more
        </Link>
      </CardBody>
    </Card>
  )
}

export default PoolSummary
