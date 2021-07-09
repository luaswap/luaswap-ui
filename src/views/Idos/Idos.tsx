import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import IdosInfo from './IdosInfo'
import DevTools from './DevTools'
import ProjectDetail from './components/ProjectDetail'

const Idos = () => {
  const { t } = useTranslation()
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/project/:id`}>
        <ProjectDetail />
      </Route>
      <Route path={`${path}/dev-tools`}>
        <DevTools />
      </Route>
      <Route path={`${path}`}>
        <IdosInfo />
      </Route>
    </Switch>
  )
}

export default Idos
