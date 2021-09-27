import React, { useCallback, useMemo } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
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
  SecondaryButton,
  Image,
} from 'common-uikitstrungdao'
import useDeepMemo from 'hooks/useDeepMemo'
import { formatPoolDetail } from 'utils/formatPoolData'
import { Pool, FormatPool } from '../../types'
import usePoolStatus from '../../hooks/usePoolStatus'

const PoolInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled(Card)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
  }

  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
`

const IconWrapper = styled.a`
  margin-right: 14px;
  border-right: 1px solid #606060;
  padding-right: 14px;
  cursor: pointer;
`

const ImageContainer = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: #e9e9e9;
  margin-right: 10px;
`

interface PoolDetailProps {
  pool: Pool
}

const PoolDetail: React.FC<PoolDetailProps> = ({ pool }) => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const { chainId } = useWeb3React()
  const location = useLocation()
  const [poolStatus] = usePoolStatus(pool)
  const navigateToProjectDetail = useCallback(() => {
    history.push(`${path}/project/${pool.id}`)
  }, [history, path, pool.id])
  const { isPresent } = pool
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
    <CardWrapper>
      <CardBody style={{ height: '300px', backgroundColor: '#353535' }}>
        <Flex alignItems="flex-start" justifyContent="space-between" flexWrap="wrap">
          <Flex mb="15px" alignItems="center">
            <ImageContainer src={img} alt="img" onClick={navigateToProjectDetail} />
            <PoolInfoBlock>
              <Text
                fontSize="20px"
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
          <SecondaryButton onClick={navigateToProjectDetail} scale="sm">
            LEARN MORE
          </SecondaryButton>
        </Flex>
        <Text color="#C3C3C3" mt="14px">
          {description}
        </Text>
        {!isPresent && (
          <>
            <Flex justifyContent="space-between" mb="10px">
              <Flex justifyContent="flex-start" flexDirection="row">
                <Text color="#8B8B8B" mr="5px">
                  Cap:{' '}
                </Text>
                <Text color="primary" fontWeight="600">
                  {totalAmountIDO}
                </Text>
              </Flex>
            </Flex>
            <Progress variant="round" primaryStep={progressPercentage} />
          </>
        )}
      </CardBody>
    </CardWrapper>
  )
}

export default PoolDetail
