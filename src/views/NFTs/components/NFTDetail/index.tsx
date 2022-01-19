import Page from 'components/layout/Page'
import { Card, Flex } from 'luastarter-uikits'
import React from 'react'
import styled from 'styled-components'
import CountDown from '../CountDown'
import DateStamp from '../DateStamp'
import NFTContentBox from './NFTContentBox'

const Row = styled.div`
  max-width: 1600px;
  padding-left: 24px;
  padding-right: 24px;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    padding-left: 0px;
    padding-right: 0px;
  } ;
`

const TimeSection = styled(Flex)``

const TimeBlock = styled(Card)`
  width: 30%;
  border-radius: 10px;
  height: 105px;
  min-width: 470px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  padding: 0 24px;
  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: unset;
  }
`

const NFTDetail = () => {
  return (
    <Page>
      <Row>
        <TimeSection alignItems="center" justifyContent="center">
          <TimeBlock>
            <DateStamp />
            <CountDown />
          </TimeBlock>
        </TimeSection>
        <NFTContentBox />
      </Row>
    </Page>
  )
}

export default NFTDetail
