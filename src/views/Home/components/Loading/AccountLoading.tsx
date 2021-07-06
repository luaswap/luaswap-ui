import React from 'react'
import styled from 'styled-components'
import { Skeleton } from 'common-uikitstrungdao'

const Card = styled.div`
    grid-column: span 4;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 15px;
    // border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: pointer;
`

const AccountLoading: React.FC = () => {    
    return (
        <Card>
            <Skeleton width="30px" height="30px" variant="circle" mr="20px"/>
            <Skeleton width="100%"/>
        </Card>
    )
}

export default AccountLoading