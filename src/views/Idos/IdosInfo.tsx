import React from 'react'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { Flex, SecondaryButtonMenu, SecondaryMenuItem, useModal } from 'luastarter-uikits'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import CurrentIdo from './components/CurrentIdo'
import PastIdo from './components/PastIdo'
import styles from './styles.module.scss'

const Idos = () => {
  const { path, url, isExact } = useRouteMatch()

  return (
    <>
      <Page>
        <Hero />
        <Flex mb="32px" alignItems="center" justifyContent="center">
          <SecondaryButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="primary">
            <SecondaryMenuItem as={Link} to={`${url}`} pt="24px" pb="24px" className={styles.tabStyle}>
              OPENING POOLS
            </SecondaryMenuItem>
            <SecondaryMenuItem as={Link} to={`${url}/history`} pt="24px" pb="24px" className={styles.tabStyle}>
              PREVIOUS POOLS
            </SecondaryMenuItem>
          </SecondaryButtonMenu>
        </Flex>
        <Route exact path={`${path}`}>
          <CurrentIdo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIdo />
        </Route>
      </Page>
    </>
  )
}

export default Idos
