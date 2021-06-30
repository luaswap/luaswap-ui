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
import { IdoDetail } from 'state/types'
import { fetchPool, selectCurrentPool, selectLoadingCurrentPool } from 'state/ido'
import { useAppDispatch } from 'state'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useBlock } from 'state/hooks'

import Steps from './Steps'
import Deposit from './Deposit'
import PoolSummary from './PoolSummary'
import ProjectInfo from './ProjectInfo'
import PoolInformation from './PoolInformation'
import TierDetails from './TierDetails'

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
  const { chainId, account } = useWeb3React()
  const web3 = useWeb3()
  const [idoDetail, setIdoDetail] = useState<IdoDetail>(defaultIdoDetail)
  const [loading, setLoading] = useState(true)
  const { id } = useParams<ParamsType>()
  const dispatch = useAppDispatch()
  const [totalCommited, setTotalCommited] = useState<string>('0')
  const luaIdoContract = useLuaIdoContract(chainId)
  const currentPoolData = useSelector(selectCurrentPool)
  const isLoadingPool = useSelector(selectLoadingCurrentPool)
  const { currentBlock } = useBlock()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractIdoDetail = await luaIdoContract.methods.IDOs(0).call()
        const commitedAmount = await luaIdoContract.methods.userCommitedAmount(account, 0).call()
        setIdoDetail(mappingIdoResponse(contractIdoDetail))
        setTotalCommited(getFullDisplayBalance(commitedAmount))
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    if (account) {
      fetchData()
    }
  }, [luaIdoContract, account, currentBlock, web3, id])

  useEffect(() => {
    if (id) {
      dispatch(fetchPool(id))
    }
  }, [id, dispatch])

  return (
    <Page>
      <Row>
        {/* When we finish loading data from contract + data from API */}
        {loading || isLoadingPool ? (
          <PageLoader />
        ) : (
          <>
            {' '}
            <StyledFlex mb="40px" flexWrap="wrap">
              <PoolSummary idoDetail={idoDetail} currentPoolData={currentPoolData} />
              <Deposit idoDetail={idoDetail} totalCommited={totalCommited} currentPoolData={currentPoolData} />
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
              <PoolInformation />
            </StyledFlex>
            <Steps />
          </>
        )}
      </Row>
    </Page>
  )
}

export default ProjectDetail
