import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUserNextTier } from 'state/profile'

import { Card, CardBody, Text, Flex, Image, Button, SecondaryMessage, Box, LinkExternal } from 'common-uikitstrungdao'
import { formatPoolTotalTierByChainID } from 'utils/formatPoolData'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { Tier } from 'state/types'
import ExpandableButtonComponent from '../ExpandableButton'

interface TierProps {
  data: IdoDetailInfo
  userTier: number
  disabledBuyMore: boolean
  nextTier: { [key: number]: Tier }
}

const ExpandingWrapper = styled(Box)<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
  margin-top: 14px;
`

const ImageContainer = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 14px;
`
const Divider = styled.div`
  background-color: #353535;
  height: 2px;
  margin: 14px auto;
  width: 100%;
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

const TierHeaderWrapper = styled(Flex)``

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
    description: 'You have to stake 5000 LUA or 500 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/earth.svg`,
    CTA: (lua) => (lua ? `${lua} LUA to JOIN IDO` : `LUA to JOIN IDO`),
    CTA2: (tomo) => (tomo ? `${tomo} TOMO to JOIN IDO` : `TOMO to JOIN IDO`),
  },
  '2': {
    name: 'Moon',
    description: 'You have to stake 25000 LUA or 2500 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/moon.svg`,
    CTA: (lua) => (lua ? `${lua} LUA to reach tier 2` : `LUA to fly to the Moon`),
    CTA2: (tomo) => (tomo ? `${tomo} TOMO to reach tier 2` : `TOMO to fly to the Moon`),
  },
  '3': {
    name: 'MARS',
    description: 'You have to stake 125000 LUA or 12500 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/mars.svg`,
    CTA: (lua) => (lua ? `${lua} LUA to reach tier 3` : `LUA to fly to the Moon`),
    CTA2: (tomo) => (tomo ? `${tomo} TOMO to reach tier 3` : `TOMO to fly to the Moon`),
  },
  '4': {
    name: 'Galaxy',
    description: 'You have to stake 250000 LUA or 25000 TOMO',
    icon: `${process.env.PUBLIC_URL}/images/galaxy.svg`,
    CTA: (lua) => (lua ? `${lua} LUA to reach tier 4` : `LUA to BREAK BORDER`),
    CTA2: (tomo) => (tomo ? `${tomo} TOMO to reach tier 4` : `TOMO to fly to the Moon`),
  },
}

// We have different layout for PC and Mobile/tablet
const TierCard: React.FC<TierProps> = ({
  data: { tier, totalAmountIDO, totalAmountPay, totalCommittedAmount, idoToken = {}, payToken = {} },
  userTier,
  nextTier,
  disabledBuyMore,
}) => {
  const [showExpandableSection, setShowExpandableSection] = useState(false)
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
            <Text color="#8B8B8B" fontSize="14px">
              {TIER_INFO[tier]?.description}
            </Text>
          </TierHeaderWrapper>
          <Flex justifyContent="space-between" flexDirection="column">
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Total {idoToken.symbol}&nbsp;</Text>
              <Text bold color="#C3C3C3">
                {totalAmountIDO} {idoToken.symbol}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Total raised</Text>
              <Text bold color="#C3C3C3">
                {totalAmountPay} {payToken.symbol}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Price</Text>
              <Text bold>
                {Math.round((10000 * totalAmountIDO) / totalAmountPay) / 10000} {idoToken.symbol}/{payToken.symbol}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="#8B8B8B">Total committed&nbsp;</Text>
              <Text bold>
                {totalCommittedAmount} {payToken.symbol}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Divider />
        <Box>
          {userTier === tier && (
            <Button width="100%" mt="4px" disabled={userTier + 2 === tier}>
              <Text bold color="#353535">
                Your Tier. GET READY!
              </Text>
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
            <>
              <ExpandableButtonComponent
                disabled={disabledBuyMore}
                onClick={() => setShowExpandableSection(!showExpandableSection)}
                expanded={showExpandableSection}
              />
              <ExpandingWrapper expanded={showExpandableSection}>
                <LinkExternal href="https://app.luaswap.org/#/swap">
                  {TIER_INFO[tier]?.CTA(nextTier[tier]?.addQuantityLua)}
                </LinkExternal>
                <LinkExternal href="https://app.luaswap.org/#/swap">
                  {TIER_INFO[tier]?.CTA2(nextTier[tier]?.addQuantityTomo)}
                </LinkExternal>
              </ExpandingWrapper>
            </>
          )}
        </Box>
      </CardBodyWrapper>
    </TierCardContainer>
  )
}

const TierDetails: React.FC<{
  currentPoolData: Pool
  selectedUserTier: number
  secondsUntilSnapshot: number
}> = ({ currentPoolData, secondsUntilSnapshot, selectedUserTier }) => {
  const userNextTier = useSelector(selectUserNextTier)
  const { index: tierData } = currentPoolData
  const nextTier = userNextTier.reduce((s: { [key: number]: Tier }, e: Tier) => {
    const tmps = s
    tmps[e.tier] = e
    return tmps
  }, {})

  const isPoolStarted = useMemo(() => {
    if (secondsUntilSnapshot <= 0) {
      return true
    }

    return false
  }, [secondsUntilSnapshot])

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
            return (
              <TierCard
                data={e}
                key={e.tier}
                userTier={selectedUserTier}
                nextTier={nextTier}
                disabledBuyMore={isPoolStarted}
              />
            )
          })}
        </Flex>
      </TierInformationWrapper>
      <SecondaryMessage>
        <Text color="#8B8B8B">
          If you dont have any LUA or TOMO in your wallet, you will be in Tier 0.
          <br />
          You can still buy more token by committing your funds. You will receive your fund if all the tokens are sold
          out in Tier 1, 2, 3, 4
        </Text>
      </SecondaryMessage>
    </>
  )
}

export default TierDetails
