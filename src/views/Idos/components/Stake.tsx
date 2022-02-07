import { Card, Text } from 'luastarter-uikits'
import React, { Component, useEffect, useMemo } from 'react'
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
  height: 300px;
`

const NoticeWrapText = styled(NoticeWrap)`
  height: auto;
  margin-bottom: 10px;
  justify-content: flex-start;
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

  const isOnRightNetWork = useMemo(() => {
    return chainId === 1 || chainId === 88
  }, [chainId])

  return (
    <>
      {account ? (
        <>
          {!isOnRightNetWork && (
            <NoticeWrapText>
              <Text fontSize="16px" color="red">
                Connect your wallet to LuaStarter & select TomoChain or Ethereum network.
              </Text>
            </NoticeWrapText>
          )}
          <StakeContainer>
            <StakeTable />
            <StakeBox isDisable={!isOnRightNetWork} />
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
