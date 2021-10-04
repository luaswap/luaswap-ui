import React from 'react'
import { Text, Box } from 'luastarter-uikits'
import Page from 'components/layout/Page'
import LuaswapAbi from 'config/abi/LuaSwapIDO.json'
import CreateForm from './components/DevTools/CreateForm'
import ReadForm from './components/DevTools/ReadForm'
import ApproveToken from './components/DevTools/ApproveToken'
import IncreaseCap from './components/DevTools/IncreaseCap'

const DevTools = () => {
  return (
    <Page>
      <Box>
        <ReadForm />
        <br />
        <ApproveToken />
        <br />
        <CreateForm abi={LuaswapAbi} />
        <br />
        <IncreaseCap abi={LuaswapAbi} />
      </Box>
    </Page>
  )
}

export default DevTools
