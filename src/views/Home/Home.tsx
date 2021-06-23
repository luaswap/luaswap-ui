import React, { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Input, Button, Flex, useModal, ChevronDownIcon } from 'common-uikitstrungdao'
import PageHeader from 'components/PageHeader'

import { useAppDispatch } from 'state'
import { useWallet } from 'state/hooks'
import { WalletProps } from 'state/types'
import { setWallet } from 'state/blockfolio'
// import { fetchWallet } from 'state/portfolio'
// import { useTranslation } from 'contexts/Localization'

import Page from 'components/layout/Page'
import CardValue from './components/CardValue'
import WalletModal from './components/WalletModal'
import AddressManage from './components/AddressManage'
import InPutAddress from './components/InputAddress'
// import AddressModal from './components/AddressModal'
import WalletIcon from './components/Icon/WalletIcon'
import PoolIcon from './components/Icon/PoolIcon'
// import LinkIcon from './components/Icon/LinkIcon'
// import CalendarIcon from './components/Icon/CalendarIcon'
// import PencilIcon from './components/Icon/PencilIcon'

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
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
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
// const defaultWalletObj = {
//   address: "",
//   isActive: false,
// }


const Home: React.FC = () => {
  const { account } = useWeb3React()
  // const [objWallet, setObjWallet] = useState<WalletProps>(defaultWalletObj)
  const { wallets } = useWallet()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  // const watched = "0x63ca3de924fa6c9bd5c1e61bb787ae804d504490"
  // const address = "0xe42BF6C707Ff70ADBCb5D3C41a18af9c7b59078d"
  // const [val, setVal] = useState('')
  // const [isAddress, setIsAddress] = useState(false)
  
  // console.log(wallets)
  
  // const { t } = useTranslation()
  // const earningsSum = 74.000
  // const walletValue = 1.897
  useEffect(() => {    
    if (account) {
      if (wallets.length < 1) {
        const w = {
          address: account,
          isConnected: true,
          isActive: true
        }
        dispatch(setWallet(w))
      }
      // else {
      //   const w = {
      //     address: account,
      //     isConnected: true,
      //     isActive: false
      //   }
      //   dispatch(setWallet(w))
      // }
    }
  }, [dispatch, account, wallets.length])
   

  const [onPresentWallet] = useModal(<WalletModal />)
  // const [onPresentAddress] = useModal(<AddressModal />)
  const totalInUSD = 100.000
  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xl" mb="24px">
          Manage your assets and liabilities in one simple interface.
        </Heading>
        <Heading scale="lg" color="text">
          Get unique access to opportunities in open finance.
        </Heading>
      </PageHeader>      
      <Page>
        {wallets.length > 0 || account ?
        <>
        <Flex justifyContent="space-between">
          <div>
            <Text> Net Worth</Text>
            <CardValue value={totalInUSD} prefix='$' lineHeight="1.5" />
          </div>
          <AddressManage />
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
        <Text fontWeight="500" mb="18px" mt="50px" color="secondary" fontSize="20px"> Network</Text>
        <Cards>
          <Card onClick={onPresentWallet}>
            <StyleWrapper>
              <IconWrapper>
                <WalletIcon />
              </IconWrapper>
              <Text> Ethereum</Text>
            </StyleWrapper>

            <CardValue value={totalInUSD} lineHeight="1.5" fontSize="25" />
          </Card>
          <Card onClick={onPresentWallet}>
            <StyleWrapper>
              <IconWrapper>
                <WalletIcon />
              </IconWrapper>
              <Text> TomoChain</Text>
            </StyleWrapper>
            <CardValue value={totalInUSD} lineHeight="1.5" fontSize="25" />
          </Card>
        </Cards>
      </>
        : <InPutAddress />
      }
      </Page >
        
    </>
  )
}

export default Home
