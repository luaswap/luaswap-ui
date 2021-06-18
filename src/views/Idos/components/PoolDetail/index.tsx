import React, { useCallback } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  CardRibbon,
  Text,
  Link,
  Flex,
  TwitterIcon,
  MediumIcon,
  WorldIcon,
  TelegramIcon,
  Progress,
} from 'common-uikitstrungdao'

const PoolInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
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

const ImageContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: #e9e9e9;
  overflow: hidden;
  margin-right: 10px;
`

interface PoolDetailProps {
  status: string
}

const PoolDetail: React.FC<PoolDetailProps> = ({ status }) => {
  const history = useHistory()
  const { path } = useRouteMatch()

  const navigateToProjectDetail = useCallback(() => {
    history.push(`${path}/project/1`)
  }, [history, path])

  return (
    <Card ribbon={<CardRibbon variantColor="primary" text={status} />}>
      <CardBody style={{ height: '400px' }}>
        <Flex mb="15px" alignItems="center">
          <ImageContainer onClick={navigateToProjectDetail}>
            <img src="https://i.ibb.co/YtdXYjg/cross.jpg" alt="img" style={{ width: '100%', height: '100%' }} />
          </ImageContainer>
          <PoolInfoBlock>
            <Text fontSize="24px" bold onClick={navigateToProjectDetail} style={{
              cursor: 'pointer'
            }}>
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
        <Text>AI-powered, traditional mobile banking experience with seamless crypto integration and seamless</Text>
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
        <Flex justifyContent="space-between" mb="10px">
          <Text color="secondary">Progress</Text>
          <Text color="secondary">Participants: 9999</Text>
        </Flex>
        <Progress variant="round" primaryStep={50} />
        <Flex mt="10px" justifyContent="space-between">
          <Flex flexDirection="column">
            <Text color="secondary">Min allocation</Text>
            <Text>100 LNFT</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text color="secondary">Max allocation</Text>
            <Text>1000 LNFT</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default PoolDetail
