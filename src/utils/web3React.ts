import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ConnectorNames } from 'luastarter-uikits'
import getRpcUrl from 'utils/getRpcUrl'
import Web3 from 'web3'

const POLLING_INTERVAL = 12000
const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

export const injected = new InjectedConnector({ supportedChainIds: [1, 88, 89, 56] })
const bscConnector = new BscConnector({ supportedChainIds: [56] })

const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL, 88: getRpcUrl(88) },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
}

export const getLibrary = (provider): Web3 => {
  return provider
}
