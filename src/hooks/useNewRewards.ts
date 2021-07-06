import { API_URL, API_ETH } from 'config'
import { getMasterchefContract } from 'utils/contractHelpers'
import axios from 'axios'

async function UnknownBlock(address, method, params, cache, chainId) {
  let apiUrl
  if (chainId) {
    apiUrl = API_URL[chainId]
  } else {
    apiUrl = API_ETH
  }
  const { data } = await axios.post(`${apiUrl}/read/${address}`, {
    method,
    params,
    cache,
  })

  return data.data
}

const getNewRewardPerBlock = async (web3, pid1 = 0, chainId) => {
  const chef = getMasterchefContract(web3, chainId)
  // if (pid1 === 0) {
  //     return new BigNumber(await UnknownBlock(chef._address, 'getNewRewardPerBlock(uint256):(uint256)', [pid1], true, chainId))
  // }
  // // if (await checkPoolActive(pid1 - 1, chainId)) {
  const pool = await UnknownBlock(
    // @ts-ignore
    chef._address,
    'poolInfo(uint256):(address lp, uint point, uint lastBlock, uint share)',
    [pid1 - 1],
    true,
    chainId,
  )
  const poolReward = await UnknownBlock(
    // @ts-ignore
    chef._address,
    'getPoolReward(uint256,uint256,uint256):(uint dev, uint farmer)',
    [parseInt(pool.lastBlock), parseInt(pool.lastBlock) + 1, pool.point],
    true,
    chainId,
  )
  const reward = poolReward.farmer
  return {
    pid: pid1 - 1,
    reward,
  }
  //     // }
  //     //   return new BigNumber('0')
}

// const useNewReward = (pid1 = 0) => {
//   const {chainId} = useWeb3React()
//   const web3 = useWeb3()
//   const [newReward, setNewRewad] = useState<BigNumber>()

//   useEffect(() => {
//     async function fetchData() {
//       const v = chainId === 88 ? new BigNumber(0) : await getNewRewardPerBlock(web3, pid1, chainId)
//       setNewRewad(v)
//     }
//     fetchData()
//   }, [chainId, pid1, web3])

//   return newReward
// }

export default getNewRewardPerBlock
