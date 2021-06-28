import { IdoDetailInfo } from 'views/Idos/types'

// eslint-disable-next-line import/prefer-default-export
export const formatPoolDetail = (allTierPool: IdoDetailInfo[]): IdoDetailInfo => {
  return allTierPool.reduce(
    (accumulate, currentItem) => {
      return {
        ...accumulate,
        totalCommittedAmount: accumulate.totalCommittedAmount + currentItem.totalCommittedAmount,
        totalAmountPay: accumulate.totalAmountPay + currentItem.totalAmountPay,
        totalAmountIDO: accumulate.totalAmountIDO + currentItem.totalAmountIDO,
      }
    },
    {
      ...allTierPool[0],
      totalCommittedAmount: 0,
      totalAmountPay: 0,
      totalAmountIDO: 0,
    },
  )
}
