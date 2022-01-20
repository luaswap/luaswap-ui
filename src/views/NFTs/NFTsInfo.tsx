import Page from 'components/layout/Page'
import { Flex, Spinner, Text } from 'luastarter-uikits'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoadingNFTPools, selectNFTPools } from 'state/nfts'
import { getNFTPools } from 'state/nfts/getNfts'
import styled from 'styled-components'
import Hero from './components/Hero'
import NFTCard from './components/NFTCard'
import NFTsLayout from './components/NFTsLayout'
import useGetNFTPools from './hook/useGetNFTPools'

const NFTsContainer = styled(NFTsLayout)`
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1366px) {
    grid-template-columns: 1fr;
  }
`

const SpinnerWrapper = styled(Flex)`
  min-height: 300px;
`

const NFTsInfo = () => {
  const { onGetNFTPools } = useGetNFTPools()
  const NFTPools = useSelector(selectNFTPools)
  const isLoadingNFTPools = useSelector(selectIsLoadingNFTPools)

  useEffect(() => {
    onGetNFTPools()
  }, [])
  return (
    <Page>
      <Hero />\
      {isLoadingNFTPools ? (
        <SpinnerWrapper justifyContent="center" alignItems="center">
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <NFTsContainer>
          {NFTPools.length < 1 ? (
            <SpinnerWrapper>
              <Text>No NFT Pools Data.</Text>
            </SpinnerWrapper>
          ) : (
            <>
              {NFTPools.map((NFTpool) => (
                <NFTCard NFTpool={NFTpool} key={NFTpool.id} />
              ))}
            </>
          )}
        </NFTsContainer>
      )}
    </Page>
  )
}

export default NFTsInfo
