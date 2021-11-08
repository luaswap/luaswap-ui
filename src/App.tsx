import React, { lazy } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ResetCSS } from 'luastarter-uikits'
import BigNumber from 'bignumber.js'
import useEagerConnect, { useInactiveListener } from 'hooks/useEagerConnect'
import { useFetchProfile, useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Farms = lazy(() => import('./views/Farms'))
const DualFarms = lazy(() => import('./views/DualFarms'))
const Idos = lazy(() => import('./views/Idos'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useEagerConnect()
  useFetchPublicData()
  useInactiveListener()
  useFetchProfile()
  return (
    <HashRouter>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/ido">
              <Idos />
            </Route>
            {/* <Route path="/farms">
              <Farms />
            </Route> */}
            <Route path="/dual-farm">
              <DualFarms />
            </Route>
            <Route path="/portfolio">
              <Home />
            </Route>
            <Redirect from="/" to="/ido" />
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
    </HashRouter>
  )
}

export default React.memo(App)
