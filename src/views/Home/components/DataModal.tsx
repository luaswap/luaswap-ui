import React from 'react'
import styled from 'styled-components'
import { Modal } from '@pancakeswap/uikit'
// import { WalletTokenBalance } from 'config/constants/types'
import { DataApiType } from 'state/types'
import TokenTable from './TokenTable'
import Spacer from '../../../components/Spacer'

const StyleOverFlow = styled.div`
  max-height: 400px;
  overflow-y: auto;
`
const Line = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  margin-top: 0;
  margin-bottom: 10px;
`
interface DataModalProps {
  data: DataApiType
  onDismiss?: () => void
}

const DataModal: React.FC<DataModalProps> = ({ onDismiss, data }) => {
  return (
    <Modal title="Wallet" onDismiss={onDismiss}>
      <StyleOverFlow>
        {data.ethereum.details.length > 0 && (
          <TokenTable
            data={data.ethereum.details}
            columns={data.ethereum.detailsHeader}
            tag={data.ethereum.tag}
            network="Ethereum"
          />
        )}
        <Spacer size="md" />
        {data.tomochain.details.length > 0 && (
          <TokenTable
            data={data.tomochain.details}
            columns={data.tomochain.detailsHeader}
            tag={data.tomochain.tag}
            network="TomoChain"
          />
        )}
      </StyleOverFlow>
    </Modal>
  )
}

export default DataModal
