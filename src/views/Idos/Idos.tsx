import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import IdosInfo from './IdosInfo'
import ProjectDetail from './components/ProjectDetail'

const Idos = () => {
  const { t } = useTranslation()
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}/project/:id`}>
        <ProjectDetail />
      </Route>
      <Route path={`${path}`}>
        <IdosInfo />
      </Route>
    </Switch>
  )
}

export default Idos
