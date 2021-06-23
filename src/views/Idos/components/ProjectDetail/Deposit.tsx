import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Flex, Button, Text } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import useDepositIdo from 'hooks/useDepositIdo'
import UnlockButton from 'components/UnlockButton'
import ModalInput from 'components/ModalInput'
import { getDecimalAmount } from 'utils/formatBalance'

const CardWrapper = styled(Card)`
  width: 100%;
  margin-top: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
    margin-top: 0px;
  }
`

interface DepositProps {
  maxAmount: string
  totalCommited: string
}

const Deposit: React.FC<DepositProps> = ({ maxAmount, totalCommited }) => {
  const { account } = useWeb3React()
  const [isCommit, setIsCommit] = useState(false)
  const [value, setValue] = useState('0')
  const { toastSuccess, toastError } = useToast()
  const { onDeposit } = useDepositIdo()
  const maxAmountAllowed = useMemo(() => {
    return new BigNumber(maxAmount).minus(new BigNumber(totalCommited)).toString()
  }, [maxAmount, totalCommited])

  const handleSelectMax = () => {
    setValue(maxAmountAllowed)
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setValue(e.currentTarget.value.replace(/,/g, '.'))
    }
  }

  const onHandleCommit = async () => {
    try {
      const commitedAmmount = getDecimalAmount(new BigNumber(value)).toString()
      await onDeposit(commitedAmmount)
      toastSuccess('Deposit Successfully')
    } catch (error) {
      toastError('Fail to deposit')
    }

  }

  return (
    <CardWrapper>
      <CardBody
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '350px',
        }}
      >
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          {account ? (
            <Button
              mb="15px"
              variant="primary"
              onClick={() => {
                if (isCommit) {
                  onHandleCommit()
                } else {
                  setIsCommit(true)
                }
              }}
            >
              Commit your USDT
            </Button>
          ) : (
            <UnlockButton />
          )}
          {isCommit && account && (
            <ModalInput
              value={value}
              onSelectMax={handleSelectMax}
              onChange={handleChange}
              max={maxAmountAllowed}
              symbol="USDT"
              inputTitle="Deposit"
            />
          )}
          <Text textAlign="center" mt="10px">
            Deposit USDT to commit the slots, Unspent USDT can be withdrawn when IDO finishes. Token can be claimed
            after Fri, 25 Jun 2021 08.00.00 GMT
          </Text>
        </Flex>
      </CardBody>
    </CardWrapper>
  )
}

export default Deposit
