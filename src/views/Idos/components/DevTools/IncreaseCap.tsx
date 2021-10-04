import React from 'react'
import { Input, Button, Box, Text, Flex } from 'luastarter-uikits'
import { useForm } from 'react-hook-form'
import { useWeb3React } from '@web3-react/core'
import { getLuaIdoContract } from 'utils/contractHelpers'
import useWeb3 from 'hooks/useWeb3'
import useToast from 'hooks/useToast'

const IncreaseCap = ({ abi }) => {
  const { handleSubmit, register } = useForm()
  const web3 = useWeb3()
  const { account, chainId } = useWeb3React()
  const { toastSuccess, toastError } = useToast()

  const inputList = abi.find((contractFunction) => contractFunction.name === 'increaseCap')?.inputs

  const onSubmit = async (data) => {
    const gasLimit = chainId === 88 ? { from: account, gasLimit: '0x7A120' } : { from: account }
    try {
      const { idoContractAddress, index, amountIDO, amountPay } = data
      const currentLuaIdoContract = getLuaIdoContract(web3, idoContractAddress)
      const result = await currentLuaIdoContract.methods.increaseCap(index, amountIDO, amountPay).send(gasLimit)
      toastSuccess('Deploy contract success')
    } catch (error) {
      toastError('Deploy contract fail')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="24px" mt="14px">
        IncreaseCAP
      </Text>
      <Box mt="12px">
        <Flex mb="10px">
          <Text width="15%">IDO address</Text>
          <Input width="80%" scale="md" type="text" {...register('idoContractAddress')} />
        </Flex>
        {inputList.map((input) => {
          return (
            <Flex mb="10px">
              <Text width="15%">{input.name}</Text>
              <Input width="80%" scale="md" type="text" {...register(input.name)} />
            </Flex>
          )
        })}
      </Box>
      <Button>Submit</Button>
    </form>
  )
}

export default IncreaseCap
