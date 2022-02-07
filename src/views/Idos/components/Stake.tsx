import { Card, Text } from 'luastarter-uikits'
import React, { Component, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { selectTokensLock } from 'state/stake'
import { useSelector } from 'react-redux'
import IfoLayout from './IdoLayout'
import StakeTable from './StakeTable'
import StakeBox from './StakeTable/StakeBox'
import useGetTokensLock from '../hooks/useGetTokensLock'

const StakeContainer = styled(IfoLayout)`
  grid-template-columns: 5fr 2fr;

  @media (max-width: 1000px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const NoticeWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
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
  const { onGetTokensLock } = useGetTokensLock()

  useEffect(() => {
    if (account) {
      onGetTokensLock()
    }
  }, [onGetTokensLock, account])
  const tokensLock = useSelector(selectTokensLock)

  console.log(tokensLock)

  return (
    <>
      {account ? (
        <>
          {!(chainId === 1 || chainId === 88) && (
            <NoticeWrap>
              <Text fontSize="16px" color="red">
                Select TomoChain or Ethereum network to stake.
              </Text>
            </NoticeWrap>
          )}
          <StakeContainer>
            <StakeTable />
            <StakeBox />
          </StakeContainer>
        </>
      ) : (
        <NoticeWrap>
          <Text fontSize="16px" color="red">
            Connect your wallet to LuaStarter & select TomoChain or Ethereum network.
          </Text>
        </NoticeWrap>
      )}
    </>
  )
}

export default Stake
