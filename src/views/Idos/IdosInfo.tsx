import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'contexts/Localization'
import { useSelector } from 'react-redux'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Flex } from 'common-uikitstrungdao'
import { selectOpenPools, selectLoadingOpenPools, selectClosedPools, fetchPools } from 'state/ido'
import { useAppDispatch } from 'state'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import CurrentIdo from './components/CurrentIdo'
import PastIdo from './components/PastIdo'

const Idos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const openPools = useSelector(selectOpenPools)
  const closedPools = useSelector(selectClosedPools)
  const isLoadingOpenPools = useSelector(selectLoadingOpenPools)

  const isLoadingState = useMemo(() => {
    return isLoadingOpenPools || isLoading
  }, [isLoadingOpenPools, isLoading])

  useEffect(() => {
    dispatch(fetchPools())
    setIsLoading(false)
  }, [dispatch])

  return (
    <>
      <>
        <Hero />
        <Page>
          <Flex mb="32px">
            <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="primary">
              <ButtonMenuItem as={Link} to={`${url}`}>
                {t('Opening Pools')}
              </ButtonMenuItem>
              <ButtonMenuItem as={Link} to={`${url}/history`}>
                {t('Previous Pools')}
              </ButtonMenuItem>
            </ButtonMenu>
          </Flex>
          <Route exact path={`${path}`}>
            <CurrentIdo openPools={openPools} isLoadingState={isLoadingState} />
          </Route>
          <Route path={`${path}/history`}>
            <PastIdo closedPools={closedPools} isLoadingState={isLoadingState} />
          </Route>
        </Page>
      </>
    </>
  )
}

export default Idos
