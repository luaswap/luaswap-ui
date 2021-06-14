import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { provider as ProviderType } from 'web3-core'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap/uikit'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL, NUMBER_BLOCKS_PER_YEAR } from 'config'
import { IsTomoChain } from 'utils/wallet'
import { getBalanceNumber } from 'utils/formatBalance'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'

export interface FarmWithStakedValue extends Farm {
  apr?: number
}

const AccentGradient = keyframes`  
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent = styled.div`
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary})`};
  background-size: 400% 400%;
  animation: ${AccentGradient} 2s linear infinite;
  border-radius: 32px;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -3px;
  left: -1px;
  z-index: -1;
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: ${({ theme, isPromotedFarm }) => (isPromotedFarm ? '31px' : theme.radii.card)};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  provider?: ProviderType
  account?: string
  luaPrice?: BigNumber
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, account, luaPrice }) => {
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const ID = chainId === 88 ? 88 : 1
  const isTomo = IsTomoChain(ID)
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  // const newReward = useNewRewards(farm.pid + 1)
  const newReward = farm.reward ? new BigNumber(farm.reward) : new BigNumber(0)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const farmImages = farm.lpSymbol.split('-')

  const totalValueFormatted = farm.usdValue ? `$${parseFloat(farm.usdValue.toFixed(0)).toLocaleString('en-US')}` : '-'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = 'LUA'

  // const farmAPR = farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  const addLiquidityUrl = farm.addLiquidityLink
  const pairLink = farm.pairLink
  const lpAddress = farm.lpAddresses[chainId]
  const isPromotedFarm = farm.token.symbol === 'CAKE'

  return (
    <FCard isPromotedFarm={isPromotedFarm}>
      {isPromotedFarm && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        farmImages={farmImages}
        tokenSymbol={farm.token.symbol}
      />
      {!removed && !isTomo && (
        <>
          <Flex justifyContent="space-between" alignItems="center">
            <Text>{t('APR')}:</Text>
            <Text bold style={{ display: 'flex', alignItems: 'center' }}>
              {newReward && farm && luaPrice && farm.usdValue && farm.totalToken2Value && farm.poolWeight ? (
                <>
                  {/* <ApyButton lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} cakePrice={cakePrice} apr={farm.apr} /> */}
                  {parseFloat(
                    luaPrice
                      .times(NUMBER_BLOCKS_PER_YEAR[ID])
                      .times(newReward.div(10 ** 18))
                      .div(farm.usdValue)
                      .div(10 ** 8)
                      .times(100)
                      .toFixed(2),
                  ).toLocaleString('en-US')}
                  %
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>{t('Reward')}:</Text>
            <Text bold>{newReward ? getBalanceNumber(newReward).toFixed(3) : '~'} LUA / block</Text>
          </Flex>
        </>
      )}
      <Flex justifyContent="space-between">
        <Text>{t('Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          infoAddress={pairLink}
          totalValueFormatted={totalValueFormatted}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
