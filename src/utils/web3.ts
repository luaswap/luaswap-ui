import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'

const getWeb3BasedOnChainId = (chainId?: number) => {
  const RPC_URL = getRpcUrl(chainId)
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
  const web3 = new Web3(httpProvider)

  return web3
}

const getWeb3NoAccount = () => {
  return getWeb3BasedOnChainId()
}

export { getWeb3NoAccount, getWeb3BasedOnChainId }
