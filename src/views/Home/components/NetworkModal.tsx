import React from 'react'
import styled from 'styled-components'
import { Modal } from 'common-uikitstrungdao'
import { ApiNetworkType } from 'state/types'
import TokenTable from './TokenTable'

const StyleOverFlow = styled.div`
  max-height: 400px;
  overflow-y: auto;
`
interface NetworkModalProps {
  data: ApiNetworkType
  onDismiss?: () => void
}

const NetworkModal: React.FC<NetworkModalProps> = ({ onDismiss, data }) => {
  return (
    <Modal title="Wallet" onDismiss={onDismiss}>
      <StyleOverFlow>
        <TokenTable data={data.details} columns={data.detailsHeader} tag={data.tag} />
      </StyleOverFlow>
    </Modal>
  )
}

export default NetworkModal
