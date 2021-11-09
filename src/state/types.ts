import BigNumber from 'bignumber.js'
import { CampaignType, FarmConfig, Nft, PoolConfig, Team } from 'config/constants/types'
import { Pool as PoolIdoDetail } from 'views/Idos/types'

export type TokenType = {
  decimals: number
  projectLink: string
  symbol: string
}

export type TranslatableText =
  | string
  | {
      key: string
      data?: {
        [key: string]: string | number
      }
    }

export interface Farm extends FarmConfig {
  tokenAmountMc?: BigNumber
  quoteTokenAmountMc?: BigNumber
  tokenAmountTotal?: BigNumber
  quoteTokenAmountTotal?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  lpTotalSupply?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  addLiquidityLink: string
  usdValue?: number
  totalToken2Value?: number
  tokenSymbol?: TokenType
  token2Symbol?: TokenType
  apy?: number
  reward?: string
  luaReward?: string
  userData?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
    earningsLua: string
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  stakingLimit?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface Tier {
  addQuantityLua: number
  addQuantityTomo: number
  tier: number
}

export interface Profile {
  totalLuaLock: string
  luaUnlockAble: string
  userTier: number | null
  nextTier: Tier[]
}

// Slices states

export interface FarmsState {
  data: Farm[]
  userDataLoaded: boolean
  farmDataLoaded: boolean
}

export interface VaultFees {
  performanceFee: number
  callFee: number
  withdrawalFee: number
  withdrawalFeePeriod: number
}

export interface VaultUser {
  isLoading: boolean
  userShares: string
  cakeAtLastUserAction: string
  lastDepositedTime: string
  lastUserActionTime: string
}
export interface CakeVault {
  totalShares?: string
  pricePerFullShare?: string
  totalCakeInVault?: string
  estimatedCakeBountyReward?: string
  totalPendingCakeHarvest?: string
  fees?: VaultFees
  userData?: VaultUser
}

export interface PoolsState {
  data: Pool[]
  cakeVault: CakeVault
}

export interface ProfileState {
  isInitialized: boolean
  isLoading: boolean
  isUnlock: boolean
  data: Profile
}

export interface IdoState {
  idos: IdoDetail[]
  isLoading: boolean
  openPools: {
    isLoading: boolean
    data: OpenPools
  }
  closedPools: {
    isLoading: boolean
    data: PoolIdoDetail[]
  }
  currentPool: {
    isLoading: boolean
    data: PoolIdoDetail
  }
}

export type TeamResponse = {
  0: string
  1: string
  2: string
  3: string
  4: boolean
}

export type TeamsById = {
  [key: string]: Team
}

export interface TeamsState {
  isInitialized: boolean
  isLoading: boolean
  data: TeamsById
}

export interface Achievement {
  id: string
  type: CampaignType
  address: string
  title: TranslatableText
  description?: TranslatableText
  badge: string
  points: number
}

export interface AchievementState {
  data: Achievement[]
}

// API Price State
export interface PriceApiList {
  /* eslint-disable camelcase */
  [key: string]: {
    name: string
    symbol: string
    price: string
    price_BNB: string
  }
}

export interface PriceApiListThunk {
  /* eslint-disable camelcase */
  [key: string]: number
}

export interface PriceApiResponse {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiList
}

export interface PriceApiThunk {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiListThunk
}

export interface PriceState {
  isLoading: boolean
  lastUpdated: string
  data: PriceApiListThunk
}

// Block

export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// Collectibles

export interface CollectiblesState {
  isInitialized: boolean
  isLoading: boolean
  data: {
    [key: string]: number[]
  }
}

// Predictions

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}

export enum PredictionStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export interface Round {
  id: string
  epoch: number
  failed?: boolean
  startBlock: number
  startAt: number
  lockAt: number
  lockBlock: number
  lockPrice: number
  endBlock: number
  closePrice: number
  totalBets: number
  totalAmount: number
  bullBets: number
  bearBets: number
  bearAmount: number
  bullAmount: number
  position: BetPosition
  bets?: Bet[]
}

export interface Market {
  id: string
  paused: boolean
  epoch: number
}

export interface Bet {
  id?: string
  hash?: string
  amount: number
  position: BetPosition
  claimed: boolean
  user?: PredictionUser
  round: Round
}

export interface PredictionUser {
  id: string
  address: string
  block: number
  totalBets: number
  totalBNB: number
}

export interface RoundData {
  [key: string]: Round
}

export interface HistoryData {
  [key: string]: Bet[]
}

export interface BetData {
  [key: string]: {
    [key: string]: Bet
  }
}

export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected',
}

export interface PredictionsState {
  status: PredictionStatus
  isLoading: boolean
  isHistoryPaneOpen: boolean
  isChartPaneOpen: boolean
  isFetchingHistory: boolean
  historyFilter: HistoryFilter
  currentEpoch: number
  currentRoundStartBlockNumber: number
  intervalBlocks: number
  bufferBlocks: number
  minBetAmount: string
  lastOraclePrice: string
  rounds: RoundData
  history: HistoryData
  bets: BetData
}
// Blockfolio
export interface BlockfolioState {
  wallets: WalletProps
}

export interface WalletProps {
  address?: string
  isConnected?: boolean
  isActive?: boolean
  walletType?: string
}

export interface DataApiType {
  totalInUSD: number
  tomochain: ApiNetworkType
  ethereum: ApiNetworkType
}

export interface ApiNetworkType {
  tag: string
  name: string
  totalStakeAmount?: number
  totalInUSD?: string
  detailsHeader: Array<string[]>
  details: ApiDetailType[]
}
export interface ApiDetailType {
  imgs: Array<string>
  link: string
  tokenName: string
  symbol: string
  address: string
  amount: string
  usd: string
}
// Global state

export interface State {
  achievements: AchievementState
  block: BlockState
  farms: FarmsState
  prices: PriceState
  pools: PoolsState
  predictions: PredictionsState
  profile: ProfileState
  teams: TeamsState
  collectibles: CollectiblesState
  blockfolio: BlockfolioState
  idos: IdoState
}
export interface IdoDetail {
  claimAt: number
  closeAt: number
  openAt: number
  creator: string
  idoToken: string
  maxAmountPay: number
  minAmountPay: number
  payToken: string
  swappedAmountIDO: number
  swappedAmountPay: number
  totalAmountIDO: number
  totalAmountPay: number
  totalCommittedAmount: number
}

export interface OpenPools {
  openingPools: PoolIdoDetail[]
  upcomingPools: PoolIdoDetail[]
}
