import React from 'react'
import { Flex, Button, Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { Pool } from 'views/Idos/types'

const StyledWrapper = styled(Flex)`
  width: 100%;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 60%;
    margin-right: 24px;
  }
`

interface ProjectInfoProps {
  currentPoolData: Pool
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ currentPoolData }) => {
  const { projectDetail, links } = currentPoolData

  return (
    <StyledWrapper flexDirection="column">
      <Flex>
        {Array.isArray(links) &&
          links.map((item) => {
            return (
              <Button mr="10px" variant="tertiary" as="a" href={item.link} target="__blank">
                {item.label}
              </Button>
            )
          })}
      </Flex>
      <Text mt="20px">{projectDetail}</Text>
    </StyledWrapper>
  )
}

export default ProjectInfo
