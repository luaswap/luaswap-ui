import BigNumber from 'bignumber.js'
import { DEFAULT_GAS, DEFAULT_TOKEN_DECIMAL } from 'config'
import { ethers } from 'ethers'
import { BIG_TEN, BIG_ZERO } from './bigNumber'

export const approve = async (lpContract, masterChefContract, account, chainId?) => {
  const gasLimit = chainId === 88 ? { from: account, gasLimit: '0x7A120' } : { from: account }
  const res = await lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send(gasLimit)
  return res
}

export const stake = async (masterChefContract, pid, amount, account, chainId?) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
  //     .send({ from: account, gas: DEFAULT_GAS })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }
  const gasLimit = chainId === 88 ? { from: account, gasLimit: '0x7A120' } : { from: account }
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send(gasLimit)
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// TODO: should change the index of the IDO contract
export const depositIdo = async (luaIdoContract, account, amount) => {
  return luaIdoContract.methods
    .commit('0', amount)
    .send({
      from: account,
      value: amount,
    })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const claimRewardIdo = async (luaIdoContract, account, amount) => {
  const commitedAmount = await luaIdoContract.methods.userCommitedAmount(account, 0).call()
  return luaIdoContract.methods
    .userClaim('0', account, amount)
    .send({
      from: account,
    })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: DEFAULT_GAS, value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account, chainId?) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
  //     .send({ from: account, gas: DEFAULT_GAS })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }
  const gasLimit = chainId === 88 ? { from: account, gasLimit: '0x7A120' } : { from: account }
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send(gasLimit)
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account, chainId) => {
  const gasLimit = chainId === 88 ? { from: account, gasLimit: '0x7A120' } : { from: account }
  return masterChefContract.methods
    .claimReward(pid)
    .send(gasLimit)
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account, gas: DEFAULT_GAS })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: DEFAULT_GAS, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
