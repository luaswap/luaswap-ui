export type PoolStatus = 'not open' | 'open' | 'closed' | 'claim'

export type ChainId = '89'

export interface TokenInfo {
  address: string
  symbol: string
  decimals: number
}
export interface IdoDetailInfo {
  tier: string
  creator: string
  idoToken: TokenInfo
  payToken: TokenInfo
  totalAmountIDO: number
  totalAmountPay: number
  maxAmountPay: number
  minAmountPay: number
  claimAt: number
  closeAt: number
  openAt: number
  swappedAmountIDO: number
  swappedAmountPay: number
  totalCommittedAmount: number
  index: string
  chainId: string
}
export interface Pool {
  id: string
  img: string
  name: string
  description: string
  openAt: number
  closeAt: number
  claimAt: number
  index: {
    '89': IdoDetailInfo[]
  }
  status: number
}
