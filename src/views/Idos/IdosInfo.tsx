import React, { useEffect, useState } from 'react'
import { Route, useRouteMatch, Link, useHistory } from 'react-router-dom'
import { Flex, SecondaryButtonMenu, SecondaryMenuItem } from 'luastarter-uikits'
import Page from 'components/layout/Page'
import styled from 'styled-components'
import Hero from './components/Hero'
import CurrentIdo from './components/CurrentIdo'
import PastIdo from './components/PastIdo'
import Stake from './components/Stake'
import styles from './styles.module.scss'

const TextStake = styled.span`
  width: 150px;
  text-align: center;
`

const Idos = () => {
  const { path, url, isExact } = useRouteMatch()

  // index mean child's index of SecondaryButtonMenu
  const [index, setIndex] = useState(0)
  const { location } = useHistory()

  useEffect(() => {
    if (location.pathname === `${url}`) {
      setIndex(0)
    } else if (location.pathname === `${url}/history`) {
      setIndex(1)
    } else if (location.pathname === `${url}/stake`) {
      setIndex(2)
    }
  }, [location])

  return (
    <>
      <Page>
        <Hero />
        <Flex mb="32px" alignItems="center" justifyContent="center">
          <SecondaryButtonMenu activeIndex={index} scale="sm" variant="primary">
            <SecondaryMenuItem as={Link} to={`${url}`} pt="24px" pb="24px" className={styles.tabStyle}>
              OPENING POOLS
            </SecondaryMenuItem>
            <SecondaryMenuItem as={Link} to={`${url}/history`} pt="24px" pb="24px" className={styles.tabStyle}>
              PREVIOUS POOLS
            </SecondaryMenuItem>
            <SecondaryMenuItem as={Link} to={`${url}/stake`} pt="24px" pb="24px" className={styles.tabStyle}>
              <TextStake>STAKE</TextStake>
            </SecondaryMenuItem>
          </SecondaryButtonMenu>
        </Flex>
        <Route exact path={`${path}`}>
          <CurrentIdo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIdo />
        </Route>
        <Route path={`${path}/stake`}>
          <Stake />
        </Route>
      </Page>
    </>
  )
}

export default Idos
