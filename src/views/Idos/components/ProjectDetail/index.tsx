import React from 'react'
import { Flex, Heading, BaseLayout } from 'common-uikitstrungdao'
import styled from 'styled-components'
import Page from 'components/layout/Page'
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

const ProjectDetail = () => {
  return (
    <Page>
      <Row>
        <StyledFlex mb="40px" flexWrap="wrap">
          <PoolSummary />
          <Deposit />
        </StyledFlex>
        <Heading as="h2" scale="lg" color="secondary" mb="24px">
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
