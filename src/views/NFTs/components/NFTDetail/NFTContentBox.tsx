import { Card } from 'luastarter-uikits'
import React, { useState } from 'react'
import styled from 'styled-components'
import TabDetailNFT from './TabDetailNFT'
import TabsListNFT from './TabsListNFT'

const Wrapper = styled(Card)`
  background: #353535;
  border-radius: 40px;
  margin-top: 24px;
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-gap: 50px;
  min-height: 480px;
`

const NFTContentBox = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Wrapper>
      <TabsListNFT activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <TabDetailNFT activeIndex={activeIndex} />
    </Wrapper>
  )
}

export default NFTContentBox
