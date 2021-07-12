import React, { useEffect, useState } from 'react';
import { Heading, Box } from '@pancakeswap/uikit'
import { useSelector } from 'react-redux'
import { selectUserTier } from 'state/profile'
import TierProgressBar from './TierProgressBar';
// import Step from './TierStep';
// import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";




const Tier = () => {
    const [process, setProcess] = useState(0)
    const tier = useSelector(selectUserTier)


    useEffect(() => {
        // setProcess(70)
        setProcess((tier / 3) * 100)
    }, [tier]);

    return (
        <Box mb="20px">
            <Heading size="md" mb="20px">
                Your Tier: {tier>0 ? tier : 0}
            </Heading>
            <TierProgressBar
                percent={process}
                filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                hasStepZero={false}

            >
                    <img
                            width="30px"
                            src="https://image.flaticon.com/icons/png/512/921/921490.png"
                            alt=""
                        />
                            <img
                            width="30px"
                            src="https://image.flaticon.com/icons/png/512/740/740860.png"
                            alt=""
                        />
                            <img
                            width="30px"
                            src="https://image.flaticon.com/icons/png/512/3919/3919942.png"
                            alt=""
                        />
                {/* <Step transition="scale">
                    {({ accomplished }) => (
                        <img
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="30px"
                            src="https://image.flaticon.com/icons/png/512/921/921490.png"
                            alt=""
                        />

                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <img
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="30px"
                            src="https://image.flaticon.com/icons/png/512/740/740860.png"
                            alt=""
                        />
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <img
                            //   style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, maxWidth: 'unset' }}
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, maxWidth: 'unset' }}
                            width="30px"
                            height='30px'

                            src="https://image.flaticon.com/icons/png/512/3919/3919942.png"
                            alt=""
                        />
                    )}
                </Step> */}

            </TierProgressBar>
        </Box>


    );

}
export default Tier;
