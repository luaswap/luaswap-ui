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
  min-height: 105px;
  min-width: 470px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: unset;
    flex-direction: column;
    padding: 10px 24px;
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
  }, [params.id])

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
              <>
                <TimeSection alignItems="center" justifyContent="center">
                  <TimeBlock>
                    <DateStamp NFTPoolDetail={NFTPoolDetail} />
                    {NFTPoolDetail.untilOpen || NFTPoolDetail.untilClose ? (
                      <CountDown NFTPoolDetail={NFTPoolDetail} />
                    ) : null}
                  </TimeBlock>
                </TimeSection>
                <NFTContentBox />
              </>
            )}
          </>
        )}
      </Row>
    </Page>
  )
}

export default NFTDetail
