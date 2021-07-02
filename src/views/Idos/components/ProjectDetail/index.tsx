import React, { useEffect, useState } from 'react'
import { Flex, Heading } from 'common-uikitstrungdao'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import PageLoader from 'components/PageLoader'
import { mappingIdoResponse } from 'state/ido/fetchIdosData'
import { useLuaIdoContract } from 'hooks/useContract'
import useWeb3 from 'hooks/useWeb3'
import useDeepMemo from 'hooks/useDeepMemo'
import { IdoDetail } from 'state/types'
import { fetchPool, selectCurrentPool, selectLoadingCurrentPool } from 'state/ido'
import { selectUserTier } from 'state/profile'
import { useAppDispatch } from 'state'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useBlock } from 'state/hooks'

import Steps from './Steps'
import Deposit from './Deposit'
import PoolSummary from './PoolSummary'
import ProjectInfo from './ProjectInfo'
import PoolInformation from './PoolInformation'
import TierDetails from './TierDetails'
import { getIdoDataBasedOnChainIdAndTier } from '../helper'

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

const defaultIdoDetail = {
  claimAt: null,
  closeAt: null,
  creator: null,
  idoToken: null,
  maxAmountPay: null,
  minAmountPay: null,
  openAt: null,
  payToken: null,
  swappedAmountIDO: null,
  swappedAmountPay: null,
  totalAmountIDO: null,
  totalAmountPay: null,
  totalCommittedAmount: null,
}

interface ParamsType {
  id: string
}

const ProjectDetail = () => {
  const { chainId } = useWeb3React()
  const { id } = useParams<ParamsType>()
  const dispatch = useAppDispatch()
  const currentPoolData = useSelector(selectCurrentPool)
  const userTier = useSelector(selectUserTier)
  const isLoadingPool = useSelector(selectLoadingCurrentPool)

  useEffect(() => {
    if (id) {
      dispatch(fetchPool(id))
    }
  }, [id, dispatch])

  const idoData = useDeepMemo(() => {
    const { index } = currentPoolData
    // TODO: Should based on current chain ID and user's tier
    return getIdoDataBasedOnChainIdAndTier(index, '89', 1)
  }, [currentPoolData, chainId, userTier])

  return (
    <Page>
      <Row>
        {isLoadingPool ? (
          <PageLoader />
        ) : (
          <>
            {' '}
            <StyledFlex mb="40px" flexWrap="wrap">
              <PoolSummary currentPoolData={currentPoolData} idoData={idoData} />
              <Deposit currentPoolData={currentPoolData} idoData={idoData} />
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
              <PoolInformation currentPoolData={currentPoolData} idoData={idoData} />
            </StyledFlex>
            <Steps />
          </>
        )}
      </Row>
    </Page>
  )
}

export default ProjectDetail
