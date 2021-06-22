import Web3 from 'web3'
import { getLuaIdoContract } from 'utils/contractHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'

export interface IdoDetail {
  claimAt: string
  closeAt: string
  creator: string
  idoToken: string
  maxAmountPay: string
  minAmountPay: string
  openAt: string
  payToken: string
  swappedAmountIDO: string
  swappedAmountPay: string
  totalAmountIDO: string
  totalAmountPay: string
  totalCommittedAmount: string
}

const mappingIdoResponse = (idoList: any[]): IdoDetail[] => {
  const result: IdoDetail[] = []
  idoList.forEach(({
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
  }) => {
    result.push({
      claimAt,
      closeAt,
      creator,
      idoToken,
      maxAmountPay: getFullDisplayBalance(maxAmountPay),
      minAmountPay: getFullDisplayBalance(minAmountPay),
      openAt,
      payToken,
      swappedAmountIDO,
      swappedAmountPay,
      totalAmountIDO: getFullDisplayBalance(totalAmountIDO),
      totalAmountPay: getFullDisplayBalance(totalAmountPay),
      totalCommittedAmount,
    })
  })

  return result
}

export const fetchIdosInformation = async (chainId: number, web3?: Web3): Promise<IdoDetail[]> => {
  try {
    const idoList = []
    const luaIdoContract = getLuaIdoContract(web3, chainId)
    const numberOfIdo = await luaIdoContract.methods.numberOfIDO().call()

    for (let i = 0; i < numberOfIdo; i++) {
      const idoDetail = luaIdoContract.methods.IDOs(i).call()
      idoList.push(idoDetail)
    }

    const result = await Promise.all(idoList)
    return mappingIdoResponse(result)
  } catch (error) {
    return []
  }
}