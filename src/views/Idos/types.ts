export type PoolStatus = 'not open' | 'open' | 'closed' | 'claim' | null | 'preview'

export type ChainId = 89 | 1 | 88

export interface ExternalLink {
  label: string
  icon: string
  link: string
}
export interface TokenInfo {
  address: string
  symbol: string
  decimals: number
}

export interface TOUResponse {
  touApproved: boolean
  user: string
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
  swappedAmountPay: string
  totalCommittedAmount: string
  index: number
  projectId: string
  chainId: string
  vestingContract: string
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
  isWhitelist?: boolean
  isExclusive?: boolean
  whitelistLink?: string
  openAt: number
  closeAt: number
  claimAt: number
  index?: Record<string, IdoDetailInfo[]>
  status: number
  snapshootAt: number
  projectDetail: string
  links: ExternalLink[]
  socials: ExternalLink[]
  untilClaim: number
  untilClose: number
  untilOpen: number
  versionContract: number
  untilSnapshootAt: number
  percentVesting: string[]
  timeVesting: string[]
  isVesting: boolean
  isReject: boolean
}
