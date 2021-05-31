import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { API_URL, API_ETH, API_TOMO } from 'config'
import { getMasterchefContract } from 'utils/contractHelpers'
import useWeb3 from 'hooks/useWeb3'
import axios from 'axios'
import BigNumber from 'bignumber.js'

async function UnknownBlock(address, method, params, cache, chainId) {
    let apiUrl
    if(chainId){
      apiUrl = API_URL[chainId]
    }else{
      apiUrl = API_ETH
    }
    const { data } = await axios.post(`${apiUrl}/read/${address}`, {
      method,
      params,
      cache
    })
    
    return data.data
  }

const getNewRewardPerBlock = async (web3, pid1 = 0, chainId) => {
    const chef = getMasterchefContract(web3, chainId)
    // if (pid1 === 0) {
    //     return new BigNumber(await UnknownBlock(chef._address, 'getNewRewardPerBlock(uint256):(uint256)', [pid1], true, chainId))
    // } 
    // // if (await checkPoolActive(pid1 - 1, chainId)) {
        // @ts-ignore
        const reward = await UnknownBlock(chef._address, 'getNewRewardPerBlock(uint256):(uint256)', [pid1], true, chainId)
        return new BigNumber(reward)
    //     // } 
    //     //   return new BigNumber('0')
        
        
    }
    
const useNewReward = (pid1 = 0) => {
  const {chainId} = useWeb3React()
  const web3 = useWeb3()
  const [newReward, setNewRewad] = useState<BigNumber>()

  useEffect(() => {
    async function fetchData() {
      const v = chainId === 88 ? new BigNumber(0) : await getNewRewardPerBlock(web3, pid1, chainId)
      setNewRewad(v)
    }
    fetchData()
  }, [chainId, pid1, web3])

  return newReward
}

export default useNewReward
