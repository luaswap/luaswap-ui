import React from 'react'
import { Text, Box, Flex, Input, Button } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import { useForm } from 'react-hook-form'
import { getERC20Contract } from 'utils/contractHelpers'
import { ethers } from 'ethers'
import useToast from 'hooks/useToast'

const ApproveToken = () => {
  const { library, chainId, account } = useWeb3React()
  const { register, handleSubmit } = useForm()
  const { toastSuccess, toastError } = useToast()
  const onSubmit = async (data) => {
    try {
      const { idoTokenAddress, idoContractAddress, approveAmount } = data
      const gasLimit = chainId === 88 ? { from: account, gasLimit: '0x7A120' } : { from: account }
      const eProvider = library || null
      const idoTokenContract = getERC20Contract(eProvider, idoTokenAddress, chainId)
      const result = await idoTokenContract.methods.approve(idoContractAddress, approveAmount).send(gasLimit)
      toastSuccess('Successfully approve ido contract')
    } catch (error) {
      toastError('Fail to approve ido contract')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="24px" mt="14px" mb="12px">
        Approve Token
      </Text>
      <Box>
        <Flex mb="10px">
          <Text width="15%">IDO address</Text>
          <Input width="80%" scale="md" type="text" {...register('idoContractAddress')} />
        </Flex>
        <Flex mb="10px">
          <Text width="15%">IDO Token Address</Text>
          <Input width="80%" scale="md" type="text" {...register('idoTokenAddress')} />
        </Flex>
        <Flex mb="10px">
          <Text width="15%">Approve Amount</Text>
          <Input width="80%" scale="md" type="text" {...register('approveAmount')} />
        </Flex>
      </Box>
      <Button type="submit" mb="14px" mr="14px">
        Approve
      </Button>
    </form>
  )
}

export default ApproveToken
