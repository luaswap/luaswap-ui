import { useWeb3React } from '@web3-react/core'
import { Button, Card, Flex, SecondaryButton, Text } from 'luastarter-uikits'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import { selectSelectedNFTPool, selectUpdateNumberOfSoldNFTCount, setUpdateNumberOfSoldNFTCount } from 'state/nfts'
import styled from 'styled-components'
import useNFTPoolStatus from 'views/NFTs/hook/useNFTPoolStatus'
import { supportIdoNetwork } from 'config/constants/idos'
import { useApproveIdo } from 'hooks/useApproveIdo'
import { getERC20Contract } from 'utils/contractHelpers'
import { Contract } from 'web3-eth-contract'
import useBuyNFT from 'views/NFTs/hook/useBuyNFT'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import useGetUserBuyCount from 'views/NFTs/hook/useGetUserBuyCount'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'
import useGetNumberOfNftSold from 'views/NFTs/hook/useGetNumberOfNftSold'
import useIsApprovedOnTabDetailNFT from 'views/NFTs/hook/useIsApprovedOnTabDetailNFT'
import LoaderIcon from 'views/Idos/components/StakeTable/StakeSpinner'

const Wrapper = styled(Flex)`
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`

const CardImage = styled(Card)`
  background: #1a1a1a;
  border-radius: 24px;
  width: 360px;
  min-width: 360px;
  height: 430px;
  margin: 24px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media (max-width: 1400px) {
    width: 50%;
    min-width: unset;
  }
  @media (max-width: 991px) {
    width: 80%;
  }
`

const SoldOutBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(103, 103, 103, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageNFT = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  margin: 32px 0;
`

const QuantityBlock = styled(Flex)`
  margin-bottom: 32px;
`

const CountNumber = styled(Text)`
  margin: 0 32px;
`

const ButtonCount = styled.button`
  background: #353535;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      opacity: 0.5;
    }
  }
`

const DetailNFTBlock = styled.div`
  margin: 40px;
  @media (max-width: 1400px) {
    width: 50%;
  }
  @media (max-width: 991px) {
    width: 80%;
  }
`

const NFTTitle = styled(Text)`
  margin-bottom: 8px;
  line-height: 48px;
`

const NFTDesc = styled(Text)`
  line-height: 24px;
  white-space: pre-line;
`

const NFTTotalPrice = styled(Text)``

const BuyNFTBlock = styled.div`
  padding-top: 20px;
  margin-top: 50px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 40%;
    top: 0;
    border-top: 2px solid #8b8b8b;
  }
`

const ByNowNFTButton = styled(Button)`
  width: 350px;
  margin-top: 30px;

  @media (max-width: 1400px) {
    width: 100%;
  }
`

const ButtonSoldOut = styled(ByNowNFTButton)`
  background-color: #606060 !important;
