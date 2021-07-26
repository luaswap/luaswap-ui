import React from 'react'
import { Flex, Button, Text, Box, Link } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { Pool } from 'views/Idos/types'

const ProjectInfoWrapper = styled(Box)`
  overflow: hidden;
  display: inline-block;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  height: 300px;
  background-color: #282828;
  margin-bottom: 40px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 24px;
  }
`

interface PoolInfoProps {
  currentPoolData: Pool
}

const PoolInfo: React.FC<PoolInfoProps> = ({ currentPoolData }) => {
  const { projectDetail, links } = currentPoolData
  return <ProjectInfoWrapper>Pool Info</ProjectInfoWrapper>
}

export default PoolInfo
