import React, { useEffect, useState } from 'react'
import { Flex, Heading, BaseLayout } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import { IdoDetail, mappingIdoResponse } from 'state/ido/fetchIdosData'
import { useLuaIdoContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'
import Steps from './Steps'
import Deposit from './Deposit'
import PoolSummary from './PoolSummary'
import ProjectInfo from './ProjectInfo'
import PoolInformation from './PoolInformation'

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

const ProjectDetail = () => {
  const { chainId, account } = useWeb3React()
  const [idoDetail, setIdoDetail] = useState<IdoDetail>(defaultIdoDetail)
  const [totalCommited, setTotalCommited] = useState<string>('0')
  const luaIdoContract = useLuaIdoContract(chainId)

  useEffect(() => {
    const fetchData = async () => {
      // const [idoDetalInfo, userCommitted] = await makeBatchRequest([
      //   luaIdoContract.methods
      //   .IDOs(0)
      //   .call,
      //   luaIdoContract.methods.userCommitedAmount(account, 0).call,
      // ])
      const idoDetailInfo = await luaIdoContract.methods.IDOs(0).call()
      setIdoDetail(mappingIdoResponse(idoDetailInfo))
      const commitedAmount = await luaIdoContract.methods.userCommitedAmount(account, 0).call()
      console.log(commitedAmount, 'commited? detail')
      setTotalCommited(commitedAmount)
    }

    fetchData()
  }, [luaIdoContract, account])

  return (
    <Page>
      <Row>
        <StyledFlex mb="40px" flexWrap="wrap">
          <PoolSummary idoDetail={idoDetail} />
          <Deposit maxAmount={idoDetail.maxAmountPay} totalCommited={totalCommited} />
        </StyledFlex>
        <Heading as="h2" scale="lg" mb="24px">
          Project Detail
        </Heading>
        <StyledFlex mt="40px" mb="40px" flexWrap="wrap">
          <ProjectInfo />
          <PoolInformation />
        </StyledFlex>
        <Steps />
      </Row>
    </Page>
  )
}

export default ProjectDetail
