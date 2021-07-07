import React, { useEffect, useState } from 'react'
import { Flex, Heading, Mesage } from 'common-uikitstrungdao'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import lodashGet from 'lodash/get'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import PageLoader from 'components/PageLoader'
import useDeepMemo from 'hooks/useDeepMemo'
import { fetchPool, selectCurrentPool, selectLoadingCurrentPool } from 'state/ido'
import { selectUserTier } from 'state/profile'
import { useAppDispatch } from 'state'

import Steps from './Steps'
import Deposit from './Deposit'
import PoolSummary from './PoolSummary'
import ProjectInfo from './ProjectInfo'
import PoolInformation from './PoolInformation'
import TierDetails from './TierDetails'
import useDataFromIdoContract from '../../hooks/useDataFromIdoContract'
import { getIdoDataBasedOnChainIdAndTier, getIdoSupportedNetwork } from '../helper'

const Row = styled.div`
  max-width: 1200px;
  padding-left: 24px;
  padding-right: 24px;
  margin: 0 auto;
`

const StyledFlex = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-wrap: nowrap;
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
  }, [id, dispatch])

  const tierDataOfUser = useDeepMemo(() => {
    const { index = [] } = currentPoolData
    // TODO: Should based on current chain ID and user's tier
    return getIdoDataBasedOnChainIdAndTier(index, chainId, 1)
  }, [currentPoolData, chainId, userTier])
  const [idoDetailFromContract, totalUserCommittedFromContract] = useDataFromIdoContract(
    tierDataOfUser.addressIdoContract,
    tierDataOfUser.index,
    lodashGet(currentPoolData, `index[${chainId}]`, []),
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
                IDO is available on {idoSupportedNetwork}, please switch to these networks to join the IDO
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
                contractData={idoDetailFromContract}
                userTotalCommitted={totalUserCommittedFromContract}
                isAvailalbeOnCurrentNetwork={isAvailalbeOnCurrentNetwork}
              />
            </StyledFlex>
            <Heading as="h2" scale="lg" mb="24px" mt="50px">
              Tier Infomation
            </Heading>
            <TierDetails currentPoolData={currentPoolData} />
            <Heading as="h2" scale="lg" mb="24px" mt="50px">
              Project Detail
            </Heading>
            <StyledFlex flexWrap="wrap">
              <ProjectInfo currentPoolData={currentPoolData} />
              <PoolInformation currentPoolData={currentPoolData} tierDataOfUser={tierDataOfUser} />
            </StyledFlex>
            <Steps />
          </>
        )}
      </Row>
    </Page>
  )
}

export default ProjectDetail
