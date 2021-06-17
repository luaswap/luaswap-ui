import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import Page from 'components/layout/Page'
import IdosInfo from './IdosInfo'
import ProjectDetail from './components/ProjectDetail'

const Idos = () => {
  const { t } = useTranslation()
  const { path } = useRouteMatch()

  return (
    <Page>
      <Switch>
        <Route path={`${path}/project/:id`}>
          <ProjectDetail />
        </Route>
        <Route path={`${path}`}>
          <IdosInfo />
        </Route>
      </Switch>
    </Page>
  )
}

export default Idos
