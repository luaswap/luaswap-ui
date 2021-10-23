import React, { useEffect, useState, useMemo } from 'react'
import { Flex, Heading, Mesage, Text, Box } from 'luastarter-uikits'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import PageLoader from 'components/PageLoader'
import useDeepMemo from 'hooks/useDeepMemo'
import { fetchPool, selectCurrentPool, selectLoadingCurrentPool, setDefaultCurrentPool } from 'state/ido'
import { selectUserTier } from 'state/profile'
import { getTierDataAfterSnapshot } from 'state/profile/getProfile'
import { useBlock } from 'state/hooks'
import { useAppDispatch } from 'state'
import get from 'lodash/get'
import useSecondsUntilCurrent from 'views/Idos/hooks/useSecondsUntilCurrent'

import Steps from './Steps'
import Deposit from './Deposit'
import PoolSummary from './PoolSummary'
import ProjectInfo from './ProjectInfo'
import PoolInfo from './PoolInfo'
import TokenInfo from './TokenInfo'
import TierDetails from './TierDetails'
import useDataFromIdoContract from '../../hooks/useDataFromIdoContract'
import useTotalDataFromApi from '../../hooks/useTotalDataFromApi'
import { generateColorForStatusBar, getIdoDataBasedOnChainIdAndTier, getIdoSupportedNetwork } from '../helper'

interface PropjectDetailProps {
  isShowPoolData: boolean
}

const Row = styled.div`
  max-width: 1600px;
  padding-left: 24px;
  padding-right: 24px;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    padding-left: 0px;
    padding-right: 0px;
  } ;
`

const StyledFlex = styled(Flex)`
  @media screen and (min-width: 1800px) {
    flex-wrap: nowrap;
  }
`

const ProjectDetailBox = styled(Box)<PropjectDetailProps>`
  width: ${(props) => (props.isShowPoolData ? 'calc(50% - 48px)' : '100%')};
  margin-right: ${(props) => (props.isShowPoolData ? '24px' : '0px')};
  @media screen and (max-width: 1366px) {
    width: ${(props) => (props.isShowPoolData ? 'calc(60% - 48px)' : '100%')};
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 24px;
  } ;
`

const PoolInfoBox = styled(Box)`
  width: 25%;

  @media screen and (max-width: 1366px) {
    width: 20%;
  }

  @media screen and (max-width: 1024px) {
    width: calc(50% - 24px);
  }

  @media screen and (max-width: 576px) {
    width: 100%;
    margin-bottom: 24px;
  } ;
`

const TokenInfoBox = styled(Box)`
  width: 25%;

  @media screen and (max-width: 1366px) {
    width: 20%;
  }

  @media screen and (max-width: 1024px) {
    width: calc(50% - 24px);
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  } ;
`

const StyledHeading = styled(Heading)`
  margin-bottom: 14px;
  ${({ theme }) => theme.mediaQueries.lg} {
  }
`

interface ParamsType {
  id: string
}

