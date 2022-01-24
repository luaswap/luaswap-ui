import axios from 'axios'

export const getNFTPools = async () => {
  const { data } = await axios.get(`https://api.luaswap.org/api-test/ido/nft-pools`)
  return data
}

export const getNFTPoolDetail = async (NFTPoolId: string) => {
  const { data } = await axios.get(`https://api.luaswap.org/api-test/ido/nft-pools/detail/${NFTPoolId}`)
  return data
}
