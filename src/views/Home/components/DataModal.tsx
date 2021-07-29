import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, TabMenu, Tab, Flex, Text } from 'common-uikitstrungdao'
import { DataApiType } from '../../../state/types'
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
            {data.ethereum.details.length > 0 && data.tomochain.details.length > 0 && (
                <>
                    <TabMenu
                        activeIndex={activeTab}
                        onItemClick={(index: number) => setActiveTab(index)}
                        innerStyle={{ width: '100%' }}
                        wrapperStyle={{
                            padding: '0px',
                            width: '100%',
                        }}
                    >
                        <Tab style={{ width: '100%' }}>
                            <Image alt="Ethereum" src={`${process.env.PUBLIC_URL}/images/network/eth.png`} />
                            Ethereum
                        </Tab>
                        <Tab style={{ width: '100%' }}>
                            <Image alt="TomoChain" src={`${process.env.PUBLIC_URL}/images/network/tomochain.png`} />
                            TomoChain
                        </Tab>
                    </TabMenu>
                    <StyleOverFlow>
                        <Spacer size="md" />
                        {activeTab === 0 && (
                            <TokenTable data={data.ethereum.details} columns={data.ethereum.detailsHeader} tag={data.ethereum.tag} />
                        )}
                        {activeTab === 1 && (
                            <TokenTable
                                data={data.tomochain.details}
                                columns={data.tomochain.detailsHeader}
                                tag={data.tomochain.tag}
                            />
                        )}
                    </StyleOverFlow>
                </>
            )}
            {data.ethereum.details.length > 0 && data.tomochain.details.length < 1 && (
                <>
                    <Flex alignItems="center">
                        <Image alt="Ethereum" src={`${process.env.PUBLIC_URL}/images/network/eth.png`} />
                        <Text>Ethereum</Text>
                    </Flex>
                    <StyleOverFlow>
                        <Spacer size="md" />
                        <TokenTable data={data.ethereum.details} columns={data.ethereum.detailsHeader} tag={data.ethereum.tag} />
                    </StyleOverFlow>
                </>
            )}
            {data.ethereum.details.length < 1 && data.tomochain.details.length > 0 && (
                <>
                    <Flex alignItems="center">
                        <Image alt="TomoChain" src={`${process.env.PUBLIC_URL}/images/network/tomochain.png`} />
                        <Text>TomoChain</Text>
                    </Flex>
                    <StyleOverFlow>
                        <Spacer size="md" />
                        <TokenTable data={data.tomochain.details} columns={data.tomochain.detailsHeader} tag={data.tomochain.tag} />
                    </StyleOverFlow>
                </>
            )}
            {data.ethereum.details.length < 1 && data.tomochain.details.length < 1 && (
                <>

                    <StyleOverFlow>
                        <Text>No data</Text>
                    </StyleOverFlow>
                </>
            )}
        </Modal>
    )
}

export default DataModal
