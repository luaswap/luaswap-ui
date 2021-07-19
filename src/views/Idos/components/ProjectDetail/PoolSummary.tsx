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
import BigNumber from 'bignumber.js'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { IdoDetail } from 'state/types'
import {
  calculateCommittedAmountPercentage,
  calculateSwappedAmountPercentage,
  mapProjectStatus,
  generateColorForStatusBar,
} from '../helper'
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
interface StatusBarProps {
  status: string
}

const StatusBar = styled(Text)<StatusBarProps>`
  background-color: red;
  border-radius: 50px;
  padding: 5px;
  display: flex;
  margin-bottom: 5px;
  width: 80px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${(props) => generateColorForStatusBar(props.status)};
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 70px;
  height: 70px;
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

  const { totalCommittedAmount, totalAmountPay, swappedAmountIDO } = contractData
  const totalCommitedPercentage = useMemo(() => {
    if (totalCommittedAmount && totalAmountPay) {
      return calculateCommittedAmountPercentage(totalCommittedAmount, totalAmountPay)
    }

    return 0
  }, [totalCommittedAmount, totalAmountPay])

  const totalPayTokenCommited = useMemo(() => {
    if (totalCommittedAmount !== null && swappedAmountIDO !== null) {
      return new BigNumber(totalCommittedAmount).plus(new BigNumber(swappedAmountIDO)).toFixed(2)
    }

    return '0'
  }, [totalCommittedAmount, swappedAmountIDO])
  const totalSwapAmountPercentage = useMemo(() => {
    if (swappedAmountIDO && totalAmountIDO) {
      return calculateSwappedAmountPercentage(swappedAmountIDO, totalAmountIDO)
    }

    return 0
  }, [swappedAmountIDO, totalAmountIDO])
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
            <StatusBar status={poolStatus}>{mapProjectStatus(poolStatus)}</StatusBar>
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
        <Flex justifyContent="space-between" mb="10px" mt="15px" alignItems="flex-start">
          {/* <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="primary">Swap rate</Text>
            <Text>
              1 {payToken.symbol} = {rate} {idoToken.symbol}
            </Text>
          </Flex> */}
          <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="primary">Cap</Text>
            <Text>
              {totalAmountIDO} {idoToken.symbol}
            </Text>
          </Flex>
          {poolStatus === 'closed' && (
            <Flex justifyContent="flex-start" flexDirection="column">
              <Text color="primary">Commit Amount</Text>
              <Text>
                {totalPayTokenCommited}/{totalAmountPay} {payToken.symbol}
              </Text>
            </Flex>
          )}
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
                {totalCommittedAmount}/{totalAmountPay} {payToken?.symbol}
              </>
            ) : (
              <>
                {swappedAmountIDO}/{totalAmountIDO} {idoToken?.symbol}
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
