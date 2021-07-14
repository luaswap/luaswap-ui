import React, { useState } from 'react'
import { Text, Input, Box, Flex, Button } from 'common-uikitstrungdao'
import { useForm } from 'react-hook-form'
import { getLuaIdoContract } from 'utils/contractHelpers'
import useWeb3 from 'hooks/useWeb3'
import useToast from 'hooks/useToast'
import { mappingIdoResponse } from 'state/ido/fetchIdosData'

const ReadForm = () => {
  const { register, handleSubmit } = useForm()
  const [idoData, setIdoData] = useState(null)
  const web3 = useWeb3()
  const { toastSuccess, toastError } = useToast()
  const onSubmit = async (data) => {
    try {
      const { idoContractAddress, idoIndex } = data
      const currentLuaIdoContract = getLuaIdoContract(web3, idoContractAddress)
      const idoDetail = await currentLuaIdoContract.methods.IDOs(idoIndex).call()
      const mappedData = mappingIdoResponse(idoDetail)
      setIdoData(mappedData)
    } catch (error) {
      setIdoData(null)
      toastError('Fail to fetch data, maybe pool index is not existed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="24px" mb="12px">
        Read Ido
      </Text>
      <Box>
        <Flex mb="10px">
          <Text width="15%">IDO address</Text>
          <Input width="80%" scale="md" type="text" {...register('idoContractAddress')} />
        </Flex>
        <Flex mb="10px">
          <Text width="15%">IDO index</Text>
          <Input width="80%" scale="md" type="text" {...register('idoIndex')} />
        </Flex>
      </Box>
      <Flex>
        <Button type="submit" mb="14px" mr="14px">
          Read
        </Button>
        <Button type="button" onClick={() => setIdoData(null)}>
          Clear data
        </Button>
      </Flex>
      <pre>{idoData && JSON.stringify(idoData, undefined, 2)}</pre>
    </form>
  )
}

export default ReadForm
