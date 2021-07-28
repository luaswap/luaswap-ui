import React from 'react'
import { Flex, Button, Text, Box, Link } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { Pool } from 'views/Idos/types'

const ProjectInfoWrapper = styled(Box)`
  height: 300px;
  overflow-y: scroll;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-bottom: 0px;
  padding: 24px;
  background-color: #282828;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 24px;
    margin-bottom: 40px;
  }
`

const LinkWrapper = styled(Flex)`
  border-bottom: 1px solid #353535;
  padding-bottom: 14px;
`

const LinkRef = styled(Flex)`
  padding-left: 14px;
  padding-right: 14px;
  align-items: flex-start;
  ${({ theme }) => theme.mediaQueries.sm} {
    border-right: none;
  }

  &:not(:last-of-type) {
    border-right: 1px solid #353535;
  }
`

interface ProjectInfoProps {
  currentPoolData: Pool
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ currentPoolData }) => {
  const { projectDetail, links } = currentPoolData
  return (
    <ProjectInfoWrapper>
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
    </ProjectInfoWrapper>
  )
}

export default ProjectInfo
