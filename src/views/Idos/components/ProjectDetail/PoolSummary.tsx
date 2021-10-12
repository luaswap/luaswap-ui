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
  Box,
  Button,
} from 'luastarter-uikits'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import getLink from 'views/Idos/utils/getMediaUrl'
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
  margin-right: 14px;
  border-right: 1px solid #606060;
  padding-right: 14px;
  cursor: pointer;
`
const PoolInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(80% - 10px);
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
  font-weight: 700;
  width: 80px;
  justify-content: center;
  font-size: 14px;
  align-items: center;
  color: white;
  background-color: ${(props) => generateColorForStatusBar(props.status)};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const ImageContainer = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #e9e9e9;
  margin-right: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 70px;
    height: 70px;
  }
`
const Title = styled(Text)`
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`

const CapColumnWrapper = styled(Flex)`
  width: 50%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 20%;
  }
`

const SocialLinkWrapper = styled(Flex)`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 30%;
    justify-content: flex-end;
  }
`

const PoolWrapper = styled(Flex)`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
`

const AccessColumnWrapper = styled(Flex)`
  width: 50%;
  align-items: flex-end;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 15%;
    align-items: flex-start;
  }
`

const ProcessColumnWrapper = styled(Flex)`
  margin-top: 12px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0px;
    width: 70%;
  }
`

const ProcessAmountWrapper = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const CardWrapper = styled(Card)<CardWrapperProps>`
  width: 100%;
  @media screen and (min-width: 1800px) {
    width: ${(props) => (props.isShowPoolData ? '55%' : '100%')};
    margin-right: 24px;
  }
`
interface CardWrapperProps {
  isShowPoolData: boolean
}
interface PoolSummaryProps {
  currentPoolData: Pool
  tierDataOfUser: IdoDetailInfo
  contractData: IdoDetailInfo
  isAvailalbeOnCurrentNetwork: boolean
  isShowPoolData: boolean
}
/**
 * In Pool summary component, we get live data from contract
 * and fixed data from API
 */
const PoolSummary: React.FC<PoolSummaryProps> = ({
  currentPoolData,
  tierDataOfUser,
  contractData,
  isShowPoolData,
  isAvailalbeOnCurrentNetwork,
}) => {
  const [poolStatus] = usePoolStatus(currentPoolData)
  const { img, name, description, totalAmountIDO, payToken, idoToken } = useTotalDataFromAllPools(currentPoolData)
  const { socials } = currentPoolData
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
    <CardWrapper isShowPoolData={isShowPoolData}>
      <CardBody
        style={{
          height: 'auto',
        }}
      >
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <PoolWrapper mb="15px" alignItems="center" flex="1">
            <ImageContainer src={img} alt="img" width="30%" />
            <PoolInfoBlock>
              <Title bold>{name}</Title>
              {isShowPoolData && <StatusBar status={poolStatus}>{mapProjectStatus(poolStatus)}</StatusBar>}
            </PoolInfoBlock>
          </PoolWrapper>
          <SocialLinkWrapper marginBottom="5px" alignItems="center">
            <IconWrapper href={getLink(socials, 'TELEGRAM')} target="_blank">
              <TelegramIcon />
            </IconWrapper>
            <IconWrapper href={getLink(socials, 'TWITTER')} target="_blank">
              <TwitterIcon />
            </IconWrapper>
            <IconWrapper href={getLink(socials, 'MEDIUM')} target="_blank">
              <MediumIcon />
            </IconWrapper>
            <IconWrapper href={getLink(socials, 'FORUM')} target="_blank">
              <WorldIcon />
            </IconWrapper>
          </SocialLinkWrapper>
        </Flex>
        <Text>{description}</Text>
        {isShowPoolData && (
          <Flex justifyContent="space-between" mb="10px" mt="15px" alignItems="flex-start" flexWrap="wrap">
            <CapColumnWrapper alignItems="flex-start" flexDirection="column">
              <Text>Cap</Text>
              <Text color="primary" bold fontSize="18px">
                {totalAmountIDO} {idoToken?.symbol}
              </Text>
            </CapColumnWrapper>
            <ProcessColumnWrapper flexDirection="column">
              <Flex justifyContent="space-between" mb="3px">
                <Box>
                  {isPoolInProgress || !isPoolOpen ? (
                    <ProcessAmountWrapper justifyContent="flex-start">
                      <Text>Commit Process</Text>
                      <Text color="primary" bold fontSize="18px">
                        &nbsp;{totalCommittedAmount}/{totalAmountPay} {payToken?.symbol}
                      </Text>
                    </ProcessAmountWrapper>
                  ) : (
                    <ProcessAmountWrapper justifyContent="flex-start">
                      <Text>Swap Process</Text>
                      <Text color="primary" bold fontSize="18px">
                        &nbsp;{swappedAmountIDO}/{totalAmountIDO} {idoToken?.symbol}
                      </Text>
                    </ProcessAmountWrapper>
                  )}
                </Box>
                <Text color="primary" bold fontSize="18px">
                  {isPoolInProgress || !isPoolOpen
                    ? totalCommitedPercentage.toFixed(2)
                    : totalSwapAmountPercentage.toFixed(2)}
                  %
                </Text>
              </Flex>
              <Progress
                key={poolStatus}
                variant="round"
                primaryStep={(isPoolInProgress || !isPoolOpen) && totalCommitedPercentage}
                secondaryStep={!isPoolInProgress && totalSwapAmountPercentage}
              />
            </ProcessColumnWrapper>
          </Flex>
        )}
      </CardBody>
    </CardWrapper>
  )
}

export default PoolSummary
