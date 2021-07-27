import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getxLuaAddress } from 'utils/addressHelpers'
import { useLuaContract, useXluaContract } from './useContract'

const useAllowanceStaking = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { chainId, account } = useWeb3React()
  const xLuaAddress = getxLuaAddress(chainId)

  const luaContract = useLuaContract(chainId)
  const xLuaContract = useXluaContract(xLuaAddress)
  const fetchAllowance = useCallback(async () => {
    try {
      const userAllowance = await luaContract.methods.allowance(account, xLuaContract.options.address).call()
      setAllowance(new BigNumber(userAllowance))
    } catch (e) {
      setAllowance(new BigNumber('0'))
    }
  }, [account, xLuaContract, luaContract])

  useEffect(() => {
    if (account && xLuaContract && luaContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, xLuaContract, luaContract, fetchAllowance])

  return allowance
}

export default useAllowanceStaking
