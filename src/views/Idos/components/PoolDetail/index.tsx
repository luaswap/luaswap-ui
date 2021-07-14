import React, { useCallback, useMemo } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  CardRibbon,
  Text,
  Link,
  Flex,
  TwitterIcon,
  MediumIcon,
  WorldIcon,
  TelegramIcon,
  Progress,
  Image,
} from 'common-uikitstrungdao'
import useDeepMemo from 'hooks/useDeepMemo'
import { formatPoolDetail } from 'utils/formatPoolData'
import { formatCardStatus, formatCardColor } from 'utils/idoHelpers'
import { Pool, FormatPool } from '../../types'
import usePoolStatus from '../../hooks/usePoolStatus'

const PoolInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const IconWrapper = styled.a`
  color: #212121;
  margin: 0 3px;
  display: flex !important;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background};
`

const ImageContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: #e9e9e9;
  overflow: hidden;
  margin-right: 10px;
`

interface PoolDetailProps {
  pool: Pool
}

const PoolDetail: React.FC<PoolDetailProps> = ({ pool }) => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const { chainId } = useWeb3React()
  const [poolStatus] = usePoolStatus(pool)
  const navigateToProjectDetail = useCallback(() => {
    history.push(`${path}/project/${pool.id}`)
  }, [history, path, pool.id])
  const {
    img,
    name,
    description,
    totalCommittedAmount,
    totalAmountPay,
    totalAmountIDO,
    swappedAmountIDO,
    status,
    payToken,
    minAmountPay,
    maxAmountPay,
  } = useDeepMemo<FormatPool>(() => {
    const { img: _img, name: _name, description: _description, status: _status, index: _index } = pool
    const poolInfoChainId = Object.keys(_index).map((id) => {
      return formatPoolDetail(_index[id])
    })
    const totalPoolData = formatPoolDetail(poolInfoChainId)
    return {
      img: _img,
      name: _name,
      description: _description,
      status: _status,
      ...totalPoolData,
    }
  }, [pool, chainId])

  const progressPercentage = useMemo(() => {
    if (poolStatus === 'closed') {
      return new BigNumber(swappedAmountIDO).dividedBy(new BigNumber(totalAmountIDO)).multipliedBy(100).toNumber()
    }

    if (totalCommittedAmount && totalAmountPay) {
      return new BigNumber(totalCommittedAmount).dividedBy(new BigNumber(totalAmountPay)).multipliedBy(100).toNumber()
    }

    return 0
  }, [totalCommittedAmount, totalAmountPay, poolStatus, swappedAmountIDO, totalAmountIDO])

  return (
    <Card
      ribbon={<CardRibbon variantColor={formatCardColor(status)} text={formatCardStatus(status)} />}
      mb="24px"
      style={{
        width: '475px',
      }}
    >
      <CardBody style={{ height: '300px' }}>
        <Flex mb="15px" alignItems="center">
          <ImageContainer onClick={navigateToProjectDetail}>
            <Image src={img} alt="img" width={60} height={60} />
          </ImageContainer>
          <PoolInfoBlock>
            <Text
              fontSize="24px"
              bold
              onClick={navigateToProjectDetail}
              style={{
                cursor: 'pointer',
              }}
            >
              {name}
            </Text>
            <Flex marginBottom="5px" alignItems="center">
              <IconWrapper href="google.com" target="__blank">
                <TelegramIcon />
              </IconWrapper>
              <IconWrapper>
                <TwitterIcon />
              </IconWrapper>
              <IconWrapper>
                <MediumIcon />
              </IconWrapper>
              <IconWrapper>
                <WorldIcon />
              </IconWrapper>
            </Flex>
          </PoolInfoBlock>
        </Flex>
        <Text>{description}</Text>
        <Link href="google.com" mb="15px">
          Learn more
        </Link>
        <Flex justifyContent="space-between" mb="10px">
          <Flex justifyContent="flex-start" flexDirection="column">
            <Text color="primary">Cap</Text>
            <Text>{totalAmountIDO}</Text>
          </Flex>
          <Flex justifyContent="flex-end" flexDirection="column">
            <Text color="primary">Access</Text>
            <Text>Private</Text>
          </Flex>
        </Flex>
        <Progress variant="round" primaryStep={progressPercentage} />
      </CardBody>
    </Card>
  )
}

export default PoolDetail
