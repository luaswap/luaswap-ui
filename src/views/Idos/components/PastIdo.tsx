/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'luastarter-uikits'
import { Pool } from '../types'
import IdoLayout from './IdoLayout'
import PoolDetail from './PoolDetail'
import PageLoading from './PageLoading'

const PoolContainer = styled(IdoLayout)`
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1366px) {
    grid-template-columns: 1fr;
  }
`
const CardWrapper = styled(Flex)`
  border-radius: 24px;
  background-color: #282828;
  width: 50%;
  padding: 48px 0px;
  margin: 0 auto;

  @media (max-width: 1366px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`

interface PastIdoPools {
  closedPools: Pool[]
  isLoadingState: boolean
}

const EmptyPool = () => {
  return (
    <CardWrapper alignItems="center" justifyContent="center" flexDirection="column">
      <img src={`${process.env.PUBLIC_URL}/images/empty.svg`} alt="empty" />
      <Text color="#606060" textAlign="center">
        No Data
      </Text>
    </CardWrapper>
  )
}

const PastIdo: React.FC<PastIdoPools> = ({ closedPools, isLoadingState }) => {
  if (closedPools.length === 0 && !isLoadingState) {
    return <EmptyPool />
  }

  return (
    <PoolContainer>
      {isLoadingState ? (
        <PageLoading />
      ) : (
        <>
          {closedPools.map((pool) => {
            return <PoolDetail pool={pool} />
          })}
        </>
      )}
    </PoolContainer>
  )
}

export default PastIdo
