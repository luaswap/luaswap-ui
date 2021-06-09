import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import Providers from './Providers'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <HashRouter>
        <App />
      </HashRouter>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
