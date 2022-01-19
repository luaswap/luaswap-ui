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
  Box,
  CalendarIcon,
} from 'luastarter-uikits'
// import useDeepMemo from 'hooks/useDeepMemo'
// import getLink from 'views/Idos/utils/getMediaUrl'
// import { formatPoolDetail } from 'utils/formatPoolData'
// import { formatNumberWithComma } from 'utils/formatBalance'
// import get from 'lodash/get'
// import useGetTimeOfPool from 'views/Idos/hooks/useGetTimeOfPool'
// import { Pool, FormatPool } from '../../types'
// import usePoolStatus from '../../hooks/usePoolStatus'

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

  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
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

const NFTStatus = styled(Text)`
  font-weight: bold;
  font-size: 14px;
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

// interface PoolDetailProps {
//   pool: Pool
// }

const NFTCard = () => {
  // const history = useHistory()
  // const { path } = useRouteMatch()
  // const { chainId } = useWeb3React()
  // const location = useLocation()
  // const [poolStatus] = usePoolStatus(pool)
  // const [poolTimeStamp] = useGetTimeOfPool(pool)
  // const navigateToProjectDetail = useCallback(() => {
  //   history.push(`${path}/project/${pool.id}`)
  // }, [history, path, pool.id])
  // const { isPresent, socials, isWhitelist, untilOpen, untilClose, untilClaim } = pool
  // const {
  //   img,
  //   name,
  //   description,
  //   totalCommittedAmount,
  //   totalAmountPay,
  //   totalAmountIDO,
  //   swappedAmountIDO,
  //   status,
  //   payToken,
  //   minAmountPay,
  //   maxAmountPay,
  // } = useDeepMemo<FormatPool>(() => {
  //   const { img: _img, name: _name, description: _description, status: _status, index: _index } = pool
  //   const poolInfoChainId = Object.keys(_index).map((id) => {
  //     return formatPoolDetail(_index[id])
  //   })
  //   const totalPoolData = formatPoolDetail(poolInfoChainId)
  //   return {
  //     img: _img,
  //     name: _name,
  //     description: _description,
  //     status: _status,
  //     ...totalPoolData,
  //   }
  // }, [pool, chainId])

  // const progressPercentage = useMemo(() => {
  //   if (poolStatus === 'closed') {
  //     return new BigNumber(swappedAmountIDO).dividedBy(new BigNumber(totalAmountIDO)).multipliedBy(100).toNumber()
  //   }

  //   if (totalCommittedAmount && totalAmountPay) {
  //     return new BigNumber(totalCommittedAmount).dividedBy(new BigNumber(totalAmountPay)).multipliedBy(100).toNumber()
  //   }

  //   return 0
  // }, [totalCommittedAmount, totalAmountPay, poolStatus, swappedAmountIDO, totalAmountIDO])

  const navigateToProjectDetail = () => {}

  return (
    <CardWrapper>
      <StyledCardBody>
        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Flex mb="15px" alignItems="center">
            <ImageContainer src={`${process.env.PUBLIC_URL}/favicon.png`} alt="img" onClick={navigateToProjectDetail} />
            <PoolInfoBlock>
              <Text
                fontSize="24px"
                bold
                onClick={navigateToProjectDetail}
                style={{
                  cursor: 'pointer',
                }}
              >
                {/* {name} */}
                LuaNFT
              </Text>
              <Flex marginBottom="5px" alignItems="center">
                {/* <IconWrapper href={getLink(socials, 'TELEGRAM')} target="__blank">
                  <TelegramIcon />
                </IconWrapper>
                <IconWrapper href={getLink(socials, 'TWITTER')} target="__blank">
                  <TwitterIcon />
                </IconWrapper>
                <IconWrapper href={getLink(socials, 'MEDIUM')} target="__blank">
                  <MediumIcon />
                </IconWrapper>
                <IconWrapper href={getLink(socials, 'FORUM')} target="__blank" hide-border-right="true">
                  <WorldIcon />
                </IconWrapper> */}
                <NFTStatusClosedSoldOut>Closed</NFTStatusClosedSoldOut>
              </Flex>
            </PoolInfoBlock>
          </Flex>
          <CardStamp>
            <Text fontSize="14px" color="#FFFFFF" fontWeight="bold">
              INO
            </Text>
          </CardStamp>
        </Flex>
        {/* <Box>
          {get(pool, 'network', []).map((network) => {
            return <YellowCard>{network}</YellowCard>
          })}
        </Box> */}
        <Box>
          <YellowCard>BinanceSmartChain</YellowCard>
        </Box>
        {/* {poolTimeStamp && (
          <Flex alignItems="center" mt="16px">
            <CalendarIcon />
            <Text ml="8px">{poolTimeStamp}</Text>
          </Flex>
        )} */}
        <Flex alignItems="center" mt="16px">
          <CalendarIcon />
          <Text ml="8px">10 day(s) until token distribution</Text>
        </Flex>
        <Text color="#C3C3C3" mt="16px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui magna, bibefringilla pretium justo. Nullam
          odio quam, fermentum at sapien eu...ndum quis libero quis,
        </Text>
        {/* {!isPresent && (
          <>
            <Flex justifyContent="space-between" mb="4px" mt="16px">
              <Flex justifyContent="flex-start" flexDirection="row">
                <Text color="#8B8B8B" mr="5px">
                  Cap:{' '}
                </Text>
                <Text color="primary" fontWeight="600">
                  {formatNumberWithComma(totalAmountIDO, true)}
                </Text>
              </Flex>
            </Flex>
            <Progress variant="round" scale="sm" primaryStep={progressPercentage} />
          </>
        )} */}
        <>
          <Flex justifyContent="space-between" mb="4px" mt="16px">
            <Flex justifyContent="flex-start" flexDirection="row">
              <Text color="#8B8B8B" mr="5px">
                Total sale:{' '}
              </Text>
              <Text color="primary" fontWeight="600">
                1500
              </Text>
            </Flex>
          </Flex>
          <Progress variant="round" scale="sm" primaryStep={80} />
        </>
      </StyledCardBody>
    </CardWrapper>
  )
}

export default NFTCard
