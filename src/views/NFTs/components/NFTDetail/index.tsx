import Page from 'components/layout/Page'
import { Card, Flex, Spinner } from 'luastarter-uikits'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectIsLoadingNFTDetail, selectSelectedNFTPool } from 'state/nfts'
import { getNFTPoolDetail } from 'state/nfts/getNfts'
import styled from 'styled-components'
import useGetNFTPoolDetail from 'views/NFTs/hook/useGetNFTPoolDetail'
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

const WrapperSpinner = styled(Flex)`
  min-height: 300px;
`

const NFTDetail = () => {
  const params: { id: string } = useParams()
  const { onGetNFTPoolDetail } = useGetNFTPoolDetail()
  const isLoadingNFTDetail = useSelector(selectIsLoadingNFTDetail)
  const NFTPoolDetail = useSelector(selectSelectedNFTPool)

  useEffect(() => {
    if (params.id) {
      onGetNFTPoolDetail(params.id)
    }
  }, [params])

  return (
    <Page>
      <Row>
        {isLoadingNFTDetail ? (
          <WrapperSpinner justifyContent="center" alignItems="center">
            <Spinner />
          </WrapperSpinner>
        ) : (
          <>
            {NFTPoolDetail && (
              <TimeSection alignItems="center" justifyContent="center">
                <TimeBlock>
                  <DateStamp NFTPoolDetail={NFTPoolDetail} />
                  <CountDown NFTPoolDetail={NFTPoolDetail} />
                </TimeBlock>
              </TimeSection>
            )}
            <NFTContentBox />
          </>
        )}
      </Row>
    </Page>
  )
}

export default NFTDetail
