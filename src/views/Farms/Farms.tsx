import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms } from 'state/hooks'
import useLuaPrice from 'hooks/useLuaPrice'
import usePersistState from 'hooks/usePersistState'
import useWeb3 from 'hooks/useWeb3'
import { useTranslation } from 'contexts/Localization'
import { NUMBER_BLOCKS_PER_YEAR } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import { IsTomoChain } from 'utils/wallet'
import { latinise } from 'utils/latinise'
import { fetchFarmUserDataAsync } from 'state/actions'
import PageHeader from 'components/PageHeader'
import FarmCard from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`
const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const luaPrice = useLuaPrice()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, 'pancake_farm_view')
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const dispatch = useAppDispatch()
  const ID = chainId === 88 ? 88 : 1
  const history = useHistory()
  console.log(viewMode)
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account, chainId, web3))
    }
  }, [account, dispatch, chainId, web3])

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const farmsLpMemoized = useMemo(() => {
    if (query) {
      const lowercaseQuery = latinise(query.toLowerCase())
      return farmsLP.filter((farm) => {
        return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
      })
    }

    return farmsLP
  }, [query, farmsLP])

  const rowData = farmsLpMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')
    const reward = farm.reward ? new BigNumber(farm.reward) : new BigNumber(0)
    const row: RowProps = {
      apr: {
        value: '1', // have to fill correct value
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        luaPrice,
        originalValue: parseFloat(
          luaPrice
            .times(NUMBER_BLOCKS_PER_YEAR[ID])
            .times(reward.div(10 ** 18))
            .div(farm.usdValue)
            .div(10 ** 8)
            .times(100)
            .toFixed(2),
        ).toLocaleString('en-US'), // have to fill correct value
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.usdValue, // have to fill correct value
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsLpMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} account={account} removed={false} luaPrice={luaPrice} />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('Farms')}
        </Heading>
        <Heading scale="lg" color="text">
          {t('Earn LUA tokens by staking LUA-V1 LP token ')}
        </Heading>
      </PageHeader>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
      </Page>
    </>
  )
}

export default Farms
