import axios from 'axios'
import { API_IDO_URL } from 'config'

export const getTokensAccept = async () => {
  const { data } = await axios.get(`${API_IDO_URL}/master/lockedlp`)
  return data
}

export const getUserTokensLock = async (address) => {
  const { data } = await axios.get(`${API_IDO_URL}/tier-v2/${address}`)
  return data
}

export const getValueTokenByLUA = async (tokenAddress, chainId, quantity) => {
  const { data } = await axios.get(`${API_IDO_URL}/tier-v2/${chainId}/${tokenAddress}/${quantity}`)
  return data
}
