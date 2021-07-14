import React from 'react'
import { Input, Button, Box, Text, Flex } from 'common-uikitstrungdao'
import { useForm } from 'react-hook-form'
import { useWeb3React } from '@web3-react/core'
import { getLuaIdoContract } from 'utils/contractHelpers'
import useWeb3 from 'hooks/useWeb3'
import useToast from 'hooks/useToast'

const CreateForm = ({ abi }) => {
  const { handleSubmit, register } = useForm()
  const web3 = useWeb3()
  const { account, chainId } = useWeb3React()
  const { toastSuccess, toastError } = useToast()

  const inputList = abi.find((contractFunction) => contractFunction.name === 'createIDO')?.inputs

  const onSubmit = async (data) => {
    const gasLimit = chainId === 88 ? { from: account, gasLimit: '0x7A120' } : { from: account }
    try {
      const {
        idoContractAddress,
        claimAt,
        closeAt,
        creator,
        idoToken,
        maxAmountPay,
        minAmountPay,
        openAt,
        payToken,
        totalAmountIDO,
        totalAmountPay,
      } = data
      const currentLuaIdoContract = getLuaIdoContract(web3, idoContractAddress)
      const result = await currentLuaIdoContract.methods
        .createIDO(
          creator,
          idoToken,
          payToken,
          totalAmountIDO,
          totalAmountPay,
          minAmountPay,
          maxAmountPay,
          openAt,
          closeAt,
          claimAt,
        )
        .send(gasLimit)
      toastSuccess('Deploy contract success')
    } catch (error) {
      toastError('Deploy contract fail')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="24px" mt="14px">
        Create Ido
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

export default CreateForm
