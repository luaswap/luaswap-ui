import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import AuthRoute from 'hooks/AuthRoute'
import TOSAuthRoute from 'hooks/TOSAuthRoute'
import IdosInfo from './IdosInfo'
import DevTools from './DevTools'
import ProjectDetail from './components/ProjectDetail'

const Idos = () => {
  const { t } = useTranslation()
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/project/:id`}>
        <TOSAuthRoute component={ProjectDetail} />
      </Route>
      <Route path={`${path}/history/project/:id`}>
        <TOSAuthRoute component={ProjectDetail} />
      </Route>
      <Route path={`${path}/dev-tools`}>
        <AuthRoute component={DevTools} />
      </Route>
      <Route path={`${path}`}>
        <TOSAuthRoute component={IdosInfo} />
      </Route>
    </Switch>
  )
}

export default Idos
