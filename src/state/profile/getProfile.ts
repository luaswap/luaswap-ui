import axios from 'axios'
import BigNumber from 'bignumber.js'
import { TokenAmount, Token } from '@luaswap/sdk'
import { API_IDO_URL, API_URL, LUA_CONTRACT } from 'config'

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

  const [totalLuaLockResult, luaUnlockAbleResult] = await Promise.all([totalLuaLockPromise, luaUnLockAblePromise])
  const totalLuaLock = new TokenAmount(LUA, totalLuaLockResult.data.data || '0')
  const luaUnlockAble = new TokenAmount(LUA, luaUnlockAbleResult.data.data || '0')
  const formatLuaLock = new BigNumber(totalLuaLock.toFixed(3)).toFormat()
  const formatLuaUnlockable = new BigNumber(luaUnlockAble.toFixed(3)).toFormat()
  return { totalLuaLock: formatLuaLock, luaUnlockAble: formatLuaUnlockable }
}

export const getTierData = async (account: string) => {
  const { data = {} } = await axios.get(`${API_IDO_URL}/tier-v2/${account}`)
  return data
}

export const getTierDataAfterSnapshot = async (account: string, project: string) => {
  const { data = {} } = await axios.get(`${API_IDO_URL}/users/tier/${project}/${account}`)
  return data
}

export const postLoginDetail = async (account: string) => {
  await axios.post(`${API_IDO_URL}/users/login`, {
    user: account,
  })
}

export default getProfile