`

const TabDetailNFT = ({ activeIndex }) => {
  const [count, setCount] = useState(1)
  const NFTPoolDetail = useSelector(selectSelectedNFTPool)
  const { account, chainId, library } = useWeb3React()
  const [activeDetail, setActiveDetail] = useState(null)
  const [poolStatus] = useNFTPoolStatus(NFTPoolDetail)
  const [isLoading, setIsLoading] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const indexFlatData = get(NFTPoolDetail, 'indexFlat.data', [])
  const indexFlat = get(NFTPoolDetail, 'indexFlat', null)
  const networkNFTId = get(NFTPoolDetail, 'indexFlat.networkId', '')

  const addressInoContract = get(activeDetail, 'addressInoContract', '')
  const addressNftContract = get(activeDetail, 'addressNftContract', '')
  const nftId = get(activeDetail, 'nftId', '')
  const priceNFT = get(activeDetail, 'price', '')
  const paytokenAddress = get(activeDetail, 'payToken.address', '')
  const paytokenDecimal = get(activeDetail, 'payToken.decimals', 18)
  const maxBuy = get(activeDetail, 'maxBuy', 0)

  const paytokenContract = getERC20Contract(library, paytokenAddress, chainId)

  const [userBuyCount, isLoadingGetUserBuyCount] = useGetUserBuyCount(addressInoContract, nftId, networkNFTId)

  const [isApproved, fetchAllowanceData, isLoadingApproveStatus] = useIsApprovedOnTabDetailNFT(
    paytokenContract,
    addressInoContract,
    networkNFTId,
  )
  const { onApprove } = useApproveIdo(paytokenContract, addressInoContract)

  const { onBuyNFT } = useBuyNFT(addressInoContract, paytokenAddress, networkNFTId)

  const updateNumberOfSoldNFTCount = useSelector(selectUpdateNumberOfSoldNFTCount)
  const dispatch = useAppDispatch()

  const isOpenNFTPool = useMemo(() => {
    return poolStatus === 'opening'
  }, [poolStatus, NFTPoolDetail])

  const isMatchNetworkId = useMemo(() => {
    if (account) {
      return Number(chainId) === Number(networkNFTId)
    }
    return false
  }, [account, networkNFTId, chainId])

  const [totalNFTSold] = useGetNumberOfNftSold(indexFlat)

  const totalSale = useMemo(() => {
    let total = 0
    indexFlatData.forEach((item) => {
      total += item.totalSale
    })
    return total
  }, [indexFlatData, chainId])

  useEffect(() => {
    setActiveDetail(indexFlatData[activeIndex])
    setCount(1)
  }, [activeIndex, indexFlatData])

  const tabId = get(NFTPoolDetail, `projectDetail[${activeDetail?.id}]`, null)
  const payTokenSymbol = get(activeDetail, 'payToken.symbol', null)

  const decreaseCount = () => {
    setCount(count - 1)
  }

  const increaseCount = () => {
    setCount(count + 1)
  }

  const handleApprove = useCallback(async () => {
    try {
      setIsLoading(true)
      await onApprove()
      fetchAllowanceData()
      setIsLoading(false)
      toastSuccess('Approve successfully')
    } catch (e) {
      setIsLoading(false)
      console.error(e)
      toastError('Request approval failed')
    }
  }, [onApprove, fetchAllowanceData])

  const handleBuy = useCallback(async () => {
    try {
      setIsLoading(true)
      await onBuyNFT(
        addressNftContract,
        nftId,
        count,
        paytokenAddress,
        new BigNumber(priceNFT * count).times(BIG_TEN.pow(paytokenDecimal || 18)).toString(),
      )
      setIsLoading(false)
      dispatch(setUpdateNumberOfSoldNFTCount(updateNumberOfSoldNFTCount + 1))
      toastSuccess('Successfully purchase NFTs')
    } catch (e) {
      setIsLoading(false)
      console.error(e)
      toastError('Purchase NFTs failed')
    }
  }, [onApprove, fetchAllowanceData])

  return (
    <Wrapper>
      <CardImage>
        <ImageNFT src={activeDetail?.img} alt="nftimage" />
        <QuantityBlock justifyContent="center" alignItems="center">
          <ButtonCount onClick={decreaseCount} disabled={!isMatchNetworkId || !isOpenNFTPool || count < 2}>
            <Text fontSize="28px">-</Text>
          </ButtonCount>
          <CountNumber fontWeight="normal" fontSize="24px" color="#FFFFFF">
            {count}
          </CountNumber>
          <ButtonCount
            onClick={increaseCount}
            disabled={!isMatchNetworkId || !isOpenNFTPool || count >= maxBuy - userBuyCount}
          >
            <Text fontSize="28px">+</Text>
          </ButtonCount>
        </QuantityBlock>
        {totalNFTSold === totalSale && (
          <SoldOutBack>
            <img src={`${process.env.PUBLIC_URL}/images/sold-out.png`} alt="" />
          </SoldOutBack>
        )}
      </CardImage>
      <DetailNFTBlock>
        <NFTTitle fontWeight="900" fontSize="32px" color="#FFFFFF">
          {activeDetail?.name}
        </NFTTitle>
        <NFTDesc fontSize="15px" color="#FFFFFF">
          {tabId}
        </NFTDesc>
        <BuyNFTBlock>
          <NFTTotalPrice fontWeight="bold" fontSize="24px" color="#FFFFFF">
            {activeDetail?.price * count} {payTokenSymbol}
          </NFTTotalPrice>
          {totalSale === totalNFTSold ? (
            <ButtonSoldOut disabled>
              <Text fontWeight="bold" fontSize="15px" color="#353535">
                Sold Out
              </Text>
            </ButtonSoldOut>
          ) : (
            <>
              {!isLoadingApproveStatus && !isLoadingGetUserBuyCount ? (
                <>
                  {isApproved ? (
                    <ByNowNFTButton
                      disabled={!isMatchNetworkId || !isOpenNFTPool || count < 1 || isLoading || userBuyCount >= maxBuy}
                      onClick={handleBuy}
                    >
                      <Text fontWeight="bold" fontSize="15px" color="#353535">
                        {isLoading ? 'Buying...' : 'Buy Now'}
                      </Text>
                    </ByNowNFTButton>
                  ) : (
                    <ByNowNFTButton
                      disabled={!isMatchNetworkId || !isOpenNFTPool || count < 1 || isLoading || userBuyCount >= maxBuy}
                      onClick={handleApprove}
                    >
                      <Text fontWeight="bold" fontSize="15px" color="#353535">
                        {isLoading ? 'Approving...' : 'Approve Contract'}
                      </Text>
                    </ByNowNFTButton>
                  )}
                </>
              ) : (
                <ByNowNFTButton disabled>{isMatchNetworkId ? <LoaderIcon /> : 'Approve Contract'}</ByNowNFTButton>
              )}
            </>
          )}
          {!isMatchNetworkId && (
            <Text color="#DA4343" marginTop="15px">
              You need to connect wallet and select {supportIdoNetwork[networkNFTId]} network.
            </Text>
          )}
          {isMatchNetworkId && (
            <>
              {userBuyCount >= maxBuy ? (
                <Text color="#DA4343" marginTop="15px">
                  Unable to buy due to reaching out the maximum NFT purchase.
                </Text>
              ) : (
                <Text color="#DA4343" marginTop="15px">
                  You can purchase up to {maxBuy - userBuyCount} NFTs.
                </Text>
              )}
            </>
          )}
        </BuyNFTBlock>
      </DetailNFTBlock>
    </Wrapper>
  )
}

export default TabDetailNFT
