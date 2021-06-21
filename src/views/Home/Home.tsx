import React, { useEffect, useState, useCallback } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import {  Heading, Text, BaseLayout, Input, Button, Flex, useModal   } from 'common-uikitstrungdao'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'

// import { useAppDispatch } from 'state'
// import { useWallet } from 'state/hooks'
// import { fetchWallet } from 'state/portfolio'
// import { useTranslation } from 'contexts/Localization'

import Page from 'components/layout/Page'
import CardValue from './components/CardValue'
import WalletModal from './components/WalletModal'
import WalletIcon from './components/Icon/WalletIcon'
import PoolIcon from './components/Icon/PoolIcon'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: left;
  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`
const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
`
const Card = styled.div`
  grid-column: span 4;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #dfe8f9;
  cursor: pointer;
`
const StyleInput = styled(Input)`
  border-radius: 10px;
  margin-right: 30px;
  height: 55px;
`
const StyleWrapper = styled.div`
  align-items: center;
  margin-right: 8px;
  display: flex;
`
const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: #D9F9F0;
  color: #00D897;
  text-align: center;
  line-height: 30px;
  border-radius: 50px;
  font-size: 16px;
  margin-right: 10px;
`

const Home: React.FC = () => {
  const { account } = useWeb3React()
  // const [val, setVal] = useState('')
  // const [isAddress, setIsAddress] = useState(false)
  // // const { isLoading, data } = useWallet()
  // const dispatch = useAppDispatch()
  // const { t } = useTranslation()
  // const earningsSum = 74.000
  // const walletValue = 1.897

  // useEffect(() => {
  //   if (account) {
  //     dispatch(fetchWallet(account))
  //   }
  // }, [account, dispatch])

  // const handleChange = useCallback(
  //   (e) => {
  //     if (e.target.value) {
  //       setVal(e.target.value)
  //     }
  //   },
  //   [setVal],
  // )
  // const handleSubmit = useCallback(() => {
  //   if (Web3.utils.isAddress(val)) {
  //     setIsAddress(true)
  //     dispatch(fetchWallet(val))
  //     setVal('')
  //   }
  // }, [dispatch, val, setVal, setIsAddress])

  const [onPresentWallet] = useModal(<WalletModal />,)
  const totalInUSD = 100.000
  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xl" color="secondary" mb="24px">
          Manage your assets and liabilities in one simple interface.
        </Heading>
        <Heading scale="lg" color="text">
          Get unique access to opportunities in open finance.
        </Heading>
      </PageHeader>
      <Page>
        {/* <>
        <Text fontSize="40px">Manage your assets and liabilities in one simple interface.</Text>
        <Flex marginBottom="40px" marginTop="40px" maxWidth="600px" alignItems="center">
          <StyleInput onChange={handleChange} />
          <Button scale="md" onClick={handleSubmit}>Add Address</Button>
        </Flex>
        {!isAddress && <Text>Not ethereum address</Text>}
        </> */}

        <Text> Net Worth</Text>
        <CardValue value={totalInUSD} prefix='$' lineHeight="1.5" />
        <Text fontWeight="500" mb="18px" mt="50px" color="secondary" fontSize="20px"> Account Overview</Text>
        <Cards>
          <Card onClick={onPresentWallet}>
            <StyleWrapper>
              <IconWrapper>
                <WalletIcon />
              </IconWrapper>
              <Text> Wallet</Text>
            </StyleWrapper>

            <CardValue value={totalInUSD} lineHeight="1.5" fontSize="25" />
          </Card>
          <Card onClick={onPresentWallet}>
            <StyleWrapper>
              <IconWrapper>
                <PoolIcon />
              </IconWrapper>
              <Text> Liquidity Pool </Text>
            </StyleWrapper>
            <CardValue value={totalInUSD} lineHeight="1.5" fontSize="25" />
          </Card>
          <Card onClick={onPresentWallet}>
            <StyleWrapper>
              <IconWrapper>
                <PoolIcon />
              </IconWrapper>
              <Text> LuaSafe </Text>
            </StyleWrapper>

            <CardValue value={totalInUSD} lineHeight="1.5" fontSize="25" />
          </Card>
        </Cards>
      </Page >
    </>
  )
}

export default Home
