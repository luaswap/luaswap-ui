import BigNumber from 'bignumber.js'
import { ChainId, IdoDetailInfo } from 'views/Idos/types'
import lodashFind from 'lodash/find'
import lodashGet from 'lodash/get'
import { supportIdoNetwork, tierMap } from 'config/constants/idos'

export const calculateSwapRate = (totalAmountIDO: string | number, totalAmountPay: string | number): string => {
  if (totalAmountIDO && totalAmountPay) {
    return new BigNumber(totalAmountIDO).dividedBy(new BigNumber(totalAmountPay)).toFixed(2)
  }

  return null
}

export const calculateCommittedAmountPercentage = (
  totalCommittedAmount: string | number,
  totalAmountPay: string | number,
): number => {
  if (totalCommittedAmount && totalAmountPay) {
    return new BigNumber(totalCommittedAmount).dividedBy(new BigNumber(totalAmountPay)).multipliedBy(100).toNumber()
  }

  return 0
}

export const calculateSwappedAmountPercentage = (
  swappedAmountPay: string | number,
  totalAmountIDO: string | number,
): number => {
  if (swappedAmountPay && totalAmountIDO) {
    return new BigNumber(swappedAmountPay).dividedBy(new BigNumber(totalAmountIDO)).multipliedBy(100).toNumber()
  }

  return 0
}

export const getTierName = (tier: number) => {
  return tierMap[tier]
}

export const getIdoSupportedNetwork = (idos: Record<string, IdoDetailInfo[]>): string => {
  try {
    const supportedChainId = Object.keys(idos)
    const supportedNetworkName = supportedChainId.map((chainId) => supportIdoNetwork[chainId])
    return supportedNetworkName.join(',')
  } catch (error) {
    return null
  }
}

const DEFAULT_IDO = {
  tier: 0,
  addressIdoContract: '',
  creator: '',
  idoToken: {
    address: '',
    symbol: null,
    decimals: null,
  },
  payToken: {
    address: '',
    symbol: null,
    decimals: null,
  },
  totalAmountIDO: 0,
  totalAmountPay: 0,
  maxAmountPay: 0,
  minAmountPay: 0,
  projectId: '',
  claimAt: 0,
  closeAt: 0,
  openAt: 0,
  swappedAmountIDO: 0,
  swappedAmountPay: 0,
  totalCommittedAmount: 0,
  index: 0,
  chainId: '',
}

export const getIdoDataBasedOnChainIdAndTier = (
  index: Record<number, IdoDetailInfo[]>,
  chainId: number,
  userTier: number,
): IdoDetailInfo => {
  const allIdos = lodashGet(index, chainId, [])
  if (allIdos.length === 0) {
    return DEFAULT_IDO
  }

  const result = lodashFind(allIdos, (ido) => ido.tier === userTier)
  if (result) return result

  return DEFAULT_IDO
}

export const mapProjectStatus = (status: string) => {
  if (status === 'closed') {
    return 'Closed'
  }

  if (status === 'not open') {
    return 'Pending'
  }

  return 'Opening'
}

export const generateColorForStatusBar = (status: string) => {
  if (status === 'closed') {
    return '#ffbfbf'
  }

  if (status === 'open') {
    return '#31D0AA'
  }

  return '#afafaf1a'
}
