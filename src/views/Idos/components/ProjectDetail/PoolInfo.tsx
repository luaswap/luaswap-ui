import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Flex, CopyIcon, Text, Box, IconButton } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import useToast from 'hooks/useToast'
import { Pool } from 'views/Idos/types'
import { getUtcDateString } from 'utils/formatTime'
import useTotalDataFromAllPools from '../../hooks/useTotalDataFromAllPools'

const ProjectInfoWrapper = styled(Box)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  height: 450px;
  background-color: #282828;
  margin-bottom: 0px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 24px;
    margin-bottom: 40px;
  }
`

interface PoolInfoProps {
  currentPoolData: Pool
}

const PoolInfo: React.FC<PoolInfoProps> = ({ currentPoolData }) => {
  const { totalAmountIDO, openAt, closeAt, addressIdoContract, totalAmountPay, payToken } =
    useTotalDataFromAllPools(currentPoolData)
  const { toastSuccess } = useToast()

  const calculatedPrice = useMemo(() => {
    if (totalAmountIDO && totalAmountPay) {
      return new BigNumber(totalAmountPay).multipliedBy(10000).div(new BigNumber(totalAmountIDO)).div(10000).toString()
    }

    return null
  }, [totalAmountIDO, totalAmountPay])

  return (
    <ProjectInfoWrapper>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Pool opens</Text>
        <Text color="#C3C3C3" bold>
          {getUtcDateString(openAt)}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Pool closes</Text>
        <Text color="#C3C3C3" bold>
          {getUtcDateString(closeAt)}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">
          Pool Address{' '}
          <span>
            <CopyToClipboard text={addressIdoContract} onCopy={() => toastSuccess('Copied')}>
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
          {addressIdoContract}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Total raise</Text>
        <Text color="#C3C3C3" bold>
          {totalAmountPay} {payToken?.symbol}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Price</Text>
        <Text color="#C3C3C3" bold>
          {calculatedPrice} {payToken?.symbol}
        </Text>
      </Flex>
    </ProjectInfoWrapper>
  )
}

export default PoolInfo
