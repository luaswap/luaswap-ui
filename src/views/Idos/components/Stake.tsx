import { Card } from 'luastarter-uikits'
import React, { Component } from 'react'
import styled from 'styled-components'
import IfoLayout from './IdoLayout'
import StakeTable from './StakeTable'
import StakeBox from './StakeTable/StakeBox'

const StakeContainer = styled(IfoLayout)`
  grid-template-columns: 5fr 2fr;

  @media (max-width: 1000px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const Stake: React.FC = () => {
  return (
    <StakeContainer>
      <StakeTable />
      <StakeBox />
    </StakeContainer>
  )
}

export default Stake
