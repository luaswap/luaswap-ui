import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, Card, CardBody, Button, Flex, Image, useModal } from 'common-uikitstrungdao'
import useConvert from '../../hooks/useConvert'
import { TOKEN_ICONS } from '../../config'
import ConvertModal from './ConvertModal'

interface PoolCardProps {
  pool: {
    token0Symbol: string
    token1Symbol: string
    token0Addresses: string
    token1Addresses: string
    token0Balance: number
    token1Balance: number
    lpBalance: number
  }
}

const CardHeader = styled.div`
  width: 100%;
  padding-top: 24px;
`

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const [failedIconList, setFailedIconList] = useState<string[]>([])
  const { onConvert } = useConvert()

  useEffect(() => {
    if (pool) {
      const newList = []
      if (!TOKEN_ICONS[pool.token0Symbol]) {
        newList.push(pool.token0Symbol)
      }
      if (!TOKEN_ICONS[pool.token1Symbol]) {
        newList.push(pool.token1Symbol)
      }

      setFailedIconList(newList)
    }
  }, [pool])
  const [onPresentConvert] = useModal(
    <ConvertModal
      onConfirm={onConvert}
      pair={`${pool.token0Symbol} - ${pool.token1Symbol}`}
      token0={pool.token0Addresses}
      token1={pool.token1Addresses}
    />,
  )
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="center">
          {failedIconList.some((token) => token === pool.token0Symbol) ? (
            <Text>{pool.token0Symbol}</Text>
          ) : (
            <Image width={60} height={60} src={TOKEN_ICONS[pool.token0Symbol]} alt={pool.token0Symbol} />
          )}
          {failedIconList.some((token) => token === pool.token1Symbol) ? (
            <Text>{pool.token1Symbol}</Text>
          ) : (
            <Image width={60} height={60} src={TOKEN_ICONS[pool.token1Symbol]} alt={pool.token1Symbol} />
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justifyContent="space-between">
          <Text>LP Token</Text>
          <Text>{pool.lpBalance.toFixed(9)}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{pool.token0Symbol}</Text>
          <Text>{pool.token0Balance.toFixed(4)}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{pool.token1Symbol}</Text>
          <Text>{pool.token1Balance.toFixed(5)}</Text>
        </Flex>
        <Button
          disabled={!new BigNumber(pool.lpBalance).isGreaterThan(0)}
          onClick={onPresentConvert}
          mt="8px"
          width="100%"
        >
          Convert
        </Button>
      </CardBody>
    </Card>
  )
}

export default PoolCard
