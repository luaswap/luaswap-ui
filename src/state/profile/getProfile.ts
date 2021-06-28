import axios from 'axios'
import BigNumber from 'bignumber.js'
import { TokenAmount, Token } from '@luaswap/sdk'
import { API_URL, LUA_CONTRACT } from 'config'

const LUA = new Token(1, '0xB1f66997A5760428D3a87D68b90BfE0aE64121cC', 18, 'LUA', 'LuaToken')

const getProfile = async (address: string, chainId: number) => {
  const LUA_REWARD_URL = `${API_URL[chainId]}/read/${LUA_CONTRACT[chainId]}`
  const totalLuaLockPromise = axios.post(LUA_REWARD_URL, {
    method: 'lockOf(address):(uint256)',
    params: [address],
    cache: true,
  })

  const luaUnLockAblePromise = axios.post(LUA_REWARD_URL, {
    method: 'canUnlockAmount(address):(uint256)',
    params: [address],
    cache: true,
  })

  // Todo: we should change to real account here
  const { data = {} } = await axios.get(
    'https://api.luaswap.org/api/ido/tier/0x5289d1a9c889b758269c3913136791b2d52d996a',
  )
  const [totalLuaLockResult, luaUnlockAbleResult] = await Promise.all([totalLuaLockPromise, luaUnLockAblePromise])
  const totalLuaLock = new TokenAmount(LUA, totalLuaLockResult.data.data || '0')
  const luaUnlockAble = new TokenAmount(LUA, luaUnlockAbleResult.data.data || '0')
  const formatLuaLock = new BigNumber(totalLuaLock.toFixed(3)).toFormat()
  const formatLuaUnlockable = new BigNumber(luaUnlockAble.toFixed(3)).toFormat()
  return { totalLuaLock: formatLuaLock, luaUnlockAble: formatLuaUnlockable, tier: data.tier }
}

export const getTierData = async (account: string) => {
  const { data = {} } = await axios.get(`https://api.luaswap.org/api/ido/tier/${account}`)
  return data.tier
}

export default getProfile
