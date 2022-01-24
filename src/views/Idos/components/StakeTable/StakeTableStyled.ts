import styled from 'styled-components'
import { Button, Card, Input, SecondaryButton, Text } from 'luastarter-uikits'

export const WrapperLoadingTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Table = styled.table`
  color: white;
  width: 100%;
`

export const THead = styled.div`
  background: #606060;
  border-radius: 20px 20px 0 0;
`

export const TBody = styled.div`
  background: #353535;
`

export const TR = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
`

export const TD = styled.div<{ width: string; justifyContent: string }>`
  width: ${(props) => props.width};
  display: flex;
  min-width: 100px;
  justify-content: ${(props) => props.justifyContent};
  cursor: pointer;
  align-items: center;

  @media (max-width: 575px) {
    & > div {
      font-size: 10px;
    }
  }
`

export const TFooter = styled.div`
  background: #282828;
  border-radius: 0 0 20px 20px;
`

export const TextHeader = styled(Text)`
  font-weight: bold;

  @media (max-width: 575px) {
    font-size: 10px;
  }
`

export const Arrow = styled.img<{ isOpen: boolean }>`
  width: 10px;
  height: 7px;
  align-self: center;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'unset')};
`

export const SecondaryButtonRowItem = styled(SecondaryButton)`
  width: 120px;
  margin: 0;
`

export const WrappInputOnRow = styled.div`
  width: calc(100% - 150px);
  position: relative;
`
export const InputOnRow = styled(Input)`
  padding-right: 60px;
  border: 1px solid #606060;
  background: rgba(96, 96, 96, 0.4);
  border-radius: 24px;
  &::placeholder {
    color: #8b8b8b;
    font-size: 14px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    height: 35px;
    &::placeholder {
      font-size: 12px;
    }
  }
`

export const MaxButtom = styled.span`
  position: absolute;
  top: 8px;
  right: 16px;
  cursor: pointer;
  color: #fabc46;

  @media (max-width: 576px) {
    font-size: 12px;
  }
`
export const StakeBoxCard = styled(Card)`
  border-radius: 20px;
  padding: 24px;
  overflow: unset;
  max-height: 250px;
`

export const WrappInputOnStakeBox = styled(WrappInputOnRow)`
  width: 100%;
`

export const InputOnStakeBox = styled(InputOnRow)`
  margin-top: 6px;
  margin-bottom: 12px;
`
export const MaxButtomOnStakeBox = styled(MaxButtom)`
  top: 12px;
  right: 16px;
`

export const ButtonStakeBox = styled(Button)`
  width: 100%;
  border-radius: 24px;
  height: 40px;
`

export const DropDownStakeWrapp = styled.div`
  width: 100%;
  height: 40px;
  background: #353535;
  border-radius: 24px;
  margin-bottom: 30px;
  position: relative;
  padding: 0 16px;
`

export const DropDownInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;

  @media (max-width: 576px) {
    font-size: 12px;
  }
`

export const DropDownValue = styled.span`
  font-size: 15px;
  color: #d8d8d8;
  font-weight: bold;

  @media (max-width: 576px) {
    font-size: 12px;
  }
`

export const SelectSectionDropDown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: #353535;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 8px;
  z-index: 1;

  @media (max-width: 576px) {
    font-size: 12px;
  }
`

export const SelectItemDropDown = styled.div`
  width: 154px;
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  cursor: pointer;

  @media (max-width: 576px) {
    font-size: 12px;
  }

  &:hover {
    background: #606060;
    border-radius: 8px;
    & > div {
      font-weight: bold;
    }
  }
`

export const Overlay = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
`

export const WrapperRow = styled.div`
  border-bottom: 1px solid #7e7d7d;
`

export const TierStamp = styled.span`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #353535;
  border-radius: 20px;
  margin-right: 8px;
`
