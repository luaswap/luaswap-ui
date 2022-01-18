import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Modal, SecondaryButton, Text } from 'luastarter-uikits'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectLockDuration } from 'state/stake'
import { getValueTokenByLUA } from 'state/stake/getStake'
import { useWeb3React } from '@web3-react/core'
import { formatDateTime } from 'utils/formatTime'

const ModalStyled = styled(Modal)`
  border: none;
  box-shadow: none;
  border-radius: 20px;

  div:nth-child(1) {
    border: none;
  }
`

const CancelButton = styled(SecondaryButton)`
  font-size: 15px;
  padding: 8px 24px;
  border-radius: 24px;
  width: 190px;
`

const ConfirmButton = styled(Button)`
  font-size: 15px;
  padding: 8px 24px;
  border-radius: 24px;
  width: 190px;
`

const ActionButtons = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`

const ConfirmModal = (props) => {
  const { onDismiss, onConfirm, token, quantity, isStake } = props
  const lockDuration = useSelector(selectLockDuration)
  const { chainId } = useWeb3React()
  const [contentData, setContentData] = useState({} as any)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const handleGetValueOfTokenInput = async () => {
      setIsFetching(true)
      const data = await getValueTokenByLUA(token?.address, chainId, quantity)
      if (isStake) {
        data.dateLock = formatDateTime(new Date().getTime() / 1000 + lockDuration, 'MM/dd/yyyy HH:mm:ss')
      }
      setContentData(data)
      setIsFetching(false)
    }
    handleGetValueOfTokenInput()
  }, [token, chainId])

  const onHandleConfirm = () => {
    onConfirm()
    onDismiss()
  }

  return (
    <ModalStyled title="Confirmation" onDismiss={onDismiss}>
      {isFetching ? (
        <Text>Fetching Estimate LUA ...</Text>
      ) : (
        <Text fontSize="16px">
          {isStake
            ? `Stake ${contentData?.quantity} ${token.name} (≈ ${Number(contentData?.estimateLuaQty)?.toFixed(
                3,
              )} Lua) & lock until ${contentData?.dateLock}`
            : `Unstake ${contentData?.quantity} ${token.name} (≈ ${Number(contentData?.estimateLuaQty)?.toFixed(
                3,
              )} Lua)`}
        </Text>
      )}

      <ActionButtons>
        <CancelButton scale="md" onClick={onDismiss}>
          CANCEL
        </CancelButton>
        <ConfirmButton scale="md" onClick={onHandleConfirm}>
          CONFIRM
        </ConfirmButton>
      </ActionButtons>
    </ModalStyled>
  )
}

export default ConfirmModal
