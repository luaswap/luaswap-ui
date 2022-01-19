import Page from 'components/layout/Page'
import React from 'react'
import styled from 'styled-components'
import Hero from './components/Hero'
import NFTCard from './components/NFTCard'
import NFTsLayout from './components/NFTsLayout'

const NFTsContainer = styled(NFTsLayout)`
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1366px) {
    grid-template-columns: 1fr;
  }
`

const NFTs = () => {
  return (
    <Page>
      <Hero />
      <NFTsContainer>
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </NFTsContainer>
    </Page>
  )
}

export default NFTs
