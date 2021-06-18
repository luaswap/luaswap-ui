import React from 'react'
import { Flex, Heading, BaseLayout } from 'common-uikitstrungdao'
import styled from 'styled-components'
import Steps from './Steps'
import Deposit from './Deposit'
import PoolSummary from './PoolSummary'
import ProjectInfo from './ProjectInfo'
import PoolInformation from './PoolInformation'

const Row = styled.div`
  max-width: 1200px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 60px;
  margin: 0 auto;
`

const ProjectDetail = () => {
  return (
    <Row>
      <Flex mb="40px">
        <PoolSummary />
        <Deposit />
      </Flex>
      <Heading as="h2" scale="lg" color="secondary" mb="24px">
        Project Detail
      </Heading>
      <Flex mt="40px" mb="40px">
        <ProjectInfo />
        <PoolInformation />
      </Flex>
      <Steps />
    </Row>
  )
}

export default ProjectDetail
