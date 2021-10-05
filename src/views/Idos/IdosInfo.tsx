import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'contexts/Localization'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { Flex, SecondaryButtonMenu, SecondaryMenuItem, useModal } from 'luastarter-uikits'
import { selectOpenPools, selectLoadingOpenPools, selectClosedPools, fetchPools } from 'state/ido'
import { useAppDispatch } from 'state'
import Page from 'components/layout/Page'
import TermOfUseModal from 'components/TermOfUseModal'
import Hero from './components/Hero'
import CurrentIdo from './components/CurrentIdo'
import PastIdo from './components/PastIdo'

const Idos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const openPools = useSelector(selectOpenPools)
  const closedPools = useSelector(selectClosedPools)
  const isLoadingOpenPools = useSelector(selectLoadingOpenPools)
  const [onDisplayTermOfUseModal] = useModal(<TermOfUseModal />, false)
  const isLoadingState = useMemo(() => {
    return isLoadingOpenPools || isLoading
  }, [isLoadingOpenPools, isLoading])

  useEffect(() => {
    dispatch(fetchPools())
    setIsLoading(false)
  }, [dispatch])

  return (
    <>
      <Page>
        <Hero />
        <Flex mb="32px" alignItems="center" justifyContent="center">
          <SecondaryButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="primary">
            <SecondaryMenuItem as={Link} to={`${url}`} pt="24px" pb="24px">
              OPENING POOLS
            </SecondaryMenuItem>
            <SecondaryMenuItem as={Link} to={`${url}/history`} pt="24px" pb="24px">
              PREVIOUS POOLS
            </SecondaryMenuItem>
          </SecondaryButtonMenu>
        </Flex>
        <Route exact path={`${path}`}>
          <CurrentIdo openPools={openPools} isLoadingState={isLoadingState} />
        </Route>
        <Route path={`${path}/history`}>
          <PastIdo closedPools={closedPools} isLoadingState={isLoadingState} />
        </Route>
      </Page>
    </>
  )
}

export default Idos
