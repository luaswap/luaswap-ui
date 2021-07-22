import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

import { Heading, Text, LogoIcon, BaseLayout } from 'common-uikitstrungdao'
import { getLuaAddress, getxLuaAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { getERC20Contract } from 'utils/contractHelpers'
import Value from 'components/Value'
import PageHeader from 'components/PageHeader'
import Page from 'components/layout/Page'
import UnstakeXLua from './UnStake'
import StakeLua from './Stake'
import Pool from './Pool'

const TotalSupplyText = styled.span`
  color: #4caf50;
  font-size: 30px;
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
const Pools = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 40px;
  & > div {
    grid-column: span 4;
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
      grid-column: span 4;
    }
  }
`
const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const LuaSafe: React.FC = () => {
  const { chainId, library: ethereum } = useWeb3React()
  const [totalStake, setTotalStake] = useState<BigNumber>(new BigNumber(0))
  const luaAddress = getLuaAddress(chainId)
  const xLuaAddress = getxLuaAddress(chainId)
  useEffect(() => {
    const fetchLuaStakeTotal = async () => {
      if (ethereum && ethereum.provider) {
        const lpContract = getERC20Contract(ethereum.provider, luaAddress, chainId)
        try {
          const luaStakeTotal: string = await lpContract.methods.balanceOf(xLuaAddress).call()
          setTotalStake(new BigNumber(luaStakeTotal))
        } catch (e) {
          console.log(e)
        }
      }
    }
    fetchLuaStakeTotal()
  }, [ethereum, luaAddress, xLuaAddress, chainId])

  return (
    <>
      <PageHeader>
        <StyleHeader>
          <LogoIcon width="120px" height="120px" />
          <Heading as="h1" scale="lg" mb="24px" mt="30px">
            {`LuaSafe Currently Has `}
            <Value value={getBalanceNumber(new BigNumber(totalStake))} decimals={2} />
            {` LUA Staked`}
          </Heading>
        </StyleHeader>
      </PageHeader>

      <Page>
        <Cards>
          <UnstakeXLua />
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
          The core team will trigger distribution every Monday, generally around noon Singapore time (GMT+8) or earlier
          if the pair’s collected fee reaches a certain significant amount (equivalent to at least 3,000 LUA after
          converted). Users do not need to pay any gas fee for the distribution unless they choose to manually trigger
          the distribution process themselves.
        </Text>
        <Pools>
          <Pool />
        </Pools>
      </Page>
    </>
  )
}

export default LuaSafe
