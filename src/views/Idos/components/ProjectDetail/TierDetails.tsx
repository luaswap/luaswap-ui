import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUserNextTier, selectUserTier } from 'state/profile'

import { Card, CardBody, Text, Flex, Image, Button, SecondaryMessage, Box } from 'common-uikitstrungdao'
import { formatPoolTotalTierByChainID } from 'utils/formatPoolData'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { Tier } from 'state/types'

interface TierProps {
  data: IdoDetailInfo
  userTier: number
  nextTier: { [key: number]: Tier }
}

const ImageContainer = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 14px;
`

const TierContainer = styled(Text)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  background: #353535;
  border-radius: 24px;
  color: #8b8b8b;
`

const TierHeaderWrapper = styled(Flex)`
  border-bottom: 2px solid #353535;
  padding-bottom: 14px;
`

const TierInformationWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #282828;
  padding: 24px;
  margin-bottom: 40px;
  width: 100%;
`

const CardBodyWrapper = styled(CardBody)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const TierCardContainer = styled(Card)`
  width: 100%;
  margin-bottom: 15px;
  background-color: #1a1a1a;

  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(25% - 16px);
    margin-bottom: 0;
    &:not(:last-of-type) {
      margin-right: 20px;
    }
  }
`

const TIER_INFO = {
  '1': {
    name: 'Earth',
    description: 'Staking requirement 5000 LUA or 500 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/earth.svg`,
    CTA: (lua) => (lua ? `Buy ${lua} LUA to JOIN IDO` : `Buy LUA to JOIN IDO`),
  },
  '2': {
    name: 'Moon',
    description: 'Staking requirement 25000 LUA or 2500 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/moon.svg`,
    CTA: (lua) => (lua ? `Buy more ${lua} LUA to fly to the Moon` : `Buy more LUA to fly to the Moon`),
  },
  '3': {
    name: 'MARS',
    description: 'Staking requirement 125000 LUA or 12500 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/moon.svg`,
    CTA: (lua) => (lua ? `Buy more ${lua} LUA to fly to the Moon` : `Buy more LUA to fly to the Moon`),
  },
  '4': {
    name: 'Galaxy',
    description: 'Staking requirement 250000 LUA or 25000 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/galaxy.svg`,
    CTA: (lua) => (lua ? `Buy more ${lua} LUA to BREAK BORDER` : `Buy more LUA to BREAK BORDER`),
  },
}

