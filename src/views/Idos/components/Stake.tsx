import { Card, Text } from 'luastarter-uikits'
import React, { Component } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { selectTokensLock } from 'state/stake'
import { useSelector } from 'react-redux'
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

const NoticeWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`

const StakeContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StakeBoxNoDataCase = styled.div`
  width: 30%;

  @media (max-width: 1000px) {
    width: 50%;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`

const Stake: React.FC = () => {
  const { account, chainId } = useWeb3React()
  const tokensLock = useSelector(selectTokensLock)
  return (
    <>
      {account ? (
        <>
          {chainId === 1 || chainId === 88 ? (
            <>
              {tokensLock.length > 0 ? (
                <StakeContainer>
                  <StakeTable />
                  <StakeBox />
                </StakeContainer>
              ) : (
                <StakeContainerCenter>
                  <StakeBoxNoDataCase>
                    <StakeBox />
                  </StakeBoxNoDataCase>
                </StakeContainerCenter>
              )}
            </>
          ) : (
            <NoticeWrap>
              <Text fontSize="16px">You need to select Tomochain Mainnet or Ethereum network.</Text>
            </NoticeWrap>
          )}
        </>
      ) : (
        <NoticeWrap>
          <Text fontSize="16px">You need to connect your wallet and select Tomochain Mainnet or Ethereum network.</Text>
        </NoticeWrap>
      )}
    </>
  )
}

export default Stake
