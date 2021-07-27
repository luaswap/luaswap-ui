import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Button, Box } from 'common-uikitstrungdao'
import ModalActions from '../../components/ModalActions'

interface ConvertModalProps {
  onConfirm: (token0: string, token1: string) => void
  pair?: string
  token0: string
  token1: string
  onDismiss?: () => void
}

const ConvertModal: React.FC<ConvertModalProps> = ({ onConfirm, onDismiss, pair = '', token0 = '', token1 = '' }) => {
  const [pendingTx, setPendingTx] = useState(false)
  return (
    <Modal title={`Convert This Pair: ${pair}`} onDismiss={onDismiss}>
      <Box mb={[3, 4]}>
        <StyledNote>
          <ul>
            <li>This “CONVERT” button will trigger reward distribution for the selected pair.</li>
            <li>Anyone can trigger distribution at any time by selecting the “CONVERT” buttons.</li>
            <li>Users need to pay the gas fee for the distribution if they choose to do it themselves.</li>
          </ul>
        </StyledNote>
      </Box>
      <Box px={4}>
        <StyledNote>{`Are you sure you want to convert ${pair}?`}</StyledNote>
      </Box>
      <ModalActions>
        <Button width="100%" variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
        <Button
          width="100%"
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(token0, token1)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? 'Pending Confirmation' : 'Confirm'}
        </Button>
      </ModalActions>
    </Modal>
  )
}
const StyledNote = styled.h3`
  margin: 0;
  padding: 0;
  color: #bdbdbd;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
`

// const StyledPairText = styled.span`
//   margin-left: 10px;
//   color: ${props => props.theme.primary1};
// `

export default ConvertModal
