import BigNumber from 'bignumber.js'
import { BIG_TEN } from './bigNumber'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, decimalsToAppear?: number) => {
  if (balance) {
    return getBalanceAmount(balance, decimals).toFixed(decimalsToAppear)
  }

  return null
}

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString(undefined, options)
}

export const formatNumberWithComma = (num: string, precision = false): string | null => {
  try {
    if (num) {
      let newNum = num
      if (precision) {
        newNum = parseFloat(num).toFixed(2)
      }
      const parts = newNum.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.').replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')
    }

    return null
  } catch (error) {
    console.log(error, 'fail to format number')
    return null
  }
}
