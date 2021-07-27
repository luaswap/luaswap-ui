import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

import { Heading, Text, LogoIcon, BaseLayout, Flex } from 'common-uikitstrungdao'
import getPoolStake from '../../utils/getPoolStake'
import { getLuaAddress, getxLuaAddress } from '../../utils/addressHelpers'
import { getBalanceNumber } from '../../utils/formatBalance'
import { getERC20Contract } from '../../utils/contractHelpers'
import Value from '../../components/Value'
import PageHeader from '../../components/PageHeader'
import Page from '../../components/layout/Page'
import UnstakeXLua from './UnStake'
import StakeLua from './Stake'
import PoolList from './PoolList'
import Loading from '../../components/Loading'
import UnlockButton from '../../components/UnlockButton'

interface PoolItemProps {
  lpAddresses: string
  lpBalance: number
  token0Addresses: string
  token0Balance: number
  token0Symbol: keyof PoolItemProps
  token1Addresses: string
  token1Balance: number
  token1Symbol: keyof PoolItemProps
}

const StyleHeading = styled(Heading)`
  > div {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }
`
const StyleHeader = styled.div`
  text-align: center;
`
const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const StylePools = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 40px;
  & > div {
    grid-column: span 6;
    width: 100%;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
const StyleReward = styled.div`
  > div {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.textDisabled};
    padding: 20px;
    border-radius: 24px;
    width: 430px;
    text-align: center;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    margin: 30px auto 0 auto;
  }
`
const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const LuaSafe: React.FC = () => {
  const { chainId, account, library: ethereum } = useWeb3React()
  const [totalStake, setTotalStake] = useState<BigNumber>(new BigNumber(0))
  const [pools, setPools] = useState<PoolItemProps[]>([])
  const [checkRequest, setRequest] = useState(false)

  const luaAddress = getLuaAddress(chainId)
  const xLuaAddress = getxLuaAddress(chainId)

  useEffect(() => {
    const fetchAllowance = async () => {
      if (chainId) {
        const res = await getPoolStake(chainId)
        setPools(res)
        setRequest(true)
      }
    }
    fetchAllowance()
  }, [chainId])

  useEffect(() => {
    const fetchLuaStakeTotal = async () => {
      const luaContract = getERC20Contract(ethereum, luaAddress, chainId)
      try {
        const luaStakeTotal = await luaContract.methods.balanceOf(xLuaAddress).call()
        setTotalStake(new BigNumber(luaStakeTotal))
      } catch (e) {
        console.log(e)
      }
    }
    fetchLuaStakeTotal()
  }, [ethereum, luaAddress, xLuaAddress, chainId])
  return (
    <>
      <PageHeader>
        <StyleHeader>
          <LogoIcon width="120px" height="120px" />
          <StyleHeading as="h1" scale="lg" mb="24px" mt="30px">
            {`LuaSafe Currently Has `}
            <Value value={getBalanceNumber(new BigNumber(totalStake))} decimals={2} />
            {` LUA Staked`}
          </StyleHeading>
        </StyleHeader>
      </PageHeader>
      {account ? (
        <Page>
          <Cards>
            <UnstakeXLua xLuaAddress={xLuaAddress} />
            <StakeLua />
          </Cards>
          <Text textAlign="center">
            Users who stake LUA in LuaSafe will receive xLUA LP tokens which represent their proportion of LUA staked.
            Stakers will need to unstake their xLUA LP tokens in order to receive their LUA reward.
          </Text>
          <Divider />
          <Text textAlign="center" fontSize="24px" bold mb="20px">
            SELECT PAIR TO CONVERT
          </Text>
          <Text>
            The core team will trigger distribution every Monday, generally around noon Singapore time (GMT+8) or
            earlier if the pair’s collected fee reaches a certain significant amount (equivalent to at least 3,000 LUA
            after converted). Users do not need to pay any gas fee for the distribution unless they choose to manually
            trigger the distribution process themselves.
          </Text>
          {pools.length > 0 && Object.keys(pools[0]).length > 0 && checkRequest && (
            <StylePools>
              <PoolList items={pools} />
            </StylePools>
          )}
          {pools.length < 1 && checkRequest && (
            <StyleReward>
              <Text>The reward is negligible, Pools will not be displayed for now. You can come back later.</Text>
            </StyleReward>
          )}
          {!checkRequest && <Loading size="60px" />}
        </Page>
      ) : (
        <Page>
          <Flex justifyContent="center">
            <UnlockButton width="auto" />
          </Flex>
        </Page>
      )}
    </>
  )
}

export default LuaSafe
