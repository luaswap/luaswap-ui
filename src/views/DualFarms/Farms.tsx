import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Text, Mesage, Spinner } from 'luastarter-uikits'
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
import { fetchFarms, fetchFarmUserDataAsync, setDefaultFarmData } from 'state/actions'
import PageHeader from 'components/PageHeader'
import FarmCard from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'

const PoolContainer = styled.div`
  padding: 48px 24px;
`

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
const PageLoader = styled.div`
  height: calc(100vh - 312px);
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [isLoading, setIsLoading] = useState(true)
  const luaPrice = useLuaPrice()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, 'pancake_farm_view')
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const dispatch = useAppDispatch()
  const ID = 88 // chainId === 88 ? 88 : 1
  const history = useHistory()
  useEffect(() => {
    dispatch(setDefaultFarmData(chainId))
    dispatch(
      fetchFarms(chainId, web3, true, () => {
        setIsLoading(false)
      }),
    )
  }, [account, dispatch, chainId, web3])

  useEffect(() => {
    let id
    if (account && farmsLP.length > 0 && farmsLP[0].master) {
      id = setInterval(() => {
        dispatch(fetchFarmUserDataAsync(account, chainId, web3, farmsLP))
      }, 2000)
    }

    return () => {
      clearInterval(id)
    }
  }, [account, farmsLP.length, chainId, web3, dispatch])

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

  const rowData = []
  /*
  farmsLpMemoized.map((farm) => {
    console.log(farm)
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
  */

  const renderContent = (): JSX.Element => {
    return (
      <div>
        {!isLoading ? (
          <FlexLayout>
            {farmsLpMemoized.map((farm) => (
              <FarmCard
                key={`${farm.master}${farm.pid}`}
                farm={farm}
                account={account}
                removed={false}
                luaPrice={luaPrice}
              />
            ))}
          </FlexLayout>
        ) : (
          <PageLoader>
            <Spinner />
          </PageLoader>
        )}
      </div>
    )
  }
  const isImage = true
  return (
    <>
      <PageHeader background={`url(${process.env.PUBLIC_URL}/images/farm-bg.png)`} isImage={isImage}>
        <Heading as="h1" scale="xxl" color="#FFFFFF" mb="24px">
          {t('Farms')}
        </Heading>
        <Heading scale="lg" color="text">
          Stake your LP tokens and earn token rewards
        </Heading>
      </PageHeader>
      <PoolContainer>
        {chainId !== 88 && !isLoading && (
          <Mesage variant="warning">
            <Text>Please switch to Tomo Mainnet to use this feature</Text>
          </Mesage>
        )}
        {/* <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer> */}
        {renderContent()}
      </PoolContainer>
    </>
  )
}

export default Farms
