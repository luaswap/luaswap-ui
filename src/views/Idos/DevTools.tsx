import React from 'react'
import { Text, Box } from 'common-uikitstrungdao'
import Page from 'components/layout/Page'
import LuaswapAbi from 'config/abi/LuaSwapIDO.json'
import CreateForm from './components/DevTools/CreateForm'
import ReadForm from './components/DevTools/ReadForm'
import ApproveToken from './components/DevTools/ApproveToken'

const DevTools = () => {
  return (
    <Page>
      <Box>
        <ReadForm />
        <ApproveToken />
        <CreateForm abi={LuaswapAbi} />
      </Box>
    </Page>
  )
}

export default DevTools
