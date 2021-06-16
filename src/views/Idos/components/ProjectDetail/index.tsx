import React from 'react'
import {
  Text,
  Flex,
  TwitterIcon,
  MediumIcon,
  WorldIcon,
  TelegramIcon,
  Card,
  CardBody,
  Link,
  Heading,
  Button,
} from 'common-uikitstrungdao'
import styled from 'styled-components'
import Steps from './Steps'

const Row = styled.div`
  max-width: 1200px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 60px;
  margin: 0 auto;
`

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

const ProjectDetail = () => {
  return (
    <Row>
      <Flex mb="40px">
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
        <Card
          style={{
            width: '30%',
          }}
        >
          <CardBody
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '350px',
            }}
          >
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Button scale="sm" mb="10px">
                Connect Wallet
              </Button>
              <Text textAlign="center">
                Deposit USDT to commit the slots, Unspent USDT can be withdrawn when IDO finishes. Token can be claimed
                after Fri, 25 Jun 2021 08.00.00 GMT
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      <Heading as="h2" scale="xl" color="secondary" mb="24px">
        Project Detail
      </Heading>
      <Flex mt="40px" mb="40px">
        <Card
          style={{
            width: '60%',
            height: '350px',
            marginRight: '20px',
          }}
        >
          <CardBody>Website</CardBody>
        </Card>
        <Card
          style={{
            width: '40%',
            height: '350px',
          }}
        >
          <CardBody>Pool Information</CardBody>
        </Card>
      </Flex>
      <Steps />
    </Row>
  )
}

export default ProjectDetail
