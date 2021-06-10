import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useWeb3 from 'hooks/useWeb3'
import { getFullDisplayBalance } from 'utils/formatBalance'

const useEthBalance = () => {
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    if (web3 && account) {
      web3.eth.getBalance(account).then((data) => {
        const newBalance = getFullDisplayBalance(new BigNumber(data), 18, 2)
        setBalance(newBalance)
      })
    }
  }, [web3, account, chainId])

  return balance
}

export default useEthBalance
