import axios from 'axios'
import { API_ETH, API_TOMO } from '../config'

const getPoolStake = async (chainId) => {
  let apiUrl
  if (chainId === 88) {
    apiUrl = API_TOMO
  } else {
    apiUrl = API_ETH
  }

  const { data = [] } = await axios.get(`${apiUrl}/makerData`)
  return data
}

export default getPoolStake
