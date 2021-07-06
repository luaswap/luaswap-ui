import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, TabMenu, Tab } from 'common-uikitstrungdao'
import { DataApiType } from 'state/types'
import TokenTable from './TokenTable'
import Spacer from '../../../components/Spacer'

const StyleOverFlow = styled.div`
  max-height: 400px;
  overflow-y: auto;
`
const Image = styled.img`
  max-width: 30px;
  margin-right: 10px;
`
interface DataModalProps {
  data: DataApiType
  onDismiss?: () => void
}

const DataModal: React.FC<DataModalProps> = ({ onDismiss, data }) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Modal title="Wallet" onDismiss={onDismiss}>
      <TabMenu
        activeIndex={activeTab}
        onItemClick={(index: number) => setActiveTab(index)}
        innerStyle={{width: "100%"}}
        wrapperStyle={{
          padding: '0px',
          width: '100%'
        }}
      >
        <Tab style={{width: "100%"}}>
          <Image alt="TomoChain" src="/images/network/eth.png"/>
          Ethereum
        </Tab>
        <Tab style={{width: "100%"}}>
          <Image alt="TomoChain" src="/images/network/tomochain.png"/>
          TomoChain
        </Tab>
      </TabMenu>
      <StyleOverFlow>
        <Spacer size="md" />
        {(activeTab === 0 && data.ethereum.details.length > 0) && (
          <TokenTable
            data={data.ethereum.details}
            columns={data.ethereum.detailsHeader}
            tag={data.ethereum.tag}
          />
        )}
        {(activeTab === 1 && data.tomochain.details.length > 0) && (
          <TokenTable
            data={data.tomochain.details}
            columns={data.tomochain.detailsHeader}
            tag={data.tomochain.tag}
          />
        )}
      </StyleOverFlow>
    </Modal>
  )
}

export default DataModal
