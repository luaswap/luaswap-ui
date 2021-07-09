import React, { useEffect, useState } from 'react'
import { Button, Flex, Progress, InputProps, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useSelector } from 'react-redux'
import { selectUserTier} from 'state/profile'


const Tier = () => {
    const [process, setProcess] = useState(0)
    const tier = useSelector(selectUserTier)
    useEffect(()=>{
        setProcess((tier/4)*100)
    }, [tier]);
    return (
        <Flex >
            <Heading size="md" mb="8px">
                Tier
            </Heading>
            <Progress variant='round' primaryStep={process} />
        </Flex>
    );

}
export default Tier;
