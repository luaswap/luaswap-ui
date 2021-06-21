import React, { useEffect, useState, useCallback } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Input, Button, Flex, useModal, ChevronDownIcon } from 'common-uikitstrungdao'
import PageHeader from 'components/PageHeader'

// import { useAppDispatch } from 'state'
// import { useWallet } from 'state/hooks'
// import { fetchWallet } from 'state/portfolio'
// import { useTranslation } from 'contexts/Localization'

import Page from 'components/layout/Page'
import CardValue from './components/CardValue'
import WalletModal from './components/WalletModal'
import AddressModal from './components/AddressModal'
import WalletIcon from './components/Icon/WalletIcon'
import PoolIcon from './components/Icon/PoolIcon'
import LinkIcon from './components/Icon/LinkIcon'
import CalendarIcon from './components/Icon/CalendarIcon'
import PencilIcon from './components/Icon/PencilIcon'


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
const StyleWalletManage = styled.div`
  position: absolute;
  min-width: 300px;
  background-color: #fff;
  box-shadow: 0 2px 8px #bbbbbb;
  padding: 20px;
  top: 100%;
  right: 0;
  border-radius: 15px;
`
const StyleTextBox = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
`
const StyleBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`
const AddressBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
`
const StyleAction = styled.div`
  display: flex;
  align-items: center;
  svg{
    border-radius: 100%;
    border: 1px solid #dfe8f9;
    font-size: 30px;
    padding: 8px;
    margin-left: 10px;
    :hover{
      background-color: #dfe8f9;
    }
  }
`
const Home: React.FC = () => {
  const { account } = useWeb3React()
  const [isOpen, setIsOpen] = useState(false)
  const watched = "0x63ca3de924fa6c9bd5c1e61bb787ae804d504490"
  // const address = "0xe42BF6C707Ff70ADBCb5D3C41a18af9c7b59078d"
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

  const [onPresentWallet] = useModal(<WalletModal />)
  const [onPresentAddress] = useModal(<AddressModal />)
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
        <Flex justifyContent="space-between">
          <div>
            <Text> Net Worth</Text>
            <CardValue value={totalInUSD} prefix='$' lineHeight="1.5" />
          </div>
          <Flex position="relative">
            <StyleTextBox onClick={() => setIsOpen(!isOpen)}>
              <Text mr="10px">WalletManage</Text>
              <ChevronDownIcon />
            </StyleTextBox>
            {isOpen &&
              <StyleWalletManage>
                <StyleBox>
                  <Text color="#657795" pb="10px">Connected</Text>
                  <AddressBox>
                    <IconWrapper>
                      <WalletIcon />
                    </IconWrapper>
                    <Text>{`${account.substring(0, 6)}...${account.substring(account.length - 4, account.length)}`}</Text>
                    <StyleAction>
                      <PencilIcon />
                      <CalendarIcon />
                      <LinkIcon />
                    </StyleAction>
                  </AddressBox>
                  <AddressBox>
                    <IconWrapper>
                      <WalletIcon />
                    </IconWrapper>
                    <Text>{`${account.substring(0, 6)}...${account.substring(account.length - 4, account.length)}`}</Text>
                    <StyleAction>
                      <PencilIcon />
                      <CalendarIcon />
                      <LinkIcon />
                    </StyleAction>
                  </AddressBox>
                </StyleBox>
                <StyleBox>
                  <Text color="#657795" pb="10px">Watched</Text>
                  <AddressBox>
                    <IconWrapper>
                      <WalletIcon />
                    </IconWrapper>
                    <Text>{`${watched.substring(0, 6)}...${watched.substring(watched.length - 4, watched.length)}`}</Text>
                    <StyleAction>
                      <PencilIcon />
                      <CalendarIcon />
                      <LinkIcon />
                    </StyleAction>
                  </AddressBox>
                  <AddressBox>
                    <IconWrapper>
                      <WalletIcon />
                    </IconWrapper>
                    <Text>{`${watched.substring(0, 6)}...${watched.substring(watched.length - 4, watched.length)}`}</Text>
                    <StyleAction>
                      <PencilIcon />
                      <CalendarIcon />
                      <LinkIcon />
                    </StyleAction>
                  </AddressBox>
                </StyleBox>
                <StyleBox style={{ borderTop: "1px solid #dfe8f9", cursor: "pointer" }} onClick={onPresentAddress}>
                  <Text color="#657795">Manage Addresses</Text>
                </StyleBox>
                <StyleBox>
                  <Text color="#657795">Network Settings</Text>
                </StyleBox>
              </StyleWalletManage>
            }
          </Flex>
        </Flex>
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
