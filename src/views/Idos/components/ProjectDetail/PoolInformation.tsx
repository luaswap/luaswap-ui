import React, { useState } from 'react'
import { TabMenu, Tab } from 'common-uikitstrungdao'
import styled from 'styled-components'

const Row = styled.div`
  width: 100%;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
  }
`

const PoolInformation = () => {
  const [index, setIndex] = useState(0)

  return (
    <Row>
      <TabMenu
        activeIndex={index}
        onItemClick={(idx) => setIndex(idx)}
        innerStyle={{
          width: '100%',
        }}
        wrapperStyle={{
          width: '100%',
        }}
      >
        <Tab
          style={{
            width: '100%',
          }}
        >
          Pool Information
        </Tab>
        <Tab
          style={{
            width: '100%',
          }}
        >
          Token Information
        </Tab>
      </TabMenu>
    </Row>
  )
}

export default PoolInformation
