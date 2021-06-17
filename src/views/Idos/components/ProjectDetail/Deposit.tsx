import React, { useState } from 'react'
import { Card, CardBody, Flex, Button, Text } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import ModalInput from 'components/ModalInput'

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
    <Card
      style={{
        width: '40%',
      }}
    >
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
              onClick={() => {
                setIsCommit(true)
              }}
            >
              Commit your USDT
            </Button>
          ) : (
            <UnlockButton />
          )}
          {isCommit && (
            <ModalInput
              value={value}
              onSelectMax={handleSelectMax}
              onChange={handleChange}
              max='100'
              symbol='USDT'
              inputTitle='Deposit'
            />
          )}
          <Text textAlign="center" mt="10px">
            Deposit USDT to commit the slots, Unspent USDT can be withdrawn when IDO finishes. Token can be claimed
            after Fri, 25 Jun 2021 08.00.00 GMT
          </Text>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Deposit
