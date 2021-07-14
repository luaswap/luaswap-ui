import React, { useEffect, useState } from 'react';
import { Heading, Box, Text, Progress, Flex, Image } from '@pancakeswap/uikit'
import { useSelector } from 'react-redux'
import { selectUserTier } from 'state/profile'
import TierProgressBar from './TierProgressBar'




const Tier = () => {
    const [progress, setProgress] = useState(0)
    const tier = useSelector(selectUserTier)


    useEffect(() => {
        setProgress(70)
        // setProgress((tier / 3) * 100)
    }, [tier]);

    interface StepProps {
        srcImage: string,
        title: string,
        alt: string
    }

    const Step: React.FC<StepProps> = ({ srcImage, title, alt }) => {

        return (<div style={{ marginTop: '18px' }}>
            <img
                width="30px"
                src={srcImage}
                alt={alt}
            />
            <p>{title}</p>

        </div>)
    }

    return (
        <div style={{height:'100px'}}>
            <Heading size="md" mb="20px">
                Your Tier: {tier > 0 ? tier : 0}
            </Heading>
            <TierProgressBar percent={progress} hasStepZero={false} >
                <Step srcImage='https://image.flaticon.com/icons/png/512/921/921490.png' title='Tier0' alt='' />
                <Step srcImage='https://image.flaticon.com/icons/png/512/921/921490.png' title='Tier1' alt='' />
                <Step srcImage='https://image.flaticon.com/icons/png/512/921/921490.png' title='Tier2' alt='' />
            </TierProgressBar>

        </div>
    );

}
export default Tier;
