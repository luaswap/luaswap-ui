export type PoolStatus = 'not open' | 'open' | 'closed' | 'claim' | null

export type ChainId = 89 | 1 | 88

export interface TokenInfo {
  address: string
  symbol: string
  decimals: number
}
export interface IdoDetailInfo {
  tier: number
  addressIdoContract: string
  creator: string
  idoToken: TokenInfo
  payToken: TokenInfo
  totalAmountIDO: string
  totalAmountPay: string
  maxAmountPay: number
  minAmountPay: number
  claimAt: number
  closeAt: number
  openAt: number
  swappedAmountIDO: string
  swappedAmountPay: number
  totalCommittedAmount: string
  index: number
  projectId: string
  chainId: string
}

export interface FormatPool extends IdoDetailInfo {
  img: string
  name: string
  description: string
  status
}
export interface Pool {
  id: string
  img: string
  name: string
  description: string
  isPresent: boolean
  openAt: number
  closeAt: number
  claimAt: number
  index?: Record<string, IdoDetailInfo[]>
  status: number
  snapshootAt: number
  projectDetail: string
  links: {
    label: string
    icon: string
    link: string
  }[]
}
