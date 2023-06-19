import { ChainId } from '@luaswap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 10 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeStats.tsx = 20 (40 - Amount sent to burn pool)

export const CAKE_PER_BLOCK = new BigNumber(40)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'https://pancakeswap.finance'
export const BASE_EXCHANGE_URL = 'https://app.luaswap.org'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const BASE_BSC_SCAN_URL = 'https://bscscan.com'
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS = 200000
export const API_BLOCKFOLIO = 'https://api.luaswap.org/api-v3/'
export const API_ETH = 'https://rpc-farm.luaswap.org'
export const API_TOMO = 'https://rpc-farm.luaswap.org/tomochain'
export const API_IDO_URL = 'https://api.luaswap.org/api/ido'
// export const API_IDO_URL = 'https://api.luaswap.org/api-test/ido'
export const API_URL: { [chainId in ChainId]: string } = {
  1: 'https://rpc-farm.luaswap.org',
  3: '',
  4: '',
  5: '',
  42: '',
  88: 'https://rpc-farm.luaswap.org/tomochain',
  89: '',
  99: '',
}

export const LUA_CONTRACT: { [chainId in ChainId]: string } = {
  1: '0xB1f66997A5760428D3a87D68b90BfE0aE64121cC',
  3: '',
  4: '',
  5: '',
  42: '',
  88: '0x7262fa193e9590B2E075c3C16170f3f2f32F5C74',
  89: '',
  99: '',
}

export const NUMBER_BLOCKS_PER_YEAR: { [chainId in ChainId]: number } = {
  1: 2425000,
  3: 2425000,
  4: 2425000,
  5: 2425000,
  42: 2425000,
  88: 12614400,
  89: 12614400,
  99: 12614400,
}
