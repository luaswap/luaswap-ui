import React from 'react'
import styled from 'styled-components'
import IdoLayout from './IdoLayout'
import PoolDetail from './PoolDetail'

const Row = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const PastIdo = () => {
  return (
    <IdoLayout>
      <Row>
        <PoolDetail status="Closed" />
      </Row>
    </IdoLayout>
  )
}

export default PastIdo
