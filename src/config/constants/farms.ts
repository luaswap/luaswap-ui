import tokens from './tokens'
import { FarmConfig } from './types'

// Tomo supported pools
export const tomoSupportedPools: FarmConfig[] = [
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
    addLiquidityLink:'https://app.luaswap.org/#/add/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    pairLink:'https://info.luaswap.org/tomochain/pair/0x810a21afe69fe356697a9824930904383930bd96',
  },
  {
    pid: 1,
    lpSymbol: 'USDT-TOMO',
    lpAddresses: {
      88: '0x347f551eaba062167779c9c336aa681526857b81',
    },
    token: tokens.usdt,
    quoteToken: tokens.tomo,
    addLiquidityLink:'https://app.luaswap.org/#/add/0x381B31409e4D220919B2cFF012ED94d70135A59e/TOMO',
    pairLink:'https://info.luaswap.org/tomochain/pair/0x347f551eaba062167779c9c336aa681526857b81',
  },
  {
    pid: 2,
    lpSymbol: 'FTT-TOMO',
    lpAddresses: {
      88: '0x8791df121adf1ef4d4fd249da9dfb81711c3f297',
    },
    token: tokens.ftt,
    quoteToken: tokens.tomo,
    pairLink:'https://info.luaswap.org/tomochain/pair/0x8791df121adf1ef4d4fd249da9dfb81711c3f297',
    addLiquidityLink:'https://app.luaswap.org/#/add/0x33fa3c0c714638f12339F85dae89c42042a2D9Af/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC',
  },
  {
    pid: 3,
    lpSymbol: 'TOMO-SRM',
    lpAddresses: {
      88: '0x48f623f8d7db6bc05005b8d978c3fde1b396dea6',
    },
    token: tokens.tomo,
    quoteToken: tokens.srm,
    pairLink:'https://info.luaswap.org/tomochain/pair/0x8791df121adf1ef4d4fd249da9dfb81711c3f297',
    addLiquidityLink:'https://app.luaswap.org/#/add/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC/0xc01643aC912B6a8ffC50CF8c1390934A6142bc91',
  },
  {
    pid: 4,
    lpSymbol: 'ETH-TOMO',
    lpAddresses: {
      88: '0x75f1b142eebc21d7e118eb67cac7f062ab1fc761',
    },
    token: tokens.eth,
    pairLink:'https://info.luaswap.org/tomochain/pair/0x75f1b142eebc21d7e118eb67cac7f062ab1fc761',
    addLiquidityLink:'https://app.luaswap.org/#/add/0x2EAA73Bd0db20c64f53fEbeA7b5F5E5Bccc7fb8b/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC',
    quoteToken: tokens.tomo,
  },
  {
    pid: 5,
    lpSymbol: 'ETH-LUA',
    lpAddresses: {
      88: '0x54a12b95a207e7db77cac8b7cdfcd5e90168187d',
    },
    token: tokens.eth,
    addLiquidityLink:'https://app.luaswap.org/#/add/0x2EAA73Bd0db20c64f53fEbeA7b5F5E5Bccc7fb8b/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
    pairLink:'https://info.luaswap.org/tomochain/pair/0x54a12b95a207e7db77cac8b7cdfcd5e90168187d',
    quoteToken: tokens.lua,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-LUA',
    lpAddresses: {
      88: '0x08975663ac228c6d208fa32c968569e5939fb634',
    },
    token: tokens.usdt,
    addLiquidityLink:'https://app.luaswap.org/#/add/0x381B31409e4D220919B2cFF012ED94d70135A59e/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
    pairLink:'https://info.luaswap.org/tomochain/pair/0x08975663ac228c6d208fa32c968569e5939fb634',
    quoteToken: tokens.lua,
  },
  {
    pid: 7,
    lpSymbol: 'ETH-USDT',
    lpAddresses: {
      88: '0x9376b2088c63715073ba89d9a179c102e506c04d',
    },
    token: tokens.eth,
    pairLink:'https://info.luaswap.org/tomochain/pair/0x9376b2088c63715073ba89d9a179c102e506c04d',
    addLiquidityLink:'https://app.luaswap.org/#/add/0x2EAA73Bd0db20c64f53fEbeA7b5F5E5Bccc7fb8b/0x381B31409e4D220919B2cFF012ED94d70135A59e',
    quoteToken: tokens.usdt,
  },
]

