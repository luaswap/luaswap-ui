/* eslint-disable import/no-cycle */
import { getBalanceNumber } from 'utils/formatBalance'
import { IdoDetail } from '../types'

// eslint-disable-next-line import/prefer-default-export
export const mappingIdoResponse = ({
  claimAt,
  closeAt,
  creator,
  idoToken,
  maxAmountPay,
  minAmountPay,
  openAt,
  payToken,
  swappedAmountIDO,
  swappedAmountPay,
  totalAmountIDO,
  totalAmountPay,
  totalCommittedAmount,
}): IdoDetail => {
  return {
    claimAt,
    closeAt,
    creator,
    idoToken,
    maxAmountPay: getBalanceNumber(maxAmountPay),
    minAmountPay: getBalanceNumber(minAmountPay),
    openAt,
    payToken,
    swappedAmountIDO: getBalanceNumber(swappedAmountIDO),
    swappedAmountPay: getBalanceNumber(swappedAmountPay),
    totalAmountIDO: getBalanceNumber(totalAmountIDO),
    totalAmountPay: getBalanceNumber(totalAmountPay),
    totalCommittedAmount: getBalanceNumber(totalCommittedAmount),
  }
}

// export const fetchIdosInformation = async (chainId: number, web3?: Web3): Promise<IdoDetail[]> => {
//   try {
//     const idoList = []
//     const luaIdoContract = getLuaIdoContract(web3, chainId)
//     const numberOfIdo = await luaIdoContract.methods.numberOfIDO().call()

//     for (let i = 0; i < numberOfIdo; i++) {
//       const idoDetail = luaIdoContract.methods.IDOs(i).call()
//       idoList.push(idoDetail)
//     }

//     const result = await Promise.all(idoList)
//     return result.map((item) => mappingIdoResponse(item))
//   } catch (error) {
//     console.log(error, 'fail to fetch')
//     return []
//   }
// }