// We have different layout for PC and Mobile/tablet
const TierCard: React.FC<TierProps> = ({
  data: { tier, totalAmountIDO, totalAmountPay, totalCommittedAmount, idoToken = {}, payToken = {} },
  userTier,
  nextTier,
}) => {
  if (tier === 0) {
    return null
  }

  return (
    <TierCardContainer>
      <CardBodyWrapper>
        <Box>
          <TierHeaderWrapper mb="15px" alignItems="flex-start">
            <ImageContainer src={TIER_INFO[tier]?.icon} alt="img" />
            <Flex alignItems="flex-start" flexDirection="column">
              <Flex alignItems="center" flexDirection="row">
                <Text fontSize="20px" bold mr="8px">
                  {TIER_INFO[tier]?.name}
                </Text>
                <TierContainer fontSize="14px" bold>
                  Tier {tier}
                </TierContainer>
              </Flex>
              <SecondaryMessage>
                <Text color="#8B8B8B" fontSize="14px">
                  {TIER_INFO[tier]?.description}
                </Text>
              </SecondaryMessage>
            </Flex>
          </TierHeaderWrapper>
          <Flex justifyContent="space-between">
            <Flex flexDirection="row" alignItems="flex-start">
              <Text color="#8B8B8B">Total {idoToken.symbol}:&nbsp;</Text>
              <Text bold color="#C3C3C3">
                {totalAmountIDO} {idoToken.symbol}
              </Text>
            </Flex>
            <Flex flexDirection="row" alignItems="flex-start">
              <Text color="#8B8B8B">Funds to raise:&nbsp;</Text>
              <Text bold color="#C3C3C3">
                {totalAmountPay} {payToken.symbol}
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Flex flexDirection="row" alignItems="flex-start">
              <Text color="#8B8B8B">Price per:{idoToken.symbol}&nbsp;</Text>
              <Text bold>
                {Math.round((10000 * totalAmountIDO) / totalAmountPay) / 10000} {idoToken.symbol}/{payToken.symbol}
              </Text>
            </Flex>
            <Flex flexDirection="row" alignItems="flex-start">
              <Text color="#8B8B8B">Total committed:&nbsp;</Text>
              <Text bold>
                {totalCommittedAmount} {payToken.symbol}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box>
          {userTier === tier && (
            <Button width="100%" mt="30px" disabled={userTier + 2 === tier}>
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

          {userTier < tier && (
            <Button
              width="100%"
              mt="30px"
              variant="primary"
              style={{ textAlign: 'center' }}
              as="a"
              href="https://app.luaswap.org/#/swap"
              target="__blank"
            >
              {TIER_INFO[tier]?.CTA(nextTier[tier]?.addQuantityLua)}
            </Button>
          )}
        </Box>
      </CardBodyWrapper>
    </TierCardContainer>
  )
}

const TierCardMobile: React.FC<TierProps> = ({
  data: { tier, totalAmountIDO, totalAmountPay, totalCommittedAmount, idoToken = {}, payToken = {} },
  userTier,
  nextTier,
}) => {
  if (tier === 0) {
    return null
  }

  return (
    <TierCardContainer>
      <CardBodyWrapper>
        <Box>
          <TierHeaderWrapper mb="15px" flexDirection="column">
            <Flex alignItems="center" mb="14px">
              <ImageContainer src={TIER_INFO[tier]?.icon} alt="img" />
              <Flex alignItems="flex-start" flexDirection="column">
                <Text fontSize="20px" bold mr="8px">
                  {TIER_INFO[tier]?.name}
                </Text>
                <TierContainer fontSize="14px" bold>
                  Tier {tier}
                </TierContainer>
              </Flex>
            </Flex>
            <SecondaryMessage>
              <Text color="#8B8B8B" fontSize="14px">
                {TIER_INFO[tier]?.description}
              </Text>
            </SecondaryMessage>
          </TierHeaderWrapper>
          <Flex justifyContent="space-between" flexDirection="column">
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Total {idoToken.symbol}:&nbsp;</Text>
              <Text bold color="#C3C3C3">
                {totalAmountIDO} {idoToken.symbol}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Funds to raise:&nbsp;</Text>
              <Text bold color="#C3C3C3">
                {totalAmountPay} {payToken.symbol}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Price per:{idoToken.symbol}&nbsp;</Text>
              <Text bold>
                {Math.round((10000 * totalAmountIDO) / totalAmountPay) / 10000} {idoToken.symbol}/{payToken.symbol}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Total committed:&nbsp;</Text>
              <Text bold>
                {totalCommittedAmount} {payToken.symbol}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box>
          {userTier === tier && (
            <Button width="100%" mt="30px" disabled={userTier + 2 === tier}>
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

          {userTier < tier && (
            <Button
              width="100%"
              mt="30px"
              variant="primary"
              style={{ textAlign: 'center' }}
              as="a"
              href="https://app.luaswap.org/#/swap"
              target="__blank"
            >
              {TIER_INFO[tier]?.CTA(nextTier[tier]?.addQuantityLua)}
            </Button>
          )}
        </Box>
      </CardBodyWrapper>
    </TierCardContainer>
  )
}

const TierDetails: React.FC<{
  currentPoolData: Pool
}> = ({ currentPoolData }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const userTier = useSelector(selectUserTier)
  const userNextTier = useSelector(selectUserNextTier)
  const { index: tierData } = currentPoolData
  const nextTier = userNextTier.reduce((s: { [key: number]: Tier }, e: Tier) => {
    const tmps = s
    tmps[e.tier] = e
    return tmps
  }, {})

  const tiersss: IdoDetailInfo[] = useMemo(() => {
    if (tierData) {
      const chainIds = Object.keys(tierData)
      let result: IdoDetailInfo[] = tierData[chainIds[0]]
      for (let i = 1; i < chainIds.length; i++) {
        result = formatPoolTotalTierByChainID(result, tierData[chainIds[i]])
      }

      return result
    }
    return []
  }, [tierData])
  return (
    <>
      <TierInformationWrapper>
        <Flex flexWrap="wrap" justifyContent="space-between">
          {tiersss.map((e: IdoDetailInfo, i: number) => {
            console.log(nextTier, 'next tier ?')
            return isMobile ? (
              <TierCardMobile data={e} key={e.tier} userTier={userTier} nextTier={nextTier} />
            ) : (
              <TierCard data={e} key={e.tier} userTier={userTier} nextTier={nextTier} />
            )
          })}
        </Flex>
      </TierInformationWrapper>
      <SecondaryMessage>
        <Text color="#8B8B8B">
          If you dont have any LUA or TOMO in your wallet, you will be in Tier 0.
          <br />
          You still have a chance to buy token by commit your fund. You will receive your fund if token sold out for
          Tier 1, 2, 3, 4
        </Text>
      </SecondaryMessage>
    </>
  )
}

export default TierDetails
