import React from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import NFTDetail from './components/NFTDetail'
import NFTsInfo from './NFTsInfo'

const NFTs = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/detail/:id`} component={NFTDetail} />
      <Route path={`${path}`} component={NFTsInfo} />
    </Switch>
  )
}

export default NFTs
