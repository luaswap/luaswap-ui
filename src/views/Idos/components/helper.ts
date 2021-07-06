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
  totalAmountPay: string | number,
): number => {
  if (swappedAmountPay && totalAmountPay) {
    return new BigNumber(swappedAmountPay).dividedBy(new BigNumber(totalAmountPay)).multipliedBy(100).toNumber()
  }

  return 0
}

export const getTierName = (tier: number) => {
  return tierMap[tier]
}

export const getIdoSupportedNetwork = (idos: Record<string, IdoDetailInfo[]>): string => {
  const supportedChainId = Object.keys(idos)
  const supportedNetworkName = supportedChainId.map((chainId) => supportIdoNetwork[chainId])
  return supportedNetworkName.join(',')
}

export const getIdoDataBasedOnChainIdAndTier = (
  index: Record<number, IdoDetailInfo[]>,
  chainId: number,
  userTier: number,
): IdoDetailInfo => {
  const allIdos = lodashGet(index, chainId, [])
  if (allIdos.length === 0) {
    return {
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
      claimAt: 0,
      closeAt: 0,
      openAt: 0,
      swappedAmountIDO: 0,
      swappedAmountPay: 0,
      totalCommittedAmount: 0,
      index: '',
      chainId: '',
    }
  }
  return lodashFind(allIdos, (ido) => ido.tier === userTier)
}
