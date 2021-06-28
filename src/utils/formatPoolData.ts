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

export const formatPoolTotalTierByChainID = (
  allTierPool1: IdoDetailInfo[],
  allTierPool2: IdoDetailInfo[],
): IdoDetailInfo[] => {
  return allTierPool1.map((e) => {
    const e2 = allTierPool2.find((p) => e2.tier === e.tier)
    if (e2) {
      return {
        ...e,
        totalCommittedAmount: e.totalCommittedAmount + e2.totalCommittedAmount,
        totalAmountPay: e.totalAmountPay + e2.totalAmountPay,
        totalAmountIDO: e.totalAmountIDO + e2.totalAmountIDO,
      }
    }
    return e
  })
}
