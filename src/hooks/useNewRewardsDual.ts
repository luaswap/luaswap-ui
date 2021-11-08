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

const getNewRewardPerBlockDual = async (web3, pid1 = 0, chainId, master) => {
  // IERC20 lpToken;           // Address of LP token contract.
  //       uint256 allocPoint;       // How many allocation points assigned to this pool. LUAs to distribute per block.
  //       uint256 lastRewardBlock;  // Last block number that LUAs distribution occurs.
  //       uint256 accLuaPerShare; // Accumulated LUAs per share, times 1e12. See below.
  //       uint256 accRewardPerShare; // Accumulated Rewards per share, times 1e12. See below.
  const pool = await UnknownBlock(
    // @ts-ignore
    master,
    'poolInfo(uint256):(address lp, uint point, uint lastBlock, uint luashare, uint tokenshare)',
    [pid1 - 1],
    true,
    chainId,
  )
  const poolReward = await UnknownBlock(
    // @ts-ignore
    master,
    'getPoolReward(uint256,uint256,uint256):(uint rewardLua, uint rewardToken)',
    [parseInt(pool.lastBlock), parseInt(pool.lastBlock) + 1, pool.point],
    true,
    chainId,
  )
  const reward = poolReward.farmer
  return {
    master,
    pid: pid1 - 1,
    reward: poolReward.rewardToken,
    luaReward: poolReward.rewardLua,
  }
}

export default getNewRewardPerBlockDual
