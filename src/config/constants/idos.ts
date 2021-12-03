/* eslint-disable import/prefer-default-export */
export const tierMap = {
  0: '',
  1: 'Earth',
  2: 'Moon',
  3: 'Mars',
  4: 'Galaxy',
}

export const supportIdoNetwork = {
  89: 'Tomo Testnet',
  88: 'Tomochain',
  56: 'BSC',
  1: 'Ethereum',
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const TIER_HOVER_CONTENT =
  'The following types of assets on both Ethereum and TomoChain will be taken into account for tier qualification:\n- LUA staked in LuaSafe\n- LUA staked in LUA-TOMO(E) pools (with a multiple of 2)\n\nHold LUA in LuaSafe or LUA- TOMO(E) pool (on TomoChain or Ethereum) at least 3 days before and remain staked until the IDO opens.'

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
