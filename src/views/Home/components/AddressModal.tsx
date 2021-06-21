import React from 'react'
import styled from 'styled-components'

import { Flex, Button, Input, Modal } from '@pancakeswap/uikit'

const StyleInput = styled(Input)`
  border-radius: 10px;
  margin-right: 30px;
  height: 55px;
`

const InputAddress: React.FC = () => {
  const wallets = [
    {
      address: '0x63ca3de924fa6c9bd5c1e61bb787ae804d504490',
      ens: null,
      isConnected: false,
      isActive: true,
      walletType: null,
    },
    {
      address: '0xe42bf6c707ff70adbcb5d3c41a18af9c7b59078d',
      ens: null,
      isConnected: true,
      isActive: false,
      walletType: null,
    },
    {
      address: '0x29b214be98556ab25b70e50febcb248d50d506ce',
      ens: null,
      isConnected: false,
      isActive: false,
      walletType: null,
    },
  ]
  return (
    <>
      <Flex marginBottom="40px" marginTop="40px" maxWidth="600px" alignItems="center">
        <StyleInput />
        <Button scale="md">Add Address</Button>
      </Flex>
    </>
  )
}

export default InputAddress
