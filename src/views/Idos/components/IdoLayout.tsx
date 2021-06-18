import styled from 'styled-components'

const IfoLayout = styled.div`
  display: grid;
  grid-gap: 32px;
  padding: 32px 0;
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
`

export default IfoLayout