import React from 'react'
import { Modal } from '@pancakeswap/uikit'
// import { WalletTokenBalance } from 'config/constants/types'
import TokenTable from './TokenTable'
import Spacer from '../../../components/Spacer'


interface WalletModalProps {
  onDismiss?: () => void
}

const WalletModal: React.FC<WalletModalProps> = ({ onDismiss }) => {
  return (
    <Modal title="Wallet" onDismiss={onDismiss}>
      <TokenTable />
      <Spacer size="md" />
      <TokenTable />
    </Modal>
  )
}

export default WalletModal
