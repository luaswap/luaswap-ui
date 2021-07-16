// Set of helper functions to facilitate wallet setup

import { ChainId } from '@luaswap/sdk'
// import { NetworkOptions } from 'common-uikitstrungdao'
import getRpcUrl from './getRpcUrl'

/**
 * Prompt the user to add a network as a network on Metamask, or switch to other network if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const connectNetwork = async (options) => {
  const { chainName, nativeCurrency, chainId } = options
  const provider = (window as WindowChain).ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName,
            nativeCurrency,
            rpcUrls: [getRpcUrl(chainId)],
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error(`Can't setup the ${chainName} network on metamask because window.ethereum is undefined`)
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as WindowChain).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}

export function IsTomoChain(chainId: ChainId | undefined) {
  return chainId === 88 || chainId === 89 || chainId === 99
}
