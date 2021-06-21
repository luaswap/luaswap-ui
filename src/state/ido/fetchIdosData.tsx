import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getLuaIdoAddress, getAddress } from 'utils/addressHelpers'
import { getERC20Contract } from 'utils/contractHelpers'
import { FarmConfig } from 'config/constants/types'

export const fetchIdosInformation = async (
  account: string,
  farmsToFetch: FarmConfig[],
  chainId: number,
  web3?: Web3,
) => {
  const luaSwapIdoAddress = getLuaIdoAddress(chainId)

}

export const fetchFarmUserTokenBalances = async (
  account: string,
  farmsToFetch: FarmConfig[],
  chainId: number,
  web3?: Web3,
) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses, chainId)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls, chainId, web3)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

