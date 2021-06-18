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
  Progress,
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

const CardWrapper = styled(Card)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 60%;
    margin-right: 24px;
  }
`

const PoolSummary = () => {
  return (
    <CardWrapper>
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
        <Flex justifyContent="space-between" mb="10px">
          <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="secondary">Swap rate</Text>
            <Text>1 BUSD = 10 BBANK</Text>
          </Flex>
          <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="secondary">Cap</Text>
            <Text>1000000</Text>
          </Flex>
          <Flex justifyContent="flex-end" flexDirection="column">
            <Text color="secondary">Access</Text>
            <Text>Private</Text>
          </Flex>
        </Flex>
        <Progress variant="round" primaryStep={90} />
        <Flex justifyContent="space-between" mt="10px">
          <Text color="secondary">88000 USDT/1000000 USDT</Text>
          <Text color="secondary">88.88%</Text>
        </Flex>
      </CardBody>
    </CardWrapper>
  )
}

export default PoolSummary
