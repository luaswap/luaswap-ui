import React, { useState } from 'react'
import { Card, CardBody, Flex, Button, Text } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import UnlockButton from 'components/UnlockButton'
import ModalInput from 'components/ModalInput'

const CardWrapper = styled(Card)`
  width: 100%;
  margin-top: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
    margin-top: 0px;
  }
`

const Deposit = () => {
  const { account } = useWeb3React()
  const [isCommit, setIsCommit] = useState(false)
  const [value, setValue] = useState('0')

  const handleSelectMax = () => {
    console.log('select max')
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setValue(e.currentTarget.value.replace(/,/g, '.'))
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
                setIsCommit(true)
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
              max="100"
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
