import BigNumber from 'bignumber.js'

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
