import React from 'react'
import styled from 'styled-components'
import { Modal, Flex, Input, Button } from 'common-uikitstrungdao'

interface AddressModalProps {
    onDismiss?: () => void
}

const StyleInput = styled(Input)`
  border-radius: 10px;
  margin-right: 30px;
  height: 55px;
  min-width: 400px;
`
const StyleButton = styled(Button)`
    white-space: nowrap
`
const AddressModal: React.FC<AddressModalProps> = ({ onDismiss }) => {
    const wallets = [
        {
            address: "0x63ca3de924fa6c9bd5c1e61bb787ae804d504490",
            ens: null,
            isConnected: false,
            isActive: true,
            walletType: null
        },
        {
            address: "0xe42bf6c707ff70adbcb5d3c41a18af9c7b59078d",
            ens: null,
            isConnected: true,
            isActive: false,
            walletType: null
        },
        {
            address: "0x29b214be98556ab25b70e50febcb248d50d506ce",
            ens: null,
            isConnected: false,
            isActive: false,
            walletType: null
        }
    ]
    return (
        <Modal title="Manage Addresses" onDismiss={onDismiss}>
            <Flex marginBottom="20px" marginTop="20px" maxWidth="600px" alignItems="center">
                <StyleInput placeholder="Add valid ETH or Tomochain address" />
                <StyleButton scale="md">Add Address</StyleButton>
            </Flex>
        </Modal>
    )
}

export default AddressModal

