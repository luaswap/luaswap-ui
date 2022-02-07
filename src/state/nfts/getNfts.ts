import axios from 'axios'
import { API_IDO_URL } from 'config'

export const getNFTPools = async () => {
  const { data } = await axios.get(`${API_IDO_URL}/nft-pools`)
  return data
}

export const getNFTPoolDetail = async (NFTPoolId: string) => {
  const { data } = await axios.get(`${API_IDO_URL}/nft-pools/detail/${NFTPoolId}`)
  return data
}
