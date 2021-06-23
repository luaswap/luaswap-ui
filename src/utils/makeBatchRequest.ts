import Web3 from 'web3'
import { getWeb3NoAccount } from './web3'

/**
 * Accepts an array of contract method calls and batches them
 *
 * Example:
 *
 * [
 *  contract.method.balanceOf().call,
 *  contract.method.startBlockNumber().call
 * ]
 */
const makeBatchRequest = (calls: any[], web3?: Web3): Promise<any[]> => {
  try {
    const web3Instance = web3 || getWeb3NoAccount()
    const batch = new web3Instance.BatchRequest

    const promises = calls.map((call) => {
      return new Promise((resolve, reject) => {
        batch.add(
          call.request({}, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          }),
        )
      })
    })

    batch.execute()

    return Promise.all(promises)
  } catch {
    return null
  }
}

export default makeBatchRequest
