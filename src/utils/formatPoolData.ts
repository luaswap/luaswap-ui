import BigNumber from 'bignumber.js'
import { IdoDetail } from 'state/types'
import { IdoDetailInfo } from 'views/Idos/types'

// eslint-disable-next-line import/prefer-default-export
export const formatPoolDetail = (allTierPool: IdoDetailInfo[]): IdoDetailInfo => {
  const mappedIndex = {}
  const filteredData = allTierPool.filter((data) => data.tier !== 0)
  return filteredData.reduce(
    (accumulate, currentItem) => {
      if (!mappedIndex[currentItem.index]) {
        mappedIndex[currentItem.index] = true
        return {
          ...accumulate,
          totalCommittedAmount: new BigNumber(accumulate.totalCommittedAmount)
            .plus(new BigNumber(currentItem.totalCommittedAmount))
            .toString(),
          totalAmountPay: new BigNumber(accumulate.totalAmountPay)
            .plus(new BigNumber(currentItem.totalAmountPay))
            .toString(),
          totalAmountIDO: new BigNumber(accumulate.totalAmountIDO)
            .plus(new BigNumber(currentItem.totalAmountIDO))
            .toString(),
          swappedAmountIDO: new BigNumber(accumulate.swappedAmountIDO)
            .plus(new BigNumber(currentItem.swappedAmountIDO))
            .toString(),
        }
      }
      return {
        ...accumulate,
      }
    },
    {
      ...filteredData[0],
      totalCommittedAmount: '0',
      totalAmountPay: '0',
      totalAmountIDO: '0',
      swappedAmountIDO: '0',
    },
  )
}

export const formatIdoContract = (allTierPool: IdoDetail[]): IdoDetail => {
  return allTierPool.reduce(
    (accumulate, currentItem) => {
      return {
        ...accumulate,
        totalCommittedAmount: accumulate.totalCommittedAmount + currentItem.totalCommittedAmount,
        totalAmountPay: accumulate.totalAmountPay + currentItem.totalAmountPay,
        totalAmountIDO: accumulate.totalAmountIDO + currentItem.totalAmountIDO,
        swappedAmountIDO: accumulate.swappedAmountIDO + currentItem.swappedAmountIDO,
      }
    },
    {
      ...allTierPool[0],
      totalCommittedAmount: 0,
      totalAmountPay: 0,
      totalAmountIDO: 0,
      swappedAmountIDO: 0,
    },
  )
}

export const formatPoolTotalTierByChainID = (
  allTierPool1: IdoDetailInfo[],
  allTierPool2: IdoDetailInfo[],
): IdoDetailInfo[] => {
  return allTierPool1.map((e) => {
    const e2 = allTierPool2.find((p) => p.tier === e.tier)
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
