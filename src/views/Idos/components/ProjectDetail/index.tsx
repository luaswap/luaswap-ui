import React, { useEffect, useState } from 'react'
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
import { useAppDispatch } from 'state'

import Steps from './Steps'
import Deposit from './Deposit'
import PoolSummary from './PoolSummary'
import ProjectInfo from './ProjectInfo'
import PoolInfo from './PoolInfo'
import TokenInfo from './TokenInfo'
import PoolInformation from './PoolInformation'
import TierDetails from './TierDetails'
import useDataFromIdoContract from '../../hooks/useDataFromIdoContract'
import { getIdoDataBasedOnChainIdAndTier, getIdoSupportedNetwork } from '../helper'

const Row = styled.div`
  max-width: 1600px;
  padding-left: 24px;
  padding-right: 24px;
  margin: 0 auto;
`

const StyledFlex = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-wrap: nowrap;
  }
`
const ProjectDetailBox = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 65%;
  }
`

const PoolInfoBox = styled(Box)`
  width: 45%;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 15%;
  }
`

const TokenInfoBox = styled(Box)`
  width: 45%;
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
  const [loading, setLoading] = useState(true)
  const { id } = useParams<ParamsType>()
  const dispatch = useAppDispatch()
  const currentPoolData = useSelector(selectCurrentPool)
  const userTier = useSelector(selectUserTier)
  const isLoadingPool = useSelector(selectLoadingCurrentPool)
  const idoSupportedNetwork = getIdoSupportedNetwork(currentPoolData.index)

  useEffect(() => {
    if (id) {
      dispatch(fetchPool(id))
      setLoading(false)
    }

    return () => {
      dispatch(setDefaultCurrentPool())
    }
  }, [id, dispatch])

  const tierDataOfUser = useDeepMemo(() => {
    const { index = [] } = currentPoolData
    return getIdoDataBasedOnChainIdAndTier(index, chainId, userTier)
  }, [currentPoolData, chainId, userTier])

  const [idoDetailFromContract, totalUserCommittedFromContract, totalAmountUserSwapped] = useDataFromIdoContract(
    tierDataOfUser.addressIdoContract,
    tierDataOfUser.index,
    currentPoolData.index,
  )

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
        {loading || isLoadingPool ? (
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
                isAvailalbeOnCurrentNetwork={isAvailalbeOnCurrentNetwork}
              />
            </StyledFlex>
            <Heading as="h2" scale="lg" color="#D8D8D8" mb="14px">
              Tier Infomation
            </Heading>
            <TierDetails currentPoolData={currentPoolData} />
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
            <Steps />
          </>
        )}
      </Row>
    </Page>
  )
}

export default ProjectDetail