const ProjectDetail = () => {
  const { chainId, account } = useWeb3React()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userTierAfterSnapshot, setUserTierAfterSnapshot] = useState(0)
  const { id } = useParams<ParamsType>()
  const dispatch = useAppDispatch()
  const blockNumber = useBlock()
  const currentPoolData = useSelector(selectCurrentPool)
  const userTier = useSelector(selectUserTier)
  const isLoadingPool = useSelector(selectLoadingCurrentPool)
  const secondsUntilSnapshot = useSecondsUntilCurrent(get(currentPoolData, 'untilSnapshootAt', null))
  const idoSupportedNetwork = getIdoSupportedNetwork(currentPoolData.index)
  const { isPresent, status } = currentPoolData
  const isShowPoolData = useMemo(() => {
    if (isPresent && status === 1) {
      return false
    }

    return true
  }, [isPresent, status])

  useEffect(() => {
    if (id) {
      dispatch(
        fetchPool(id, () => {
          setIsLoaded(true)
        }),
      )
    }
  }, [id, dispatch, blockNumber.currentBlock])
  useEffect(() => {
    const fetchTierAfterSnapshotTime = async () => {
      try {
        const { tier } = await getTierDataAfterSnapshot(account, id)
        setUserTierAfterSnapshot(tier)
      } catch (error) {
        setUserTierAfterSnapshot(0)
        console.log(error, 'fail to fetch tier after snapshot time')
      }
    }
    // Only call this api when current date time > snapshot time
    if (secondsUntilSnapshot !== null && secondsUntilSnapshot <= 0 && account) {
      fetchTierAfterSnapshotTime()
    }
  }, [secondsUntilSnapshot, account, id])

  // Clear current pool when component unmount
  useEffect(() => {
    return () => {
      dispatch(setDefaultCurrentPool())
    }
  }, [dispatch])

  const selectedUserTier = useMemo(() => {
    // We will get the userTier if current date time < snapshot time or else we will get userTierAfterSnapshot
    if (secondsUntilSnapshot !== null && secondsUntilSnapshot <= 0) {
      return userTierAfterSnapshot
    }
    return userTier
  }, [secondsUntilSnapshot, userTier, userTierAfterSnapshot])

  const tierDataOfUser = useDeepMemo(() => {
    const { index = [] } = currentPoolData
    return getIdoDataBasedOnChainIdAndTier(index, chainId, selectedUserTier)
  }, [currentPoolData, chainId, selectedUserTier])

  const [_, totalUserCommittedFromContract, totalAmountUserSwapped, isLoadingDataFromContract] = useDataFromIdoContract(
    tierDataOfUser.addressIdoContract,
    tierDataOfUser.index,
    currentPoolData.index,
  )

  const idoDetailFromContract = useTotalDataFromApi(currentPoolData)

  const isAvailalbeOnCurrentNetwork = useDeepMemo(() => {
    if (!account || !currentPoolData.index) {
      return false
    }
    const availalbeNetwork = Object.keys(currentPoolData.index)
    return availalbeNetwork.includes(String(chainId))
  }, [currentPoolData.index, chainId])

  /**
   * currentPoolData: all tier's information
   * tierDataOfUser: The correct tier data for user (based on user's tier)
   * contractData: idos data fetch from contract
   */
  return (
    <Page>
      <Row>
        {/* After show the loading component, never show it second time */}
        {!isLoaded && isLoadingPool ? (
          <PageLoader />
        ) : (
          <>
            {' '}
            {!isAvailalbeOnCurrentNetwork && account && isShowPoolData && (
              <Mesage variant="warning" mb="16px">
                <Text>
                  The IDO is on {idoSupportedNetwork}, please switch to {idoSupportedNetwork} to join
                </Text>
              </Mesage>
            )}
            <StyledFlex mb="40px" flexWrap="wrap">
              <PoolSummary
                currentPoolData={currentPoolData}
                tierDataOfUser={tierDataOfUser}
                isShowPoolData={isShowPoolData}
                contractData={idoDetailFromContract}
                isAvailalbeOnCurrentNetwork={isAvailalbeOnCurrentNetwork}
              />
              {isShowPoolData && (
                <Deposit
                  isLoadingDataFromContract={isLoadingDataFromContract}
                  currentPoolData={currentPoolData}
                  tierDataOfUser={tierDataOfUser}
                  totalAmountUserSwapped={totalAmountUserSwapped}
                  userTotalCommitted={totalUserCommittedFromContract}
                  contractData={idoDetailFromContract}
                  selectedUserTier={selectedUserTier}
                  isAvailalbeOnCurrentNetwork={isAvailalbeOnCurrentNetwork}
                />
              )}
            </StyledFlex>
            {isShowPoolData && (
              <>
                <Heading as="h2" scale="lg" color="#D8D8D8" mb="14px">
                  Tier Infomation
                </Heading>
                <TierDetails
                  currentPoolData={currentPoolData}
                  selectedUserTier={selectedUserTier}
                  secondsUntilSnapshot={secondsUntilSnapshot}
                />
              </>
            )}
            <StyledFlex flexWrap="wrap">
              <ProjectDetailBox isShowPoolData={isShowPoolData}>
                <StyledHeading as="h2" scale="lg" color="#D8D8D8" mb="14px">
                  Project Detail
                </StyledHeading>
                <ProjectInfo currentPoolData={currentPoolData} />
              </ProjectDetailBox>
              {isShowPoolData && (
                <>
                  <PoolInfoBox mr="24px">
                    <StyledHeading as="h2" scale="lg" color="#D8D8D8">
                      Pool info
                    </StyledHeading>
                    <PoolInfo currentPoolData={currentPoolData} />
                  </PoolInfoBox>
                  <TokenInfoBox>
                    <StyledHeading as="h2" scale="lg" color="#D8D8D8">
                      Token info
                    </StyledHeading>
                    <TokenInfo currentPoolData={currentPoolData} />
                  </TokenInfoBox>
                </>
              )}
            </StyledFlex>
            <Heading as="h2" scale="lg" color="#D8D8D8" mb="14px">
              How to LuaStarts
            </Heading>
            <Steps selectedUserTier={selectedUserTier} />
          </>
        )}
      </Row>
    </Page>
  )
}

export default ProjectDetail
