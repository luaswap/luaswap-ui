import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import styled from 'styled-components'
import { Modal, Flex, Input, Button, Text, Box } from 'common-uikitstrungdao'

import { useWallet } from 'state/hooks'
import { useAppDispatch } from 'state'
import { WalletProps } from 'state/types'
import { setWallet, addWalletFromInput, setWalletActive } from 'state/blockfolio'
import UnlockButton from 'components/UnlockButton'
import WalletIcon from './Icon/WalletIcon'

interface AddressModalProps {
  onDismiss?: () => void
}
const StyleNote = styled.div`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.warning};
  border-radius: 10px;
  margin-bottom: 30px;
`
const StyleBox = styled.div`
  padding-bottom: 10px;
`
const AddressBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`
const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: #fbf4bf;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  line-height: 30px;
  border-radius: 50px;
  font-size: 16px;
  margin-right: 10px;
`
const StyleInput = styled(Input)`
  border-radius: 10px;
  margin-right: 30px;
  height: 55px;
  min-width: 400px;
`
const StyleButton = styled(Button)`
  white-space: nowrap;
`
const AddressModal: React.FC<AddressModalProps> = ({ onDismiss }) => {
  const { account } = useWeb3React()
  const [val, setVal] = useState('')
  const [msg, setMsg] = useState('')
  const dispatch = useAppDispatch()
  const {wallets} = useWallet()

  const filterWalletConnected = Object.values(wallets).filter((v) => {
    return v.isConnected === true
  })
  const filterWalletWatched = Object.values(wallets).filter((v) => {
    return v.isConnected === false
  })
  const handleChange = useCallback(
    (e) => {
      if (e.target.value) {
        setVal(e.target.value)
      }
    },
    [setVal],
  )
  let w
  const handleSubmit = () => {
    if (Web3.utils.isAddress(val)) {
        w = {
          address: val,
          isActive: false,
          isConnected: false,
        }
        dispatch(addWalletFromInput(w))
      setMsg('')
      setVal('')
    } else {
      setMsg('Not a valid ETH or TomoChain address ')
    }
  }
  const handleChangeWallet = (address) => {
    dispatch(setWalletActive(address))
  }
  return (
    <Modal title="Manage Addresses" onDismiss={onDismiss}>
      <Box>
        <Flex marginBottom="40px" marginTop="20px" maxWidth="600px" alignItems="center">
          <StyleInput onChange={handleChange} placeholder="Add valid ETH or Tomochain address" value={ val }/>
          <StyleButton onClick={handleSubmit} scale="md">
            Add Address
          </StyleButton>
        </Flex>
        {msg && 
          <StyleNote>{msg}</StyleNote>
        }
        {filterWalletConnected.length > 0 &&
          <StyleBox>
            <Text pb="10px">Connected</Text>
            {filterWalletConnected.map((v) => 
              <AddressBox key={v.address}>
                <IconWrapper>
                  <WalletIcon />
                </IconWrapper>
                <Text
                  onClick={() => {
                    handleChangeWallet(v.address)
                    onDismiss()
                  }}
                  style={{ cursor: 'pointer' }}>
                  {`${v.address.substring(0, 8)}...${v.address.substring(v.address.length - 6,v.address.length,)}`}
                </Text>

              </AddressBox>
              )}
          </StyleBox>
        }
          {filterWalletWatched.length > 0 && 
            <StyleBox>
            <Text pb="10px">Watched</Text>
            {filterWalletWatched.map((v) => 
              <AddressBox key={v.address}>
                <IconWrapper>
                  <WalletIcon />
                </IconWrapper>
                <Text
                  onClick={() => {
                    handleChangeWallet(v.address)
                    onDismiss()
                  }}
                  style={{ cursor: 'pointer' }}>
                  {`${v.address.substring(0, 8)}...${v.address.substring(v.address.length - 6, v.address.length)}`}
                </Text>
              </AddressBox>
            )}
            </StyleBox>            
          }
      </Box>
    </Modal>
  )
}

export default AddressModal
