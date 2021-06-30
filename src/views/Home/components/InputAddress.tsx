import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import styled from 'styled-components'
import { Flex, Input, Button, Text, Box } from 'common-uikitstrungdao'

import { useAppDispatch } from 'state'
import { setWallet, addWalletFromInput } from 'state/blockfolio'
import { useWallet } from 'state/hooks'
import UnlockButton from 'components/UnlockButton'

const StyleInput = styled(Input)`
  border-radius: 10px;
  margin-right: 30px;
  height: 55px;
  min-width: 400px;
`
const StyleButton = styled(Button)`
  white-space: nowrap;
`

const InputAddress: React.FC = () => {
  const { account } = useWeb3React()
  const { wallets } = useWallet()
  const [val, setVal] = useState()
  const [msg, setMsg] = useState('')
  const dispatch = useAppDispatch()

  const handleChange = useCallback(
    (e) => {
      if (e.target.value) {
        setVal(e.target.value)
      }
    },
    [setVal],
  )
  let w
  const handleSubmit = () => {
    if (Web3.utils.isAddress(val)) {
      if (Object.keys(wallets).length < 1) {
        w = {
          address: val,
          isAtive: true,
          isConnected: false,
        }
        dispatch(setWallet(w))
      } else {
        w = {
          address: val,
          isActive: false,
          isConnected: false,
        }
        dispatch(addWalletFromInput(w))
      }
    } else {
      setMsg('Not a valid ETH or TomoChain address ')
    }
  }
  return (
    <Box>
      <Flex marginBottom="20px" marginTop="20px" maxWidth="600px" alignItems="center">
        <StyleInput onChange={handleChange} placeholder="Add valid ETH or Tomochain address" />
        <StyleButton onClick={handleSubmit} scale="md">
          Add Address
        </StyleButton>
        {!account && Object.keys(wallets).length < 1 && (
          <>
            {' '}
            <Text mr="20px" ml="20px">
              OR
            </Text>
            <UnlockButton />
          </>
        )}
      </Flex>
      <Text>{msg}</Text>
    </Box>
  )
}

export default InputAddress
