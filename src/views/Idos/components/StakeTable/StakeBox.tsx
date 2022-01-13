import { Text } from 'luastarter-uikits'
import React, { Component } from 'react'
import StakeBoxDropDown from './StakeBoxDropDown'
import {
  ButtonStakeBox,
  InputOnStakeBox,
  MaxButtomOnStakeBox,
  StakeBoxCard,
  WrappInputOnStakeBox,
} from './StakeTableStyled'

const StakeBox = () => {
  return (
    <StakeBoxCard>
      <Text fontSize="14px">Estimate: 10,000 Lua</Text>
      <WrappInputOnStakeBox>
        <InputOnStakeBox type="text" scale="md" placeholder="Quantity" />
        <MaxButtomOnStakeBox>Max</MaxButtomOnStakeBox>
      </WrappInputOnStakeBox>
      <StakeBoxDropDown />
      <ButtonStakeBox scale="md">Stake</ButtonStakeBox>
    </StakeBoxCard>
  )
}

export default StakeBox
