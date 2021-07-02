import BigNumber from 'bignumber.js'
import { ChainId, IdoDetailInfo } from 'views/Idos/types'
import lodashFind from 'lodash/find'
import lodashGet from 'lodash/get'

export const calculateSwapRate = (totalAmountIDO: string | number, totalAmountPay: string | number): string => {
  return new BigNumber(totalAmountIDO).dividedBy(new BigNumber(totalAmountPay)).toFixed(2)
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

export const getIdoDataBasedOnChainIdAndTier = (
  index: Record<ChainId, IdoDetailInfo[]>,
  chainId: ChainId,
  userTier: number,
): IdoDetailInfo => {
  const allIdos = lodashGet(index, chainId, [])
  return lodashFind(allIdos, (ido) => ido.tier === userTier)
}
