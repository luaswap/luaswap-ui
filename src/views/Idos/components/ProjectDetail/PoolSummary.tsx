import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
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
import { IdoDetail } from 'state/types'
import { Pool } from 'views/Idos/types'
import usePoolStatus from '../../hooks/usePoolStatus'

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

interface PoolSummaryProps {
  idoDetail: IdoDetail | null
  currentPoolData: Pool
}

const PoolSummary: React.FC<PoolSummaryProps> = ({ idoDetail, currentPoolData }) => {
  const { totalAmountIDO, totalAmountPay, totalCommittedAmount, swappedAmountPay } = idoDetail
  const { img, description, name } = currentPoolData
  const [poolStatus] = usePoolStatus(idoDetail)
  const rate = useMemo(() => {
    return new BigNumber(totalAmountIDO).dividedBy(new BigNumber(totalAmountPay)).toFixed(2)
  }, [totalAmountIDO, totalAmountPay])

  const totalCommitedPercentage = useMemo(() => {
    if (totalCommittedAmount && totalAmountPay) {
      return new BigNumber(totalCommittedAmount).dividedBy(new BigNumber(totalAmountPay)).multipliedBy(100).toNumber()
    }

    return 0
  }, [totalCommittedAmount, totalAmountPay])

  const totalSwapAmountPercentage = useMemo(() => {
    if (swappedAmountPay && totalAmountPay) {
      return new BigNumber(swappedAmountPay).dividedBy(new BigNumber(totalAmountPay)).multipliedBy(100).toNumber()
    }

    return 0
  }, [swappedAmountPay, totalAmountPay])

  const isPoolInProgress = useMemo(() => {
    if (poolStatus === 'open' || poolStatus === 'not open') {
      return true
    }

    return false
  }, [poolStatus])
  return (
    <CardWrapper>
      <CardBody
        style={{
          height: '375px',
        }}
      >
        <Flex mb="15px" alignItems="center">
          <ImageContainer>
            <img src={img} alt="img" style={{ width: '100%', height: '100%' }} />
          </ImageContainer>
          <PoolInfoBlock>
            <Text fontSize="24px" bold>
              {name}
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
        <Text>{description}</Text>
        <Link href="google.com" mb="15px">
          Learn more
        </Link>
        <Flex justifyContent="space-between" mb="10px">
          <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="primary">Swap rate</Text>
            <Text>1 ETH = {rate} BBANK</Text>
          </Flex>
          <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="primary">Cap</Text>
            <Text>{totalAmountIDO}</Text>
          </Flex>
          <Flex justifyContent="flex-end" flexDirection="column">
            <Text color="primary">Access</Text>
            <Text>Private</Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          {isPoolInProgress ? (
            <Text mb="10px" color="primary">
              Commited Progress
            </Text>
          ) : (
            <Text mb="10px" color="primary">
              Swap Progress
            </Text>
          )}
          <Progress
            variant="round"
            primaryStep={isPoolInProgress && totalCommitedPercentage}
            secondaryStep={!isPoolInProgress && totalSwapAmountPercentage}
          />
        </Flex>
        <Flex justifyContent="space-between" mt="10px">
          <Text>
            {isPoolInProgress ? totalCommittedAmount : swappedAmountPay}/{totalAmountPay} ETH
          </Text>
          <Text color="secondary">{isPoolInProgress ? totalCommitedPercentage : totalSwapAmountPercentage}%</Text>
        </Flex>
      </CardBody>
    </CardWrapper>
  )
}

export default PoolSummary
