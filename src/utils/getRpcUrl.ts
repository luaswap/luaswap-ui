import { ChainId } from '@luaswap/sdk'

export const RPC_URL: { [chainId in ChainId]: string } = {
  1: 'https://mainnet.infura.io/v3/78cba03696d7430daeef8383d563e065',
  3: '',
  4: '',
  5: '',
  42: '',
  88: 'https://rpc.tomochain.com',
  89: '',
  99: ''
}

const getNodeUrl = (chainId?: number) => {
  return RPC_URL[chainId] ? RPC_URL[chainId] : RPC_URL[1]
}

export default getNodeUrl