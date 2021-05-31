import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { IsTomoChain } from 'utils/wallet'
import axios from 'axios'
import { API_URL } from 'config'

const useLuaPrice = () => {
  const { chainId } = useWeb3React()
  const IsTomo = IsTomoChain(chainId)
  const ID = IsTomo ? 88 : 1
  const [price, setPrice] = useState(new BigNumber(0))

  const fetchBalance = useCallback(async () => {
    const { data } = await axios.get(`${API_URL[ID]}/price/LUA`)
    const value = data.usdPrice
    setPrice(new BigNumber(value * 10 ** 8))
  }, [ID])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return price
}

export default useLuaPrice
