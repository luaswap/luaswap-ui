import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ component: Component, ...rest }) => {
  const { account } = useWeb3React()

  if (!account) {
    return <Redirect to="/" />
  }

  return <Route render={(props) => <Component {...props} />} {...rest} />
}

export default AuthRoute
