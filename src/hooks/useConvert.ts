import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getMakerAddress } from 'utils/addressHelpers'
import { luaConvert } from 'utils/callHelpers'
import { useLuaMakerContract } from './useContract'

const useConvert = () => {
  const { chainId, account } = useWeb3React()
  const luaMakerAddress = getMakerAddress(chainId)
  const luaMakerContract = useLuaMakerContract(luaMakerAddress)
  const handle = useCallback(
    async (token0: string, token1: string) => {
      const txHash = await luaConvert(luaMakerContract, token0, token1, account, chainId)
      console.log('txHash:', txHash)
    },
    [account, chainId, luaMakerContract],
  )

  return { onConvert: handle }
}

export default useConvert
