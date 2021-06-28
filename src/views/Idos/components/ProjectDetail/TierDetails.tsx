import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUserTier } from 'state/profile'

import {
  Card,
  CardBody,
  CardRibbon,
  Text,
  Link,
  Flex,
  TwitterIcon,
  MediumIcon,
  WorldIcon,
  TelegramIcon,
  Progress,
  Image,
  Button,
} from 'common-uikitstrungdao'
import { selectOpenPools, selectPool } from 'state/ido'
import { formatPoolDetail, formatPoolTotalTierByChainID } from 'utils/formatPoolData'
import { IdoDetailInfo } from 'views/Idos/types'

const ImageContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #e9e9e9;
  overflow: hidden;
  margin-right: 10px;
`

const TierCard = styled(Card)`
  width: 100%;
  margin-bottom: 15px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(33.33% - 16px);
    margin-bottom: 0;
  }
`

const TIER_INFO = {
  '1': {
    name: 'Earth',
    description: 'For every user, who holds less than 100 LUA or 100 TOMO',
    icon: 'https://image.flaticon.com/icons/png/512/921/921490.png',
    CTA: 'Buy 100 LUA to play with me on ground',
  },
  '2': {
    name: 'Moon',
    description: 'For every user, who holds from 100 LUA and 10.000 LUA',
    icon: 'https://image.flaticon.com/icons/png/512/740/740860.png',
    CTA: 'Buy more 1000 LUA to fly to the Moon',
  },
  '3': {
    name: 'Galaxy',
    description: 'For every user, who holds more than than 10.000 LUA',
    icon: 'https://image.flaticon.com/icons/png/512/3919/3919942.png',
    CTA: 'Buy 10.000 LUA to BREAK BORDER TOGETHER',
  },
}

const TierDetails: React.FC<{
  index: string
}> = ({ index }) => {
  const userTier = useSelector(selectUserTier)

  console.log(userTier)

  const pool = useSelector(selectPool(index))

  const tiersss: IdoDetailInfo[] = useMemo(() => {
    if (pool) {
      const chainIds = Object.keys(pool.index)
      let result: IdoDetailInfo[] = pool.index[chainIds[0]]
      for (let i = 1; i < chainIds.length; i++) {
        result = formatPoolTotalTierByChainID(result, pool.index[chainIds[i]])
      }

      return result
    }
    return []
  }, [pool])

  interface TierProps {
    data: IdoDetailInfo
  }
  const Tier: React.FC<TierProps> = ({
    data: { tier, totalAmountIDO, totalAmountPay, totalCommittedAmount, idoToken, payToken },
  }) => (
    <TierCard>
      <CardBody style={{ height: '400px' }}>
        <Flex mb="15px" alignItems="center">
          <ImageContainer>
            <Image src={TIER_INFO[tier].icon} alt="img" width={60} height={60} />
          </ImageContainer>
          <div>
            <Text fontSize="24px" bold>
              {TIER_INFO[tier].name}
            </Text>
            <Text fontSize="15px" bold>
              Tier {tier}
            </Text>
          </div>
        </Flex>
        <Text mb="20px">{TIER_INFO[tier].description}</Text>
        <Flex justifyContent="space-between">
          <Text>Total {idoToken.symbol}</Text>
          <Text bold>
            {totalAmountIDO} {idoToken.symbol}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Funds to raise</Text>
          <Text bold>
            {totalAmountPay} {payToken.symbol}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Price per {idoToken.symbol}</Text>
          <Text bold>
            {Math.round((10000 * totalAmountIDO) / totalAmountPay) / 10000} {idoToken.symbol}/{payToken.symbol}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Total committed</Text>
          <Text bold>
            {totalCommittedAmount} {payToken.symbol}
          </Text>
        </Flex>
        {userTier + 2 === parseInt(tier) && (
          <Button width="100%" mt="30px" disabled={userTier + 2 === parseInt(tier)}>
            <Text bold>Your Tier. GET READY!</Text>
            <Image
              src="https://image.flaticon.com/icons/png/512/1067/1067357.png"
              alt="img"
              width={40}
              height={40}
              ml="20px"
            />
          </Button>
        )}
        {userTier + 2 < parseInt(tier) && (
          <Button width="100%" mt="30px" variant="subtle">
            {TIER_INFO[tier].CTA}
          </Button>
        )}
      </CardBody>
    </TierCard>
  )

  return (
    <Flex flexWrap="wrap" justifyContent="space-between">
      {tiersss.map((e: IdoDetailInfo, i: number) => (
        <Tier data={e} key={e.tier} />
      ))}
    </Flex>
  )
}

export default TierDetails
