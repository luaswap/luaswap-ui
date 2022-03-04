import React, { useCallback, useMemo } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Card, CardBody, Text, Flex, Progress, SecondaryButton, Box, CalendarIcon } from 'luastarter-uikits'
import { get } from 'lodash'
import useGetTimeOfPool from 'views/Idos/hooks/useGetTimeOfPool'
import useNFTPoolStatus from 'views/NFTs/hook/useNFTPoolStatus'
import useGetNumberOfNftSold from 'views/NFTs/hook/useGetNumberOfNftSold'
import BigNumber from 'bignumber.js'

const PoolInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled(Card)`
  width: 100%;
  border-radius: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
  }
  margin-bottom: 24px;
`

const IconWrapper = styled.a`
  margin-right: 14px;
  border-right: ${(props) => (props['hide-border-right'] === 'true' ? 'none' : '1px solid #606060')};
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

export const YellowCard = styled(Box)`
  box-sizing: border-box;
  display: inline-block;
  background-color: rgba(225, 169, 63, 0.3);
  color: #fabc46;
  margin-right: 10px;
  font-weight: 600;
  border-radius: 16px;
  padding: 6px 16px;
  transition: background-color 0.2s, opacity 0.2s;
  font-size: 12px;
`

export const StyledCardBody = styled(CardBody)`
  height: 300px;
  background-color: #353535;

  @media (max-width: 1080px) {
    height: auto;
    padding-top: 34px;
    padding-bottom: 34px;
  }
`

const SecondaryButtonPool = styled(SecondaryButton)`
  width: 165px;
`

const SecondaryButtonWhite = styled(SecondaryButtonPool)`
  border-color: #fffcf6;
`
const CardStamp = styled.div`
  position: absolute;
  right: 0;
  padding: 8px 18px;
  background: #606060;
  border-radius: 24px 0px 0px 24px;
`

const NFTStatus = styled(Text)<{ poolStatus: string }>`
  font-weight: bold;
  font-size: 14px;
  text-transform: capitalize;
  color: ${(props) => {
    if (props.poolStatus === 'opening') {
      return '#fbc662'
    }
    if (props.poolStatus === 'upcoming') {
      return '#30cd60'
    }
    return '#8b8b8b'
  }};
`

const NFTStatusClosedSoldOut = styled(NFTStatus)`
  color: #8b8b8b;
`

const NFTStatusOpening = styled(NFTStatus)`
  color: #fbc662;
`

const NFTStatusUpcoming = styled(NFTStatus)`
  color: #30cd60;
`

const NFTCard = ({ NFTpool }) => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const { chainId } = useWeb3React()
  const location = useLocation()
  const [poolStatus] = useNFTPoolStatus(NFTpool)
  const [poolTimeStamp] = useGetTimeOfPool(NFTpool)
  const { name, img, description, indexFlat, id } = NFTpool
  const [totalNFTSold] = useGetNumberOfNftSold(indexFlat)

  const navigateToProjectDetail = useCallback(() => {
    history.push(`${path}/detail/${id}`)
  }, [history, path, id])

  const totalSale = useMemo(() => {
    let total = 0
    indexFlat.data.forEach((item) => {
      total += item.totalSale
    })
    return total
  }, [indexFlat, chainId])

  const progressPercentage = useMemo(() => {
    return new BigNumber(totalNFTSold).dividedBy(new BigNumber(totalSale)).multipliedBy(100).toNumber()
  }, [totalNFTSold, totalSale])

  return (
    <CardWrapper>
      <StyledCardBody>
        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Flex mb="15px" alignItems="center">
            <ImageContainer src={img} alt="img" onClick={navigateToProjectDetail} />
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
                <NFTStatus poolStatus={poolStatus}>{poolStatus}</NFTStatus>
              </Flex>
            </PoolInfoBlock>
          </Flex>
          <CardStamp>
            <Text fontSize="14px" color="#FFFFFF" fontWeight="bold">
              INO
            </Text>
          </CardStamp>
        </Flex>
        <Box>
          {get(NFTpool, 'network', []).map((network) => {
            return <YellowCard>{network}</YellowCard>
          })}
        </Box>
        {poolTimeStamp && (
          <Flex alignItems="center" mt="16px">
            <CalendarIcon />
            <Text ml="8px">{poolTimeStamp}</Text>
          </Flex>
        )}
        <Text color="#C3C3C3" mt="16px">
          {description}
        </Text>
        <>
          <Flex justifyContent="space-between" mb="4px" mt="16px">
            <Flex justifyContent="flex-start" flexDirection="row">
              <Text color="#8B8B8B" mr="5px">
                Total sale:{' '}
              </Text>
              <Text color="primary" fontWeight="600">
                {totalSale}
              </Text>
            </Flex>
          </Flex>
          <Progress variant="round" scale="sm" primaryStep={progressPercentage} />
        </>
      </StyledCardBody>
    </CardWrapper>
  )
}

export default NFTCard
