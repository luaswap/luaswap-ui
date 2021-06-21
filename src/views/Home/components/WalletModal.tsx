import React from 'react'
import { Modal } from '@pancakeswap/uikit'
// import { WalletTokenBalance } from 'config/constants/types'
import Spacer from '../../../components/Spacer'
import Table from '../../../components/Table'



interface WalletModalProps {
    onDismiss?: () => void
}

const WalletModal: React.FC<WalletModalProps> = ({ onDismiss }) => {
    return (
        <Modal title="Wallet" onDismiss={onDismiss}>
            <Table />
            <Spacer size="md" />
            <Table />
        </Modal>
    )
}

export default WalletModal
