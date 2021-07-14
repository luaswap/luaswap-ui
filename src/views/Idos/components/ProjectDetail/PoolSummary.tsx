import React, { useMemo } from 'react'
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
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { IdoDetail } from 'state/types'
import { calculateCommittedAmountPercentage, calculateSwappedAmountPercentage } from '../helper'
import usePoolStatus from '../../hooks/usePoolStatus'
import useTotalDataFromAllPools from '../../hooks/useTotalDataFromAllPools'

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
  currentPoolData: Pool
  tierDataOfUser: IdoDetailInfo
  contractData: IdoDetail
  isAvailalbeOnCurrentNetwork: boolean
}
/**
 * In Pool summary component, we get live data from contract
 * and fixed data from API
 */
const PoolSummary: React.FC<PoolSummaryProps> = ({
  currentPoolData,
  tierDataOfUser,
  contractData,
  isAvailalbeOnCurrentNetwork,
}) => {
  const [poolStatus] = usePoolStatus(currentPoolData)
  const { img, name, description, totalAmountIDO, payToken, idoToken } = useTotalDataFromAllPools(currentPoolData)

  const { totalCommittedAmount, totalAmountPay, swappedAmountPay } = contractData
  const totalCommitedPercentage = useMemo(() => {
    if (totalCommittedAmount && totalAmountPay) {
      return calculateCommittedAmountPercentage(totalCommittedAmount, totalAmountPay)
    }

    return 0
  }, [totalCommittedAmount, totalAmountPay])

  const totalSwapAmountPercentage = useMemo(() => {
    if (swappedAmountPay && totalAmountIDO) {
      return calculateSwappedAmountPercentage(swappedAmountPay, totalAmountIDO)
    }

    return 0
  }, [swappedAmountPay, totalAmountIDO])
  const isPoolInProgress = useMemo(() => {
    if (poolStatus === 'open') {
      return true
    }

    return false
  }, [poolStatus])

  const isPoolOpen = useMemo(() => {
    if (poolStatus === 'not open') {
      return false
    }

    return true
  }, [poolStatus])
  return (
    <CardWrapper>
      <CardBody
        style={{
          height: 'auto',
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
        <Flex justifyContent="space-between" mb="10px" mt="15px">
          {/* <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="primary">Swap rate</Text>
            <Text>
              1 {payToken.symbol} = {rate} {idoToken.symbol}
            </Text>
          </Flex> */}
          <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="primary">Cap</Text>
            <Text>{totalAmountIDO}</Text>
          </Flex>
          <Flex justifyContent="flex-end" flexDirection="column">
            <Text color="primary">Access</Text>
            <Text textAlign="right">Public</Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          {isPoolInProgress || !isPoolOpen ? (
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
            primaryStep={(isPoolInProgress || !isPoolOpen) && totalCommitedPercentage}
            secondaryStep={!isPoolInProgress && totalSwapAmountPercentage}
          />
        </Flex>
        <Flex justifyContent="space-between" mt="10px">
          <Text>
            {isPoolInProgress || !isPoolOpen ? (
              <>
                {totalCommittedAmount} / {totalAmountPay} {payToken?.symbol}
              </>
            ) : (
              <>
                {swappedAmountPay} / {totalAmountIDO} {idoToken?.symbol}
              </>
            )}
          </Text>
          <Text color="secondary">
            {isPoolInProgress || !isPoolOpen
              ? totalCommitedPercentage.toFixed(2)
              : totalSwapAmountPercentage.toFixed(2)}
            %
          </Text>
        </Flex>
      </CardBody>
    </CardWrapper>
  )
}

export default PoolSummary
