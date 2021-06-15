import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Flex } from 'common-uikitstrungdao'
import Container from 'components/layout/Container'
import Hero from './components/Hero'
import CurrentIdo from './components/CurrentIdo'
import PastIdo from './components/PastIdo'

const Idos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()

  return (
    <>
      <Hero />
      <Container>
        <Flex mb="32px">
          <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="subtle">
            <ButtonMenuItem as={Link} to={`${url}`}>
              {t('Next IFO')}
            </ButtonMenuItem>
            <ButtonMenuItem as={Link} to={`${url}/history`}>
              {t('Past IFOs')}
            </ButtonMenuItem>
          </ButtonMenu>
        </Flex>
        <Route exact path={`${path}`}>
          <CurrentIdo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIdo />
        </Route>
      </Container>
    </>
  )
}

export default Idos
