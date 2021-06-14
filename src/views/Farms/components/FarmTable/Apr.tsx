import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Skeleton } from '@pancakeswap/uikit'

export interface AprProps {
  value: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  luaPrice: BigNumber
  originalValue: string
  hideButton?: boolean
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  luaPrice,
  originalValue,
  hideButton = false,
}) => {
  const { chainId } = useWeb3React()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress, chainId })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  // return originalValue !== 0 ? (
  //   <Container>
  //     {originalValue ? (
  //       <>
  //         <AprWrapper>{value}%</AprWrapper>
  //         {!hideButton && (
  //           <ApyButton lpLabel={lpLabel} cakePrice={cakePrice} apr={originalValue} addLiquidityUrl={addLiquidityUrl} />
  //         )}
  //       </>
  //     ) : (
  //       <AprWrapper>
  //         <Skeleton width={60} />
  //       </AprWrapper>
  //     )}
  //   </Container>
  // ) : (
  //   <Container>
  //     <AprWrapper>{originalValue}%</AprWrapper>
  //   </Container>
  // )

  return (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr
