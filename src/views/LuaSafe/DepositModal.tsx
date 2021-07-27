import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from 'common-uikitstrungdao'
import { getFullDisplayBalance } from '../../utils/formatBalance'
import { useTranslation } from '../../contexts/Localization'
import ModalActions from '../../components/ModalActions'
import ModalInput from '../../components/ModalInput'
// import ModalSuccess from '../../../components/ModalSuccess'
// import Spacer from '../../../components/Spacer'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  onDismiss?: () => void
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '' }) => {
  const { t } = useTranslation()
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [successTx, setSuccessTx] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={successTx ? '' : `Deposit ${tokenName} Tokens`} onDismiss={onDismiss}>
      {!successTx && (
        <>
          <ModalInput
            value={val}
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            max={fullBalance}
            symbol={tokenName}
          />
          <ModalActions>
            <Button width="100%" variant="secondary" onClick={onDismiss}>
              {t('Cancel')}
            </Button>
            <Button
              width="100%"
              disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
              onClick={async () => {
                if (val && parseFloat(val) > 0) {
                  setPendingTx(true)
                  const tx: any = await onConfirm(val)
                  setPendingTx(false)
                  if (tx) {
                    setSuccessTx(true)
                  } else if (onDismiss) onDismiss()
                }
              }}
            >
              {pendingTx ? 'Pending Confirmation' : 'Confirm'}
            </Button>
          </ModalActions>
        </>
      )}
      {/* {successTx && (
        <>
          <ModalSuccess amount={val} symbol={tokenName} txhash="4f95c6770c75ddd3388f525" text="deposit" />
          <Spacer size="md" />
          <Button text="Close" variant="secondary" onClick={onDismiss} />

          <Spacer size="md" />
        </>
      )} */}
    </Modal>
  )
}

export default DepositModal
