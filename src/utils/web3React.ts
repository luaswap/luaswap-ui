import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames } from '@pancakeswap/uikit'
import Web3 from 'web3'

const POLLING_INTERVAL = 12000
const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

const injected = new InjectedConnector({ supportedChainIds: [1, 88, 89, 99, 3, 4, 5, 42] })

const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}

export const getLibrary = (provider): Web3 => {
  return provider
}
