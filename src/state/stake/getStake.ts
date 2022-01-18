import axios from 'axios'

export const getTokensAccept = async () => {
  const { data } = await axios.get('https://api.luaswap.org/api/ido/master/lockedlp')
  return data
}

export const getUserTokensLock = async (address) => {
  const { data } = await axios.get(`https://api.luaswap.org/api/ido/tier-v2/${address}`)
  return data
}

export const getValueTokenByLUA = async (tokenAddress, chainId, quantity) => {
  const { data } = await axios.get(`https://api.luaswap.org/api/ido/tier-v2/${chainId}/${tokenAddress}/${quantity}`)
}
