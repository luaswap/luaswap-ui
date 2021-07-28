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
  margin-bottom: 40px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 24px;
  }
`

const StyledWrapper = styled(Flex)`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 300px;
  background-color: #282828;
  padding: 24px;
`

const LinkWrapper = styled(Flex)`
  border-bottom: 1px solid #353535;
  padding-bottom: 14px;
`

const LinkRef = styled(Flex)`
  padding-left: 14px;
  align-items: flex-start;
  width: 100%;
`

interface ProjectInfoProps {
  currentPoolData: Pool
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ currentPoolData }) => {
  const { projectDetail, links } = currentPoolData
  return (
    <ProjectInfoWrapper>
      <StyledWrapper flexDirection="column">
        <LinkWrapper flexWrap="wrap">
          {Array.isArray(links) &&
            links.map((item) => {
              return (
                <LinkRef>
                  <Link
                    href={item.link}
                    target="_blank"
                    style={{
                      wordBreak: 'break-all',
                    }}
                  >
                    {item.label}
                  </Link>
                </LinkRef>
              )
            })}
        </LinkWrapper>
        <Text
          mt="20px"
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {projectDetail}
        </Text>
      </StyledWrapper>
    </ProjectInfoWrapper>
  )
}

export default ProjectInfo
