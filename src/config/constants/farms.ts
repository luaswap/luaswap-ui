import tokens from './tokens'
import { FarmConfig } from './types'

// Tomo supported pools
const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'LUA-TOMO',
    lpAddresses: {
      88: '0x810a21afe69fe356697a9824930904383930bd96',
    },
    token: tokens.lua,
    quoteToken: tokens.tomo,
  },
  {
    pid: 1,
    lpSymbol: 'USDT-TOMO',
    lpAddresses: {
      88: '0x347f551eaba062167779c9c336aa681526857b81',
    },
    token: tokens.usdt,
    quoteToken: tokens.tomo,
  },
  {
    pid: 2,
    lpSymbol: 'FTT-TOMO',
    lpAddresses: {
      88: '0x8791df121adf1ef4d4fd249da9dfb81711c3f297',
    },
    token: tokens.ftt,
    quoteToken: tokens.tomo,
  },
  {
    pid: 3,
    lpSymbol: 'TOMO-SRM',
    lpAddresses: {
      88: '0x48f623f8d7db6bc05005b8d978c3fde1b396dea6',
    },
    token: tokens.tomo,
    quoteToken: tokens.srm,
  },
  {
    pid: 4,
    lpSymbol: 'ETH-TOMO',
    lpAddresses: {
      88: '0x75f1b142eebc21d7e118eb67cac7f062ab1fc761',
    },
    token: tokens.eth,
    quoteToken: tokens.tomo,
  },
  {
    pid: 5,
    lpSymbol: 'ETH-LUA',
    lpAddresses: {
      88: '0x54a12b95a207e7db77cac8b7cdfcd5e90168187d',
    },
    token: tokens.eth,
    quoteToken: tokens.lua,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-LUA',
    lpAddresses: {
      88: '0x08975663ac228c6d208fa32c968569e5939fb634',
    },
    token: tokens.usdt,
    quoteToken: tokens.lua,
  },
  {
    pid: 7,
    lpSymbol: 'ETH-USDT',
    lpAddresses: {
      88: '0x9376b2088c63715073ba89d9a179c102e506c04d',
    },
    token: tokens.eth,
    quoteToken: tokens.usdt,
  }
]

const supportedPools: FarmConfig[] = [
  {
    pid: 3,
    lpSymbol: 'LUA-USDC',
    lpAddresses: {
      1: '0x96258bb42779bf300cf69c9b5bd2ba5245cb4bc4',
    },
    token: tokens.lua,
    quoteToken: tokens.usdc,
  },
  {
    pid: 0,
    lpSymbol: 'TOMOE-ETH',
    lpAddresses: {
      1: '0x7885e359a085372EbCF1ed6829402f149D02c600',
    },
    token: tokens.tomoe,
    quoteToken: tokens.eth,
  },
  {
    pid: 1,
    lpSymbol: 'TOMOE-USDT',
    lpAddresses: {
      1: '0xbFFD9FF55685A3B6940C59DCDCc69b1737363BE0',
    },
    token: tokens.tomoe,
    quoteToken: tokens.eth,
  },
  {
    pid: 9,
    lpSymbol: 'LUA-ETH',
    lpAddresses: {
      1: '0x65FaBAF7e6c5380243E063D8559d84e589Db6438',
    },
    token: tokens.lua,
    quoteToken: tokens.eth,
  },
  {
    pid: 8,
    lpSymbol: 'LUA-FTT',
    lpAddresses: {
      1: '0x38F9307839A8E82b071EA6Fcbef029814Ed88fcb',
    },
    token: tokens.lua,
    quoteToken: tokens.ftt,
  },
  {
    pid: 15,
    lpSymbol: 'ETH-USDT',
    lpAddresses: {
      1: '0xd6be3b9780572f0215afb3e4d15751955503cebe',
    },
    token: tokens.eth,
    quoteToken: tokens.usdt,
  },
  {
    pid: 7,
    lpSymbol: 'LUA-SRM',
    lpAddresses: {
      1: '0x26Da27Cd29D75BcD925665223B4416025450d756',
    },
    token: tokens.lua,
    quoteToken: tokens.srm,
  },
  {
    pid: 13,
    lpSymbol: 'WBTC-USDC',
    lpAddresses: {
      1: '0x66E10dEa0019dC7353D2e4106E9b84f1CFc17CBa',
    },
    token: tokens.lua,
    quoteToken: tokens.srm,
  },
  {
    pid: 4,
    lpSymbol: 'LUA-TOMOE',
    lpAddresses: {
      1: '0xE2f4cC0198150a7beA98E0a2A66fecafC30a5cD0',
    },
    token: tokens.lua,
    quoteToken: tokens.tomoe,
  },
  {
    pid: 2,
    lpSymbol: 'TOMOE-USDC',
    lpAddresses: {
      1: '0xB10C1840f562f0ac914DA2bad3290833C75fdddF',
    },
    token: tokens.tomoe,
    quoteToken: tokens.usdc,
  },
  {
    pid: 14,
    lpSymbol: 'UNI-LUA',
    lpAddresses: {
      1: '0xb195325642431b6aA6CD3C646591e7825BB3F90c',
    },
    token: tokens.tomoe,
    quoteToken: tokens.lua,
  },
  {
    pid: 12,
    lpSymbol: 'USDC-USDT',
    lpAddresses: {
      1: '0xB3558F47Fa914F7ec1dA1a6F52aB41eE63E81301',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdt,
  },
  {
    pid: 5,
    lpSymbol: 'LUA-FRONT',
    lpAddresses: {
      1: '0x97e1081c5DECB27606dbcDEA9d8E615757aB11c4',
    },
    token: tokens.lua,
    quoteToken: tokens.front,
  },
  {
    pid: 17,
    lpSymbol: 'KAT-USDT',
    lpAddresses: {
      1: '0x187230ce611269b0b9fdbb62278b6c70f6ec428a',
    },
    token: tokens.lua,
    quoteToken: tokens.usdt,
  },
  {
    pid: 10,
    lpSymbol: 'LUA-KAI',
    lpAddresses: {
      1: '0xeAAc91B4B28b97236605B1D40178D83C273dbe80',
    },
    token: tokens.lua,
    quoteToken: tokens.kai,
  },
  {
    pid: 11,
    lpSymbol: 'LUA-OM',
    lpAddresses: {
      1: '0xfa1B8F29D9505d18b22F823B82E7Da886Dfc8bdf',
    },
    token: tokens.lua,
    quoteToken: tokens.om,
  },
  {
    pid: 6,
    lpSymbol: 'LUA-SUSHI',
    lpAddresses: {
      1: '0xc9a72CC23f900b381FC6355afD8ee674B1F12DF6',
    },
    token: tokens.lua,
    quoteToken: tokens.sushi,
  },
  {
    pid: 16,
    lpSymbol: 'RAMP-USDT',
    lpAddresses: {
      1: '0x627846f6131a4631ddf6bb53bd682ccf51f623b3',
    },
    token: tokens.ramp,
    quoteToken: tokens.usdt,
  },
]

export default farms
