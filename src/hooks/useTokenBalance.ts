import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getERC20Contract, getBep20Contract, getCakeContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'

const useTokenBalance = (tokenAddress: string, account?: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account: defaultAccount, chainId, library: ethereum } = useWeb3React()
  const { fastRefresh } = useRefresh()

  const fetchBalance = async (_ethereum: any, _address: string, _account: string) => {
    const Contract = getERC20Contract(_ethereum, _address, chainId)
    try {
      const amount = await Contract.methods.balanceOf(_account).call()
      setBalance(new BigNumber(amount))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (ethereum) {
      if (account) {
        fetchBalance(ethereum, tokenAddress, account)
      } else if (defaultAccount) {
        fetchBalance(ethereum, tokenAddress, defaultAccount)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance

  // const [balance, setBalance] = useState(BIG_ZERO)
  // const { account } = useWeb3React()
  // const web3 = useWeb3()
  // const { fastRefresh } = useRefresh()

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     const contract = getBep20Contract(tokenAddress, web3)
  //     const res = await contract.methods.balanceOf(account).call()
  //     setBalance(new BigNumber(res))
  //   }

  //   if (account) {
  //     fetchBalance()
  //   }
  // }, [account, tokenAddress, web3, fastRefresh])

  // return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getCakeContract()
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3)
      const res = await contract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }

    fetchBalance()
  }, [web3, tokenAddress, slowRefresh])

  return balance
}

export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await web3.eth.getBalance(account)
      setBalance(new BigNumber(walletBalance))
    }

    if (account) {
      fetchBalance()
    }
  }, [account, web3, lastUpdated, setBalance])

  return { balance, refresh: setLastUpdated }
}

export default useTokenBalance
