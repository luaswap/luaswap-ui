import React, { useEffect, useState, useMemo } from 'react'
import { Flex, Heading, Mesage, Text, Box } from 'common-uikitstrungdao'
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
import { getIdoDataBasedOnChainIdAndTier, getIdoSupportedNetwork } from '../helper'

const Row = styled.div`
  max-width: 1600px;
  padding-left: 24px;
  padding-right: 24px;
  margin: 0 auto;
`

const StyledFlex = styled(Flex)`
  @media screen and (min-width: 1800px) {
    flex-wrap: nowrap;
  }
`
const ProjectDetailBox = styled(Box)`
  width: 100%;
  margin-right: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 24px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: calc(70% - 48px);
  }
`

const PoolInfoBox = styled(Box)`
  width: 100%;
  margin-right: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: calc(50% - 12px);
    margin-right: 24px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 15%;
    margin-right: 24px;
  }
`

const TokenInfoBox = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: calc(50% - 12px);
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 15%;
  }
`

const StyledHeading = styled(Heading)`
  margin-bottom: 14px;
  margin-top: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 40px;
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
  const secondsUntilSnapshot = useSecondsUntilCurrent(currentPoolData.snapshootAt)
  const idoSupportedNetwork = getIdoSupportedNetwork(currentPoolData.index)
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
    if (secondsUntilSnapshot <= 0) {
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
    if (secondsUntilSnapshot <= 0) {
      return userTierAfterSnapshot
    }

    return userTier
  }, [secondsUntilSnapshot, userTier, userTierAfterSnapshot])

  const tierDataOfUser = useDeepMemo(() => {
    const { index = [] } = currentPoolData
    return getIdoDataBasedOnChainIdAndTier(index, chainId, selectedUserTier)
  }, [currentPoolData, chainId, selectedUserTier])

  const [_dataFromContract, totalUserCommittedFromContract, totalAmountUserSwapped] = useDataFromIdoContract(
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
            {!isAvailalbeOnCurrentNetwork && account && (
              <Mesage variant="warning" mb="16px">
                <Text>IDO is available on {idoSupportedNetwork}, please switch to these networks to join the IDO</Text>
              </Mesage>
            )}
            <StyledFlex mb="40px" flexWrap="wrap">
              <PoolSummary
                currentPoolData={currentPoolData}
                tierDataOfUser={tierDataOfUser}
                contractData={idoDetailFromContract}
                isAvailalbeOnCurrentNetwork={isAvailalbeOnCurrentNetwork}
              />
              <Deposit
                currentPoolData={currentPoolData}
                tierDataOfUser={tierDataOfUser}
                totalAmountUserSwapped={totalAmountUserSwapped}
                userTotalCommitted={totalUserCommittedFromContract}
                contractData={idoDetailFromContract}
                selectedUserTier={selectedUserTier}
                isAvailalbeOnCurrentNetwork={isAvailalbeOnCurrentNetwork}
              />
            </StyledFlex>
            <Heading as="h2" scale="lg" color="#D8D8D8" mb="14px">
              Tier Infomation
            </Heading>
            <TierDetails
              currentPoolData={currentPoolData}
              selectedUserTier={selectedUserTier}
              secondsUntilSnapshot={secondsUntilSnapshot}
            />
            <StyledFlex flexWrap="wrap">
              <ProjectDetailBox mr="24px">
                <StyledHeading as="h2" scale="lg" color="#D8D8D8" mb="14px">
                  Project Detail
                </StyledHeading>
                <ProjectInfo currentPoolData={currentPoolData} />
              </ProjectDetailBox>
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
