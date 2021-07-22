import { BigNumber } from 'bignumber.js'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address, chainId?: number): string => {
  const mainNetChainId = 1
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getCakeAddress = () => {
  return getAddress(tokens.cake.address)
}

export const getLuaIdoAddress = (chainId?) => {
  return getAddress(addresses.luaswapIdo, chainId)
}

export const getMasterChefAddress = (chainId?) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getLuaAddress = (chainId?) => {
  return getAddress(addresses.lua, chainId)
}
export const getxLuaAddress = (chainId?) => {
  return getAddress(addresses.xlua, chainId)
}
export const getMulticallAddress = (chainId?) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}
export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}

export const isEmptyAddress = (address) => {
  return new BigNumber(address).toNumber() === 0
}
