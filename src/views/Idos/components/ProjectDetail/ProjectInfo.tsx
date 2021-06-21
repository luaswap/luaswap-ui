import React from 'react'
import { Flex, Button, Text } from 'common-uikitstrungdao'
import styled from 'styled-components'

const StyledWrapper = styled(Flex)`
  width: 100%;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 60%;
    margin-right: 24px;
  }
`

const ProjectInfo = () => {
  return (
    <StyledWrapper flexDirection="column">
      <Flex>
        <Button mr="10px" variant="tertiary">
          WEBSITE
        </Button>
        <Button mr="10px" variant="tertiary">
          WHITEPAPER
        </Button>
        <Button mr="10px" variant="tertiary">
          TOMOSCAN
        </Button>
      </Flex>
      <Text mt="20px">
        Mercurial Finance Mercurial is building DeFi’s first dynamic vaults for stable assets on Solana, providing the
        technical tools for users to easily deposit, swap and mint stable assets. <br />
        <br />
        Innovations <br />
        Mercurial will be introducing several key new technical innovations, including on-chain algorithms to regulate
        the flow of assets and dynamic fees that tap on the market and price data to assist LPs in optimizing
        performance. We will also be developing a unique pricing curve that will be the first to combine high
        efficiency, multi-token support, and generalizability for all types of token sets. <br />
        <br />
        Maximizing Capital Utlilization <br />
        Mercurial vaults will dynamically utilize assets for a wide range of use cases, like low slippage swaps,
        lending, flash loans, and external third-party decentralized protocols. To increase pegged assets availability
        on Solana, we will allow the creation of synthetics, like mUSD or mBTC, which can be added to our vaults to
        improve liquidity for other stables and facilitate interaction with other third-party decentralized protocols.{' '}
        <br />
        <br />
        Starting with a vault for the most common stables, for example, USDC, USDT, wUSDC, and wDAI, we will be
        facilitating low slippage swaps with dynamic fees. Features will be added as key technical and ecosystem pieces
        become available on Solana, i.e. inter-program composability, price oracles, etc.
      </Text>
    </StyledWrapper>
  )
}

export default ProjectInfo
