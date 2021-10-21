/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'luastarter-uikits'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { fetchClosedPools, selectClosedPools, selectLoadingClosedPools } from 'state/ido'
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

const PastIdo: React.FC = () => {
  const dispatch = useAppDispatch()
  const closedPools = useSelector(selectClosedPools)
  const isLoadingClosedPool = useSelector(selectLoadingClosedPools)

  useEffect(() => {
    dispatch(fetchClosedPools())
  }, [dispatch])

  if (closedPools.length === 0 && !isLoadingClosedPool) {
    return <EmptyPool />
  }

  return (
    <PoolContainer>
      {isLoadingClosedPool ? (
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
