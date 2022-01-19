import TOSAuthRoute from 'hooks/TOSAuthRoute'
import React from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import NFTDetail from './components/NFTDetail'
import NFTsInfo from './NFTsInfo'

const NFTs = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/detail/:id`}>
        <TOSAuthRoute component={NFTDetail} />
      </Route>
      <Route path={`${path}`}>
        <TOSAuthRoute component={NFTsInfo} />
      </Route>
    </Switch>
  )
}

export default NFTs
