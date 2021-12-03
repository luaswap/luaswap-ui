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
  TertiaryMessage,
  Button,
  LinkExternal,
} from 'luastarter-uikits'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import get from 'lodash/get'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import getLink from 'views/Idos/utils/getMediaUrl'
import { formatNumberWithComma } from 'utils/formatBalance'
import { supportIdoNetwork } from 'config/constants/idos'
import { useWeb3React } from '@web3-react/core'
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
  width: calc(80% - 10px);
`
interface StatusBarProps {
  status: string
}

const StatusBar = styled(Box)<StatusBarProps>`
  background-color: red;
  border-radius: 50px;
  padding: 8px 16px;
  display: flex;
  font-weight: 700;
  display: inline-block;
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
    width: 25%;
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
export const YellowCard = styled(Box)`
  box-sizing: border-box;
  display: inline-block;
  background-color: rgba(243, 132, 30, 0.05);
  color: rgb(243, 132, 30);
  margin-right: 10px;
  font-weight: 600;
  border-radius: 16px;
  padding: 8px 16px;
  transition: background-color 0.2s, opacity 0.2s;
`

const ProcessAmountWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`
const InfoText = styled(Text)`
  color: red;
  font-size: 11px;
`

const CardWrapper = styled(Card)<CardWrapperProps>`
  width: ${(props) => (props.isShowPoolData ? 'calc(55% - 24px)' : '85%')};
  margin-right: 24px;

  @media (max-width: 1800px) {
    width: ${(props) => (props.isShowPoolData ? '100%' : 'calc(85% - 24px)')};
    margin-right: ${(props) => (props.isShowPoolData ? '0px' : '24px')};
  }

  @media (max-width: 1500px) {
    width: ${(props) => (props.isShowPoolData ? '100%' : 'calc(75% - 24px)')};
  }

  @media (max-width: 1100px) {
    margin-right: ${(props) => (props.isShowPoolData ? '0px' : '24px')};
  }

  @media (max-width: 800px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: ${(props) => (props.isShowPoolData ? '0px' : '24px')};
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
  isShowTierInfor: boolean
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
  isShowTierInfor,
  isAvailalbeOnCurrentNetwork,
}) => {
  const { account } = useWeb3React()
  const [poolStatus, openAtSeconds, closedAtSeconds, claimAtSeconds] = usePoolStatus(currentPoolData)
  const { img, name, description, totalAmountIDO, payToken, idoToken } = useTotalDataFromAllPools(currentPoolData)
  const { socials, timeVesting, percentVesting, versionContract, isVesting } = currentPoolData
  const { whitelistLink } = currentPoolData
  const { totalCommittedAmount, totalAmountPay, swappedAmountIDO } = contractData
  const totalCommitedPercentage = useMemo(() => {
    if (totalCommittedAmount && totalAmountPay) {
      return calculateCommittedAmountPercentage(totalCommittedAmount, totalAmountPay)
    }

    return 0
  }, [totalCommittedAmount, totalAmountPay])

  const isShowVesting = useMemo(() => {
    if (isVesting && versionContract === 2 && tierDataOfUser.vestingContract) {
      return true
    }

    return false
  }, [isVesting, versionContract])

  // const calculatedSwappedAmount = useMemo(() => {
  //   if (isShowVesting) {

  //   }

  //   return swappedAmountIDO
  // }, [swappedAmountIDO, isShowVesting])

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
  // We will consider pool is open when pool still allows user to commit money and current time is < than claim time
  const isPoolInProgress = useMemo(() => {
    if (poolStatus === 'open' || (poolStatus === 'claim' && claimAtSeconds > 0)) {
      return true
    }

    return false
  }, [poolStatus, claimAtSeconds])

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
              {get(currentPoolData, 'network', []).map((network) => {
                return <YellowCard key={network}>{network}</YellowCard>
              })}
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
                {formatNumberWithComma(totalAmountIDO, true)} {idoToken?.symbol}
              </Text>
            </CapColumnWrapper>
            <ProcessColumnWrapper flexDirection="column">
              <Flex justifyContent="space-between" mb="3px">
                <Box>
                  {isPoolInProgress || !isPoolOpen ? (
                    <ProcessAmountWrapper justifyContent="flex-start">
                      {isShowTierInfor ? (
                        <TertiaryMessage
                          hoverContent="You can still commit &amp; own a guaranteed share of the token IDO (except for tier 0), regardless of the percentage shown."
                          hoverPlacement="top"
                        >
                          Commit Process
                        </TertiaryMessage>
                      ) : (
                        <Text>Commit Process</Text>
                      )}
                      <Text color="primary" bold fontSize="18px">
                        &nbsp;{formatNumberWithComma(totalCommittedAmount, true)}/
                        {formatNumberWithComma(totalAmountPay)} {payToken?.symbol}
                      </Text>
                    </ProcessAmountWrapper>
                  ) : (
                    <ProcessAmountWrapper justifyContent="flex-start">
                      <Text>Swap Process</Text>
                      <Text color="primary" bold fontSize="18px">
                        &nbsp;{formatNumberWithComma(swappedAmountIDO, true)}/
                        {formatNumberWithComma(totalAmountIDO, true)} {idoToken?.symbol}
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
        {isShowPoolData && isShowTierInfor && (
          <InfoText>
            (*) You can still commit &amp; own a guaranteed share of the token IDO (except for tier 0), regardless of
            the percentage shown.
          </InfoText>
        )}
        {isShowPoolData && !isShowTierInfor && (
          <InfoText>
            (*) Pool for WHITELIST WINNERS ONLY. If you are not on the&nbsp;
            <a style={{ textDecoration: 'underline' }} href={whitelistLink} target="_blank" rel="noreferrer">
              list
            </a>
            , you can NOT commit successfully.
          </InfoText>
        )}
        {isShowPoolData && !account && (
          <InfoText>
            (*) Connect your wallet to LuaStarter at least 3 days before the IDO opens to complete your registration.
          </InfoText>
        )}
      </CardBody>
    </CardWrapper>
  )
}

export default PoolSummary
