import { ChainId } from '@luaswap/sdk'
import sample from 'lodash/sample'

const BSC_NODE_1 = 'https://bsc-dataseed1.ninicoin.io'
const BSC_NODE_2 = 'https://bsc-dataseed1.defibit.io'
const BSC_NODE_3 = 'https://bsc-dataseed.binance.org'
const BSC_NODES = [BSC_NODE_1, BSC_NODE_2, BSC_NODE_3]

export const RPC_URL = {
  1: 'https://mainnet.infura.io/v3/78cba03696d7430daeef8383d563e065',
  3: '',
  4: '',
  5: '',
  42: '',
  88: 'https://rpc.tomochain.com',
  89: 'https://testnet.tomochain.com',
  97: 'https://data-seed-prebsc-2-s3.binance.org:8545/',
  99: '',
}

const getNodeUrl = (chainId?: number) => {
  if (chainId === 56) {
    return sample(BSC_NODES)
  }
  return RPC_URL[chainId] ? RPC_URL[chainId] : RPC_URL[1]
}

export default getNodeUrl
