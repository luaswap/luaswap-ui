import React, { useCallback, useMemo } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useWeb3React } from '@web3-react/core'
import { Flex, Text, Box, AddIcon, IconButton, CopyIcon, useTooltip } from 'luastarter-uikits'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import { Pool } from 'views/Idos/types'
import useTotalDataFromAllPools from '../../hooks/useTotalDataFromAllPools'

const TokenInfoWrapper = styled(Box)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #282828;
  height: 450px;
  padding: 24px;
  margin-bottom: 40px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 24px;
  }
`
const StyledButton = styled.button`
  background: linear-gradient(to right, #f1b90c, #f0b90b);
  border-radius: 15px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 10px 0px;
  color: #353535;
  font-weight: 700;
  box-shadow: 1px 0 2px #ff1baf5d;
  border: none;
  cursor: pointer;
  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`

interface TokenInfoProps {
  currentPoolData: Pool
}

const TokenInfo: React.FC<TokenInfoProps> = ({ currentPoolData }) => {
  const { chainId } = useWeb3React()
  const { index } = currentPoolData
  const { name, idoToken = { address: '', symbol: '', decimals: '' }, img } = useTotalDataFromAllPools(currentPoolData)
  const { address, symbol, decimals } = idoToken
  const { toastSuccess, toastError } = useToast()
  const idoChainId = useMemo(() => {
    if (index) {
      return Object.keys(index)
    }

    return []
  }, [index])
  // eslint-disable-next-line consistent-return
  const onAddToken = useCallback(async () => {
    if (idoChainId.filter((cid) => Number(cid) === chainId).length !== 0) {
      const provider = (window as WindowChain).ethereum
      if (provider) {
        try {
          await provider.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address,
                symbol,
                decimals,
                image: img,
              },
            },
          })
          return true
        } catch (error) {
          console.error(error)
          return false
        }
      } else {
        console.error(`Can't add token`)
        return false
      }
    } else {
      toastError('Wrong network')
    }
  }, [address, symbol, decimals, img, idoChainId, chainId, toastError])

  return (
    <TokenInfoWrapper>
      <Flex flexDirection="column" mb="10px">
        <Text color="#8B8B8B">Name</Text>
        <Text color="#C3C3C3" bold>
          {name}
        </Text>
      </Flex>
      <Flex flexDirection="column" mb="10px">
        <Text color="#8B8B8B">Token symbol</Text>
        <Text color="#C3C3C3" bold>
          {idoToken?.symbol}
        </Text>
      </Flex>
      <Flex flexDirection="column" mb="10px">
        <Text color="#8B8B8B">
          Token Address{' '}
          <span>
            <CopyToClipboard text={idoToken?.address} onCopy={() => toastSuccess('Copied')}>
              <IconButton
                variant="text"
                style={{
                  height: 'auto',
                  width: 'auto',
                }}
              >
                <CopyIcon color="primary" width="24px" />
              </IconButton>
            </CopyToClipboard>
          </span>{' '}
        </Text>
        <Text
          color="#C3C3C3"
          bold
          style={{
            wordBreak: 'break-all',
          }}
        >
          {idoToken?.address}
        </Text>
      </Flex>
      <StyledButton onClick={onAddToken}>
        <AddIcon color="#353535" mr="5px" />
        Add token
      </StyledButton>
    </TokenInfoWrapper>
  )
}

export default TokenInfo
