import React, { useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { ButtonMenu, ButtonMenuItem, Flex } from 'common-uikitstrungdao'
import { useLuaIdoContract } from 'hooks/useContract'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import CurrentIdo from './components/CurrentIdo'
import PastIdo from './components/PastIdo'

const Idos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()
  const { chainId, account } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(chainId)
  
  useEffect(() => {
    if (chainId) {
      luaIdoContract.methods.IDOs(0).call().then(res => console.log(res, 'res'))
    }
  }, [luaIdoContract, account, chainId])

  return (
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
