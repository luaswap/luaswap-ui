import React from 'react'
import { Modal } from 'common-uikitstrungdao'
import InputAddress from './InputAddress'

interface AddressModalProps {
  onDismiss?: () => void
}

const AddressModal: React.FC<AddressModalProps> = ({ onDismiss }) => {
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
    <Modal title="Manage Addresses" onDismiss={onDismiss}>
      <InputAddress />
    </Modal>
  )
}

export default AddressModal
