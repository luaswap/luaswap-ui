import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useSelector } from 'react-redux'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Flex } from 'common-uikitstrungdao'
import { selectOpenPools, selectLoadingOpenPools } from 'state/ido'
import PageLoader from 'components/PageLoader'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import CurrentIdo from './components/CurrentIdo'
import PastIdo from './components/PastIdo'

const Idos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()
  const openPools = useSelector(selectOpenPools)
  const isLoading = useSelector(selectLoadingOpenPools)

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <Hero />
          <Page>
            <Flex mb="32px">
              <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="primary">
                <ButtonMenuItem as={Link} to={`${url}`}>
                  {t('Upcoming Pools')}
                </ButtonMenuItem>
                <ButtonMenuItem as={Link} to={`${url}/history`}>
                  {t('Previous Pools')}
                </ButtonMenuItem>
              </ButtonMenu>
            </Flex>
            <Route exact path={`${path}`}>
              <CurrentIdo openPools={openPools} />
            </Route>
            <Route path={`${path}/history`}>
              <PastIdo />
            </Route>
          </Page>
        </>
      )}
    </>
  )
}

export default Idos