export const allPools: FarmConfig[] = [
  {
    pid: 3,
    lpSymbol: 'LUA-USDC',
    lpAddresses: {
      1: '0x96258bb42779bf300cf69c9b5bd2ba5245cb4bc4',
    },
    token: tokens.lua,
    quoteToken: tokens.usdc,
    pairLink: "https://info.luaswap.org/pair/0x96258BB42779Bf300cf69c9B5bD2Ba5245CB4bc4",
    addLiquidityLink: "https://app.luaswap.org/#/add/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    pid: 0,
    lpSymbol: 'TOMOE-ETH',
    lpAddresses: {
      1: '0x7885e359a085372EbCF1ed6829402f149D02c600',
    },
    token: tokens.tomoe,
    quoteToken: tokens.eth,
    pairLink: "https://info.luaswap.org/pair/0x7885e359a085372EbCF1ed6829402f149D02c600",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/ETH",
  },
  {
    pid: 1,
    lpSymbol: 'TOMOE-USDT',
    lpAddresses: {
      1: '0xbFFD9FF55685A3B6940C59DCDCc69b1737363BE0',
    },
    token: tokens.tomoe,
    quoteToken: tokens.eth,
    pairLink: "https://info.luaswap.org/pair/0xbFFD9FF55685A3B6940C59DCDCc69b1737363BE0",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    pid: 9,
    lpSymbol: 'LUA-ETH',
    lpAddresses: {
      1: '0x65FaBAF7e6c5380243E063D8559d84e589Db6438',
    },
    token: tokens.lua,
    quoteToken: tokens.eth,
    pairLink: "https://info.luaswap.org/pair/0x65FaBAF7e6c5380243E063D8559d84e589Db6438",
    addLiquidityLink: "https://app.luaswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/ETH",
  },
  {
    pid: 8,
    lpSymbol: 'LUA-FTT',
    lpAddresses: {
      1: '0x38F9307839A8E82b071EA6Fcbef029814Ed88fcb',
    },
    token: tokens.lua,
    quoteToken: tokens.ftt,
    pairLink: "https://info.luaswap.org/pair/0x38F9307839A8E82b071EA6Fcbef029814Ed88fcb",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc",
  },
  {
    pid: 15,
    lpSymbol: 'ETH-USDT',
    lpAddresses: {
      1: '0xd6be3b9780572f0215afb3e4d15751955503cebe',
    },
    token: tokens.eth,
    quoteToken: tokens.usdt,
    pairLink: "https://info.luaswap.org/pair/0xd6be3b9780572f0215afb3e4d15751955503cebe",
    addLiquidityLink: "https://app.luaswap.org/#/add/ETH/0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    pid: 7,
    lpSymbol: 'LUA-SRM',
    lpAddresses: {
      1: '0x26Da27Cd29D75BcD925665223B4416025450d756',
    },
    token: tokens.lua,
    quoteToken: tokens.srm,
    pairLink: "https://info.luaswap.org/pair/0x26Da27Cd29D75BcD925665223B4416025450d756",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc",
  },
  {
    pid: 13,
    lpSymbol: 'WBTC-USDC',
    lpAddresses: {
      1: '0x66E10dEa0019dC7353D2e4106E9b84f1CFc17CBa',
    },
    token: tokens.lua,
    quoteToken: tokens.srm,
    pairLink: "https://info.luaswap.org/pair/0x66E10dEa0019dC7353D2e4106E9b84f1CFc17CBa",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  {
    pid: 4,
    lpSymbol: 'LUA-TOMOE',
    lpAddresses: {
      1: '0xE2f4cC0198150a7beA98E0a2A66fecafC30a5cD0',
    },
    token: tokens.lua,
    quoteToken: tokens.tomoe,
    pairLink: "https://info.luaswap.org/pair/0xE2f4cC0198150a7beA98E0a2A66fecafC30a5cD0",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc",
  },
  {
    pid: 2,
    lpSymbol: 'TOMOE-USDC',
    lpAddresses: {
      1: '0xB10C1840f562f0ac914DA2bad3290833C75fdddF',
    },
    token: tokens.tomoe,
    quoteToken: tokens.usdc,
    pairLink: "https://info.luaswap.org/pair/0xB10C1840f562f0ac914DA2bad3290833C75fdddF",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  {
    pid: 14,
    lpSymbol: 'UNI-LUA',
    lpAddresses: {
      1: '0xb195325642431b6aA6CD3C646591e7825BB3F90c',
    },
    token: tokens.tomoe,
    quoteToken: tokens.lua,
    pairLink: "https://info.luaswap.org/pair/0xb195325642431b6aA6CD3C646591e7825BB3F90c",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc",
  },
  {
    pid: 12,
    lpSymbol: 'USDC-USDT',
    lpAddresses: {
      1: '0xB3558F47Fa914F7ec1dA1a6F52aB41eE63E81301',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdt,
    pairLink: "https://info.luaswap.org/pair/0xb195325642431b6aA6CD3C646591e7825BB3F90c",
    addLiquidityLink: "https://app.luaswap.org/#/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    pid: 5,
    lpSymbol: 'LUA-FRONT',
    lpAddresses: {
      1: '0x97e1081c5DECB27606dbcDEA9d8E615757aB11c4',
    },
    token: tokens.lua,
    quoteToken: tokens.front,
    pairLink: "https://info.luaswap.org/pair/0x97e1081c5DECB27606dbcDEA9d8E615757aB11c4",
    addLiquidityLink: "https://app.luaswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xf8c3527cc04340b208c854e985240c02f7b7793f",
  },
  {
    pid: 17,
    lpSymbol: 'KAT-USDT',
    lpAddresses: {
      1: '0x187230ce611269b0b9fdbb62278b6c70f6ec428a',
    },
    token: tokens.lua,
    quoteToken: tokens.usdt,
    pairLink: "https://info.luaswap.org/pair/0x187230ce611269b0b9fdbb62278b6c70f6ec428a",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x14da230d6726c50f759bc1838717f8ce6373509c/0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    pid: 10,
    lpSymbol: 'LUA-KAI',
    lpAddresses: {
      1: '0xeAAc91B4B28b97236605B1D40178D83C273dbe80',
    },
    token: tokens.lua,
    pairLink: "https://info.luaswap.org/pair/0xeAAc91B4B28b97236605B1D40178D83C273dbe80",
    addLiquidityLink: "https://app.luaswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xd9ec3ff1f8be459bb9369b4e79e9ebcf7141c093",
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
    pairLink: "https://info.luaswap.org/pair/0xfa1B8F29D9505d18b22F823B82E7Da886Dfc8bdf",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x2baecdf43734f22fd5c152db08e3c27233f0c7d2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc",
  },
  {
    pid: 6,
    lpSymbol: 'LUA-SUSHI',
    lpAddresses: {
      1: '0xc9a72CC23f900b381FC6355afD8ee674B1F12DF6',
    },
    token: tokens.lua,
    pairLink: "https://info.luaswap.org/pair/0xc9a72CC23f900b381FC6355afD8ee674B1F12DF6",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc",
    quoteToken: tokens.sushi,
  },
  {
    pid: 16,
    lpSymbol: 'RAMP-USDT',
    lpAddresses: {
      1: '0x627846f6131a4631ddf6bb53bd682ccf51f623b3',
    },
    token: tokens.ramp,
    pairLink: "https://info.luaswap.org/pair/0x627846f6131a4631ddf6bb53bd682ccf51f623b3",
    addLiquidityLink: "https://app.luaswap.org/#/add/0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f/0xdac17f958d2ee523a2206206994597c13d831ec7",
    quoteToken: tokens.usdt,
  },
]
