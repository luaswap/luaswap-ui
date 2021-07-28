/* eslint-disable no-nested-ternary */
import React from 'react'
import { Text, Flex, Box } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { OpenPools } from 'state/types'
import PoolDetail from './PoolDetail'
import IdoLayout from './IdoLayout'
import PageLoading from './PageLoading'
import { Pool } from '../types'

const Row = styled.div`
  margin: 0 auto;
`
const PoolContainer = styled.div`
  border-radius: 24px;
  background-color: #282828;
  position: relative;
  width: 100%;
  padding: 0px 24px;
  margin-bottom: 14px;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-right: 14px;
    margin-bottom: 0px;
    width: calc(50% - 14px);
  }
`

const Star = styled(Box)`
  position: absolute;
  background-image: url('${process.env.PUBLIC_URL}/images/star.svg');
  background-size: contain;
  overflow: hidden;
`
const Star1 = styled(Star)`
  width: 10px;
  height: 10px;
  top: 10px;
  left: 40%;
`
const Star6 = styled(Star)`
  width: 10px;
  height: 10px;
  top: 60px;
  left: 38%;
`

const Star3 = styled(Star)`
  width: 15px;
  height: 15px;
  top: 20px;
  right: 30px;
`

const Star4 = styled(Star)`
  width: 10px;
  height: 10px;
  bottom: 20px;
  left: 10px;
`

const Star5 = styled(Star)`
  width: 20px;
  height: 20px;
  bottom: 10px;
  left: 20px;
`
interface CurrentIdoProps {
  openPools: OpenPools
  isLoadingState: boolean
}

const EmptyPool = () => {
  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <img src={`${process.env.PUBLIC_URL}/images/empty.svg`} alt="empty" />
      <Text color="#606060" textAlign="center">
        Switch to correct network to see pool&apos;s information
      </Text>
    </Flex>
  )
}

const CurrentIdo: React.FC<CurrentIdoProps> = ({ openPools: { openingPools, upcomingPools }, isLoadingState }) => {
  return (
    <IdoLayout>
      <Flex flexWrap="wrap">
        <PoolContainer>
          <Text fontSize="24px" textAlign="center" color="#F6F6F6" pt="24px" pb="24px" fontWeight="700">
            Opening Pools
          </Text>
          <Row>
            {isLoadingState ? (
              <PageLoading />
            ) : openingPools.length === 0 ? (
              <EmptyPool />
            ) : (
              openingPools.map((pool) => {
                return <PoolDetail pool={pool} />
              })
            )}
          </Row>
          <Star1 />
          <Star3 />
          <Star4 />
          <Star5 />
          <Star6 />
        </PoolContainer>
        <PoolContainer>
          <Text fontSize="24px" textAlign="center" color="#8B8B8B" pt="24px" pb="24px" fontWeight="700">
            Upcoming Pools
          </Text>
          <Row>
            {isLoadingState ? (
              <PageLoading />
            ) : (
              upcomingPools.map((pool) => {
                return <PoolDetail pool={pool} />
              })
            )}
          </Row>
        </PoolContainer>
      </Flex>
    </IdoLayout>
  )
}

export default CurrentIdo
