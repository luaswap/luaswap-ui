import React from 'react'
import { Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import PoolDetail from './PoolDetail'
import IdoLayout from './IdoLayout'
import { Pool } from '../types'

const Row = styled.div`
  max-width: 600px;
  margin: 0 auto;
`
const pools: Pool[] = [
  {
    id: 'lua-nft-1',
    img: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC/logo.png',
    name: 'LuaNFT',
    description: 'The first NFT asset management plathform for digital art.',
    openAt: 1624579200,
    closeAt: 1624838400,
    claimAt: 1625011200,
    index: {
      '89': [
        {
          creator: '0xa8B75ac5e021dbF9a18439A006c0Dc49804B11fa',
          idoToken: {
            address: '0x0AD4A9eEa1b65A1636fcAd5bcA137Ac0eb054f30',
            symbol: 'IDOT',
            decimals: 18,
          },
          payToken: {
            address: '0x54F609872cDc2a686e14e0D8B7Bf39A47C959214',
            symbol: 'PAYT',
            decimals: 18,
          },
          totalAmountIDO: 500,
          totalAmountPay: 50,
          minAmountPay: 1,
          maxAmountPay: 5,
          openAt: 1624579200,
          closeAt: 1624838400,
          claimAt: 1625011200,
          swappedAmountIDO: 0,
          swappedAmountPay: 0,
          totalCommittedAmount: 0,
          index: '0',
          chainId: '89',
          tier: '1',
        },
        {
          creator: '0xa8B75ac5e021dbF9a18439A006c0Dc49804B11fa',
          idoToken: {
            address: '0x0AD4A9eEa1b65A1636fcAd5bcA137Ac0eb054f30',
            symbol: 'IDOT',
            decimals: 18,
          },
          payToken: {
            address: '0x54F609872cDc2a686e14e0D8B7Bf39A47C959214',
            symbol: 'PAYT',
            decimals: 18,
          },
          totalAmountIDO: 500,
          totalAmountPay: 100,
          minAmountPay: 1,
          maxAmountPay: 5,
          openAt: 1624579200,
          closeAt: 1624838400,
          claimAt: 1625011200,
          swappedAmountIDO: 0,
          swappedAmountPay: 0,
          totalCommittedAmount: 0,
          index: '1',
          chainId: '89',
          tier: '2',
        },
        {
          creator: '0xa8B75ac5e021dbF9a18439A006c0Dc49804B11fa',
          idoToken: {
            address: '0x0AD4A9eEa1b65A1636fcAd5bcA137Ac0eb054f30',
            symbol: 'IDOT',
            decimals: 18,
          },
          payToken: {
            address: '0x54F609872cDc2a686e14e0D8B7Bf39A47C959214',
            symbol: 'PAYT',
            decimals: 18,
          },
          totalAmountIDO: 500,
          totalAmountPay: 200,
          minAmountPay: 1,
          maxAmountPay: 5,
          openAt: 1624579200,
          closeAt: 1624838400,
          claimAt: 1625011200,
          swappedAmountIDO: 0,
          swappedAmountPay: 0,
          totalCommittedAmount: 0,
          index: '2',
          chainId: '89',
          tier: '3',
        },
      ],
    },
    status: 1,
  },
]

const CurrentIdo = () => {
  return (
    <IdoLayout>
      <Text fontSize="20px" textAlign="center">
        Opening Pools
      </Text>
      <Row>
        {pools.map((pool) => {
          return <PoolDetail pool={pool} />
        })}
      </Row>
      {/* <Text fontSize="20px" textAlign="center">
        Upcoming Pools
      </Text>
      <Row>
        <PoolDetail status="Opening" />
      </Row> */}
    </IdoLayout>
  )
}

export default CurrentIdo
